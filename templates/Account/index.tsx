import styled from "@emotion/styled";

import SignInlogo from "../../assets/icons/SignInlogo.svg";

import Typography from "../../components/Typography/Pretendard";
import SolidButton from "../../components/Button/Solid";

import useAccount from "../../process/Account/useAccount";

interface Props {}

function Account() {
  const {} = useAccount();
  return <Template>Account</Template>;
}

const Template = styled.div``;

export default Account;
