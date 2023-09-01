import { useEffect } from "react";
import styled from "@emotion/styled";

import CheckSign from "../../../../assets/icons/$CheckSign.svg";
import CrossMark from "../../../../assets/icons/$CrossMark.svg";

import SingleTextField from "../../../../components/Field/SingleText";
import DataField from "../../../../components/Field/Data";
import { Header } from "../../../../components/Modal/View/Next";

import useUpdateProblem from "../../../../process/Workbook/Edit/ProblemList/useUpdateProblem";

interface Props {
  className: string;
  isOpen: boolean;
  id: string;
  wrokbookId: string;
  onClose: () => void;
  onPush: () => void;
}

function UpdateProblem({
  className,
  id,
  wrokbookId,
  isOpen,
  onClose,
  onPush,
}: Props) {
  const { QuestionField, OptionsField, onUpdate } = useUpdateProblem(
    id,
    wrokbookId,
    isOpen
  );

  return (
    <Template className={`UpdateProblem ${className}`}>
      <Header
        onClose={onClose}
        title="문항 편집"
        action={{
          name: "완료",
          handler: () => onUpdate(onClose, onPush),
        }}
      />
      <Main>
        <SingleTextField
          className="Main-field"
          label="문제"
          item={QuestionField.item}
          onChange={QuestionField.onChange}
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
  id: "",
  wrokbookId: "",
  onClose: () => {},
  onPush: () => {},
};

UpdateProblem.defaultProps = defaultProps;

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

export default UpdateProblem;
