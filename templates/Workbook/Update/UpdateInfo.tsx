import { useEffect } from "react";
import styled from "@emotion/styled";

import SingleTextField from "../../../components/Field/SingleText";
import MultiTexttField from "../../../components/Field/MultiText";
import { Header } from "../../../components/Modal/View/Next";

import useUpdateInfo from "../../../process/Workbook/Update/useUpdateInfo";

type Data = {
  id: string;
  name: string;
  description: string;
};

interface Props {
  className: string;
  isOpen: boolean;
  data: Data;
  onClose: (data: undefined | Data) => void;
  onPush: () => void;
}

function UpdateInfo({ className, isOpen, data, onClose, onPush }: Props) {
  const { NameField, DescriptionField, onUpdate } = useUpdateInfo();

  useEffect(() => {
    if (isOpen) {
      NameField.setValue(data.name);
      DescriptionField.setValue(data.description);
    }
  }, [isOpen]);

  return (
    <Template className={`UpdateInfo ${className}`}>
      <Header
        onClose={onClose}
        title="문제집 기본정보 변경"
        action={{
          name: "완료",
          handler: () => onUpdate(data.id, onClose, onPush),
        }}
      />
      <Main>
        <SingleTextField
          className="Main-field"
          label="문제집 이름"
          item={NameField.item}
          onChange={NameField.onChange}
        />
        <MultiTexttField
          className="Main-field"
          label="문제집 설명"
          item={DescriptionField.item}
          onChange={DescriptionField.onChange}
        />
      </Main>
    </Template>
  );
}

const defaultProps = {
  className: "",
  isOpen: false,
  data: {
    id: "",
    name: "",
    description: "",
  },
  onClose: () => {},
  onPush: () => {},
};

UpdateInfo.defaultProps = defaultProps;

const Template = styled.div``;

const Main = styled.main`
  padding: 20px;
  .Main-field {
    margin-bottom: 20px;
    :last-child {
      margin-bottom: 0px;
    }
  }
`;

export default UpdateInfo;
