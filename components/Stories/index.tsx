import styled from "@emotion/styled";
import { ReactElement } from "react";
import { css } from "@emotion/react";

import LeftArrow from "../../assets/icons/LeftArrow.svg";

import Gray from "../../components/Color/Gray";

import useStories from "../../hooks/useStories";

interface Props {
  className: string;
  children: ReactElement;
  hooks: {
    Stories: {
      isOpen: boolean;
      onOpen: () => void;
      onClose: () => void;
    };
  };
}

function Strories({ className, hooks }: Props) {
  const { isOpen, onClose } = hooks.Stories || useStories();
  return (
    <View
      className={`Strories ${className}`}
      css={css({
        transform: isOpen === true ? "translateY(0px)" : "translateY(100%)",
      })}
    >
      <Header>
        <LeftArrow onClick={onClose} />
        <button>Next</button>
      </Header>
      <Main>
        <div className="Main-story">1</div>
        <div className="Main-story">2</div>
      </Main>
    </View>
  );
}

const defaultProps = {
  className: "",
  children: null,
  hooks: {
    Stories: null,
  },
};

Strories.defaultProps = defaultProps;

const View = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: ${Gray[50]};
  transition: 0.3s ease-in-out;
`;

const Header = styled.header`
  border: solid 1px;
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 8px;
`;

const Main = styled.main`
  border: solid 1px;
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: auto;
  .Main-story {
    border: solid 1px;
    min-width: 100%;
  }
`;

export default Strories;
