import useField from "../../hooks/useField";

import { queryClient } from "../../queries";
import useRead from "../../queries/Account/useRead";
import { useUpdateName } from "../../queries/Account/useUpdate";

function useChangeName() {
  const Read = useRead();
  const Update = useUpdateName();

  type Callback = () => void;

  const NameField = useField({
    key: "Name",
    required: true,
    status: "default",
    value: "",
    placeholder: "별명을 작성해주세요",
    message: "",
    maxSize: 30,
  });

  const onChangeName = (onClose: Callback, onPush: Callback) => {
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
    Read,
    NameField,
    onChangeName,
  };
}

export default useChangeName;
