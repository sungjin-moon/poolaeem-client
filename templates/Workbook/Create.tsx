import { useEffect } from "react";
import styled from "@emotion/styled";

import SingleTextField from "../../components/Field/SingleText";
import MultiTexttField from "../../components/Field/MultiText";
import { Header } from "../../components/Modal/View/Next";

import useCreateWorkbook from "../../process/Workbook/useCreate";

interface Props {
  className: string;
  isOpen: boolean;
  onClose: () => void;
  onPush: () => void;
}

function CreateWorkbook({ className, isOpen, onClose, onPush }: Props) {
  const { NameField, DescriptionField, onCreate } = useCreateWorkbook();

  useEffect(() => {
    if (isOpen) {
      NameField.setValue("");
      DescriptionField.setValue("");
    }
  }, [isOpen]);

  return (
    <Template className={`CreateWorkbook ${className}`}>
      <Header
        onClose={onClose}
        title="문제집 만들기"
        action={{ name: "완료", handler: () => onCreate(onClose, onPush) }}
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
  onClose: () => {},
  onPush: () => {},
};

CreateWorkbook.defaultProps = defaultProps;

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

export default CreateWorkbook;
