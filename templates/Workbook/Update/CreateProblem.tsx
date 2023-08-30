import { useEffect } from "react";
import styled from "@emotion/styled";

import CheckSign from "../../../assets/icons/$CheckSign.svg";
import CrossMark from "../../../assets/icons/$CrossMark.svg";

import SingleTextField from "../../../components/Field/SingleText";
import DataField from "../../../components/Field/Data";
import { Header } from "../../../components/Modal/View/Next";

import useCreateProblem from "../../../process/Workbook/Update/useCreateProblem";

interface Props {
  className: string;
  isOpen: boolean;
  onClose: () => void;
  onPush: () => void;
}

function CreateProblem({ className, isOpen, onClose, onPush }: Props) {
  const { NameField, OptionsField, onCreate } = useCreateProblem();

  return (
    <Template className={`CreateProblem ${className}`}>
      <Header
        onClose={onClose}
        title="문항 추가"
        action={{
          name: "완료",
          handler: () => onCreate(onClose, onPush),
        }}
      />
      <Main>
        <SingleTextField
          className="Main-field"
          label="문제"
          item={NameField.item}
          onChange={NameField.onChange}
        />
        <DataField
          className="Main-field"
          label="선택지"
          item={OptionsField.item}
          onChange={OptionsField.onChange}
          secondButton={{
            Icon: <CrossMark />,
            name: "오답 유형 추가",
            field: {
              placeholder: "오답이 될 선택지를 작성해주세요",
            },
          }}
          firstButton={{
            Icon: <CheckSign />,
            name: "정답 유형 추가",
            field: {
              placeholder: "정답이 될 선택지를 작성해주세요",
            },
          }}
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

CreateProblem.defaultProps = defaultProps;

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

export default CreateProblem;
