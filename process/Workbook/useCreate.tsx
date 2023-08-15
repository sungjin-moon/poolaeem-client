import useField from "../../hooks/useField";

import useModal from "../../hooks/useModal";

import { queryClient } from "../../queries";
import useRead from "../../queries/Account/useRead";
import { useUpdateName } from "../../queries/Account/useUpdate";

function useCreate() {
  const Read = useRead();
  const Update = useUpdateName();
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
    if (Update.isLoading) return;

    const name = NameField.getValue();

    Update.mutate(
      { name },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(["account", "profile"], {
            ...Read.data,
            ...data,
          });
          onClose();
          onPush();
        },
        onError: (error) => {},
      }
    );
  };

  return {
    Modal,
    Read,
    NameField,
    DescriptionField,
    onCreate,
  };
}

export default useCreate;
