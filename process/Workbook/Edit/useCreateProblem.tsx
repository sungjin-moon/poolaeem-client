import useField from "../../../hooks/useField";

import { queryClient } from "../../../queries";
import useCreate from "../../../queries/Workbook/Problem/useCreate";

type onClose = () => void;
type onPush = () => void;

function useCreateProblem() {
  const Create = useCreate();

  const NameField = useField({
    key: "name",
    required: true,
    status: "default",
    value: "",
    placeholder: "문제를 작성해주세요",
    message: "",
    maxLength: 100,
  });

  const OptionsField = useField({
    key: "data",
    required: true,
    status: "default",
    value: [],
    placeholder:
      "선택지를 추가해주세요\n(선택지는 유형 별 최소 1개 이상 필요해요)",
    message: "",
    maxLength: 3,
  });

  const onCreate = (onClose: onClose, onPush: onPush) => {
    if (Create.isLoading) return;
    const nameChecked = NameField.onCheckValue();
    const descriptionChecked = OptionsField.onCheckValue();
    if (nameChecked && descriptionChecked) {
      const name = NameField.getValue();
      const description = OptionsField.getValue();

      Create.mutate(
        { name, description },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries("workbookList");
            onClose();
            onPush();
          },
          onError: (error) => {},
        }
      );
    }
  };

  return {
    Create,
    NameField,
    OptionsField,
    onCreate,
  };
}

export default useCreateProblem;
