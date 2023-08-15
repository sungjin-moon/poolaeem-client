import useField from "../../hooks/useField";

import useModal from "../../hooks/useModal";

import { queryClient } from "../../queries";
import useCreate from "../../queries/Workbook/useCreate";

function useCreateWorkbook() {
  const Create = useCreate();
  const Modal = useModal();

  type Callback = () => void;

  const NameField = useField({
    key: "Name",
    required: true,
    status: "default",
    value: "",
    placeholder: "문제집 이름을 작성해주세요",
    message: "",
    maxLength: 30,
  });

  const DescriptionField = useField({
    key: "Name",
    required: true,
    status: "default",
    value: "",
    placeholder: "문제집에 대한 설명을 작성해주세요",
    message: "",
    maxLength: 300,
  });

  const onCreate = (onClose: Callback, onPush: Callback) => {
    if (Create.isLoading) return;
    const nameChecked = NameField.onCheckValue();
    const descriptionChecked = DescriptionField.onCheckValue();
    if (nameChecked && descriptionChecked) {
      const name = NameField.getValue();
      const description = DescriptionField.getValue();

      Create.mutate(
        { name, description },
        {
          onSuccess: (data) => {
            onClose();
            onPush();
          },
          onError: (error) => {},
        }
      );
    }
  };

  return {
    Modal,
    NameField,
    DescriptionField,
    onCreate,
  };
}

export default useCreateWorkbook;
