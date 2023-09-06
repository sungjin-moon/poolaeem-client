import styled from "@emotion/styled";

import Logo from "../../assets/icons/Logo.svg";

import Typography from "../../components/Typography/Pretendard";
import SolidButton from "../../components/Button/Solid";
import Pink from "../../components/Color/Pink";
import ConfirmModal from "../../components/Modal/DialogBox/Confirm";

import useSolve from "../../process/Solve/useSolve";

interface Props {}

function Solve() {
  const {} = useSolve();

  return (
    <Template className="Solve">
      <Header>
        <Logo className="Header-logo" />
        <div className="Header-button">
          <Typography className="Header-button-name" type="caption" size={3}>
            공유
          </Typography>
        </div>
      </Header>
      <Main>
        <Typography className="Main-copyright" type="body" size={6}>
          © team 901. All rights reserved.
        </Typography>
      </Main>
    </Template>
  );
}

const Template = styled.div`
  position: relative;
  background: ${Pink[100]};
  height: 100%;
`;

const Header = styled.header`
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 8px;
  .Header-logo {
    width: 92px;
    height: 32px;
  }
  .Header-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    cursor: pointer;
    .Header-button-name {
      color: ${Pink[500]};
    }
  }
`;

const Main = styled.main`
  border: solid 1px;
  padding: 20px;

  .Main-copyright {
    border: solid 1px;
    justify-content: center;
    color: ${Pink[400]};
    padding: 28px 0px;
  }
`;

export default Solve;
