import { useEffect } from "react";
import useField from "../../../../hooks/useField";

import { queryClient } from "../../../../queries";
import useRead from "../../../../queries/Workbook/Problem/useRead";
import { useUpdateInfo } from "../../../../queries/Workbook/Problem/useUpdate";

type onClose = () => void;
type onPush = () => void;

function useUpdateProblem(
  id: string = "",
  workbookId: string = "",
  isOpen: boolean = false
) {
  const Read = useRead({ id }, { enabled: isOpen });
  const Update = useUpdateInfo();

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

  const onUpdate = (onClose: onClose, onPush: onPush) => {
    if (Update.isLoading) return;
    const nameChecked = QuestionField.onCheckValue();
    const optionsChecked = OptionsField.onCheckValue();

    if (nameChecked && optionsChecked) {
      const question = QuestionField.getValue();
      const options = OptionsField.getValue();

      Update.mutate(
        { id, question, type: "CHECKBOX", options },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries(["problemList", workbookId]);
            queryClient.invalidateQueries("workbookList");
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

  useEffect(() => {
    if (isOpen && Read.isFetched) {
      console.log(Read.data);
      const question = Read.data?.question;
      const options = Read.data?.options;
      QuestionField.setValue(question);
      OptionsField.setValue(options);
    }
  }, [isOpen, Read.data]);

  return {
    Read,
    Update,
    QuestionField,
    OptionsField,
    onUpdate,
  };
}

export default useUpdateProblem;
