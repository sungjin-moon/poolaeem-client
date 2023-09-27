import useField from "../../../../hooks/useField";

import { queryClient } from "../../../../queries";
import useCreate from "../../../../queries/Workbook/Problem/useCreate";

type onClose = () => void;
type onPush = () => void;

function useCreateProblem(workbookId: string = "") {
  const Create = useCreate();

  const QuestionField = useField({
    key: "Name",
    required: true,
    status: "default",
    value: "",
    placeholder: "문제를 작성해주세요",
    message: "",
    maxLength: 100,
  });

  const OptionsField = useField({
    key: "Data",
    required: true,
    status: "default",
    value: [],
    placeholder:
      "선택지를 추가해주세요\n(선택지는 유형 별 최소 1개 이상 필요해요)",
    message: "",
    maxLength: 10,
  });

  const onCreate = (onClose: onClose, onPush: onPush) => {
    if (Create.isLoading) return;
    const nameChecked = QuestionField.onCheckValue();
    const optionsChecked = OptionsField.onCheckValue();
    if (nameChecked && optionsChecked) {
      const question = QuestionField.getValue();
      const options = OptionsField.getValue();

      Create.mutate(
        { workbookId, question, type: "CHECKBOX", options },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries(["problemList", workbookId]);
            queryClient.invalidateQueries("workbookList");
            queryClient.invalidateQueries(["workbook-info", workbookId]);
            onClose();
            onPush();
          },
          onError: (error: any) => {
            if (error?.response?.data?.code === 10008) {
              OptionsField.validator(
                "invalid",
                "반드시 정답과 오답이 모두 존재해야 합니다."
              );
            }
          },
        }
      );
    }
  };

  return {
    Create,
    QuestionField,
    OptionsField,
    onCreate,
  };
}

export default useCreateProblem;
