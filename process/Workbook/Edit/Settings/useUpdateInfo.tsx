import { useState } from "react";
import useField from "../../../../hooks/useField";

import useModal from "../../../../hooks/useModal";

import { queryClient } from "../../../../queries";
import { useUpdateInfo } from "../../../../queries/Workbook/useUpdate";

type Data = {
  id: string;
  name: string;
  description: string;
};

type onClose = (data: undefined | Data) => void;
type onPush = () => void;

function useUpdate() {
  const UpdateInfo = useUpdateInfo();

  const NameField = useField({
    key: "name",
    required: true,
    status: "default",
    value: "",
    placeholder: "문제집 이름을 작성해주세요",
    message: "",
    maxLength: 30,
  });

  const DescriptionField = useField({
    key: "description",
    required: false,
    status: "default",
    value: "",
    placeholder: "문제집에 대한 설명을 작성해주세요",
    message: "",
    maxLength: 300,
  });

  const onUpdate = (id: string = "", onClose: onClose, onPush: onPush) => {
    if (UpdateInfo.isLoading) return;
    const nameChecked = NameField.onCheckValue();
    const descriptionChecked = DescriptionField.onCheckValue();
    if (nameChecked && descriptionChecked) {
      const name = NameField.getValue();
      const description = DescriptionField.getValue();

      UpdateInfo.mutate(
        { id, name, description },
        {
          onSuccess: (data) => {
            queryClient.invalidateQueries("workbookList");
            queryClient.invalidateQueries(["workbook-info", id]);
            onClose({ id, name, description });
            onPush();
          },
          onError: (error) => {},
        }
      );
    }
  };

  return {
    UpdateInfo,
    NameField,
    DescriptionField,
    onUpdate,
  };
}

export default useUpdate;
