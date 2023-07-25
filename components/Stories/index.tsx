import styled from "@emotion/styled";
import { ReactElement } from "react";
import { css } from "@emotion/react";

import LeftArrow from "../../assets/icons/LeftArrow.svg";

import Gray from "../../components/Color/Gray";
import Typography from "../../components/Typography/Pretendard";

import useStories from "../../hooks/useStories";

interface Props {
  className: string;
  children: ReactElement;
  stories: object;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

function Strories({ className, stories, isOpen, onOpen, onClose }: Props) {
  return (
    <View
      className={`Strories ${className}`}
      css={css({
        transform: isOpen === true ? "translateX(0px)" : "translateX(100%)",
      })}
    >
      <Header>
        <LeftArrow onClick={onClose} />
        <Typography className="Header-title" type="caption" size={1}>
          Title
        </Typography>
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
  stories: [],
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
};

Strories.defaultProps = defaultProps;

const View = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: calc(100% - 48px);
  background: ${Gray[50]};
  transition: 0.3s ease-in-out;
`;

const Header = styled.header`
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 8px;
  .Header-title {
    color: ${Gray[700]};
  }
`;

const Main = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  overflow-x: auto;
  .Main-story {
    min-width: 100%;
  }
`;

export default Strories;
