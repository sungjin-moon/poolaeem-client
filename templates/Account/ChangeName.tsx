import { useEffect } from "react";
import styled from "@emotion/styled";

import SingleTextField from "../../components/Field/SingleText";
import { Header } from "../../components/Modal/View/Next";

import useChangeName from "../../process/Account/useChangeName";

interface Props {
  className: string;
  isOpen: boolean;
  onClose: () => void;
  onPush: () => void;
}

function ChangeName({ className, isOpen, onClose, onPush }: Props) {
  const { Read, NameField, onChangeName } = useChangeName();

  useEffect(() => {
    if (isOpen) {
      const nextValue = Read.data?.name;
      NameField.setValue(nextValue);
    }
  }, [isOpen]);

  return (
    <Template className={`ChangeName ${className}`}>
      <Header
        onClose={onClose}
        title="별명 변경"
        action={{ name: "완료", handler: () => onChangeName(onClose, onPush) }}
      />
      <Main>
        <SingleTextField
          className="Main-field"
          label="별명"
          item={NameField.item}
          onChange={NameField.onChange}
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

ChangeName.defaultProps = defaultProps;

const Template = styled.div``;

const Main = styled.main`
  padding: 20px;
`;

export default ChangeName;
