import { ReactElement } from "react";
import styled from "@emotion/styled";

import Logo from "../assets/icons/Logo.svg";

import Gray from "../components/Color/Gray";
import Typography from "../components/Typography/Pretendard";
import SolidButton from "../components/Button/Solid";
import UserImage from "../components/Image/User";

import useSession from "../process/Account/useSession";

interface Props {
  children: ReactElement;
}

function Layout({ children }: Props) {
  const Session = useSession();
  const { Read } = Session;

  return (
    <Template>
      <Header>
        <Logo className="Header-logo" />
        {Read?.data && <UserImage className="Header-user" />}
      </Header>
      {children}
    </Template>
  );
}

const Template = styled.div`
  position: relative;
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
