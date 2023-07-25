import { ReactElement } from "react";
import styled from "@emotion/styled";

import Logo from "../assets/icons/Logo.svg";

import Gray from "../components/Color/Gray";
import UserImage from "../components/Image/User";
import StoriesBox from "../components/Stories";

import useAccount from "../process/Account/useAccount";

interface Props {
  children: ReactElement;
}

function Layout({ children }: Props) {
  const Account = useAccount();
  const { Read, Stories } = Account;

  return (
    <Template>
      <Header>
        <Logo className="Header-logo" />
        {Read?.data && (
          <UserImage className="Header-user" onClick={Stories.onOpen} />
        )}
      </Header>
      {children}
      <StoriesBox {...Stories} />
    </Template>
  );
}

const Template = styled.div`
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  background: ${Gray[50]};
  height: 100%;
`;

const Header = styled.div`
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 8px;
  .Header-logo {
    width: 92px;
    height: 32px;
  }
  .Header-user {
    width: 26px;
    height: 26px;
  }
`;

export default Layout;
