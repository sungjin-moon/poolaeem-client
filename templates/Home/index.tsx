import styled from "@emotion/styled";

import SignInlogo from "../../assets/icons/SignInlogo.svg";

import Typography from "../../components/Typography/Pretendard";
import SolidButton from "../../components/Button/Solid";
import UserImage from "../../components/Image/User";
import Chip from "../../components/Chip/Basic";

interface Props {}

function Home() {
  return (
    <Template>
      <Header>
        <SignInlogo className="Header-logo" />
        <UserImage className="Header-user" />
      </Header>
      <Typography type="heading" size={1}>
        Heading1
      </Typography>
      <Typography type="heading" size={2}>
        Heading2
      </Typography>
      <Typography type="heading" size={3}>
        Heading3
      </Typography>
      <Typography type="subHeading" size={1}>
        SubHeading1
      </Typography>
      <Typography type="subHeading" size={2}>
        SubHeading2
      </Typography>
      <Typography type="caption" size={1}>
        Caption1
      </Typography>
      <Typography type="caption" size={2}>
        Caption2
      </Typography>
      <Typography type="caption" size={3}>
        Caption3
      </Typography>
      <Typography type="caption" size={4}>
        Caption4
      </Typography>
      <Typography type="caption" size={5}>
        Caption5
      </Typography>
      <Typography type="caption" size={6}>
        Caption6
      </Typography>
      <Typography type="body" size={1}>
        Body1
      </Typography>
      <Typography type="body" size={2}>
        Body2
      </Typography>
      <Typography type="body" size={3}>
        Body3
      </Typography>
      <Typography type="body" size={4}>
        Body4
      </Typography>
      <Typography type="body" size={5}>
        Body5
      </Typography>
      <Typography type="body" size={6}>
        Body6
      </Typography>
      <SolidButton size="small" theme="pink" status="disabled" />
      <SolidButton size="small" theme="lightPink" />
      <SolidButton size="small" theme="white" />
      <SolidButton size="medium" theme="pink" />
      <SolidButton size="medium" theme="lightPink" />
      <SolidButton size="medium" theme="white" />
      <SolidButton size="large" theme="pink" />
      <SolidButton size="large" theme="lightPink" />
      <SolidButton size="large" theme="white" />
      <Chip theme="pink" />
      <Chip theme="lightPink" />
      <Chip theme="yellow" />
      <Chip theme="lightYellow" />
      <Chip theme="blue" />
      <Chip theme="lightBlue" />
      <Chip theme="green" />
      <Chip theme="lightGreen" />
      <Chip theme="white" />
      <Chip theme="black" />
    </Template>
  );
}

const Template = styled.div``;

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

export default Home;
