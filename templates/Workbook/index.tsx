import { ReactElement, useRef } from "react";
import styled from "@emotion/styled";

import Logo from "../../assets/icons/Logo.svg";

import Gray from "../../components/Color/Gray";
import UserImage from "../../components/Image/User";
import NextModal from "../../components/Modal/View/Next";

import SettingsTemplate from "../Account/Settings";

import useAccount from "../../process/Account";

interface Props {
  children: ReactElement;
}

function Layout({ children }: Props) {
  const Account = useAccount();

  const { Router, Read, Modal } = Account;

  return (
    <Template>
      <Header>
        <Logo className="Header-logo" onClick={() => Router.push("/")} />
        {Read?.data && (
          <UserImage
            className="Header-user"
            src={Read?.data?.image}
            onClick={Modal.onOpen}
          />
        )}
      </Header>
      {children}
      <NextModal
        modalRef={Modal.ref}
        isOpen={Modal.isOpen}
        status={Modal.status}
        onClose={Modal.onClose}
      >
        <SettingsTemplate onClose={Modal.onClose} />
      </NextModal>
    </Template>
  );
}

const Template = styled.div`
  position: relative;
  overflow-x: hidden;
  overflow-y: hidden;
  background: ${Gray[50]};
  height: 100%;
  .Template-view {
    transition: all 0.2s ease-in-out;
  }
`;

const Header = styled.div`
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 8px;
  .Header-logo {
    cursor: pointer;
    width: 92px;
    height: 32px;
  }
  .Header-user {
    width: 26px;
    height: 26px;
    cursor: pointer;
  }
`;

export default Layout;
