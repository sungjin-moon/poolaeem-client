import styled from "@emotion/styled";

import CheckSign from "../../assets/icons/$CheckSign.svg";

import Typography from "../../components/Typography/Pretendard";
import SolidButton from "../../components/Button/Solid";
import Pink from "../../components/Color/Pink";
import Confirm from "../../components/Modal/DialogBox/Confirm";
import StoriesBox from "../../components/Stories";

import SignInBackground from "../../assets/icons/SignInBackground.svg";
import Logo from "../../assets/icons/Logo.svg";
import Google from "../../assets/icons/Google.svg";

import useSignIn from "../../process/SignIn/useSignIn";

import useStories from "../../hooks/useStories";

interface Props {}

function SignIn() {
  const { Modal, Create, onAuthGoogle, onSignUp } = useSignIn();
  const Stories = useStories();

  return (
    <Template>
      <SignInBackground className="SignIn-background" />
      <Logo className="SignIn-logo" />
      <div className="SignIn-bottom">
        <SolidButton
          className="SignIn-bottom-button"
          theme="white"
          size="large"
          placeholder="Google 계정 로그인"
          Icon={<Google />}
          onClick={onAuthGoogle}
          // onClick={Stories.onOpen}
        />
        <Typography className="SignIn-bottom-copyright" type="body" size={6}>
          © team 901. All rights reserved.
        </Typography>
      </div>
      <Confirm
        hooks={{ Modal }}
        Icon={<CheckSign />}
        title="약관 동의"
        description="만 14세 이상이며 개인정보 수집(이메일 주소, 이름)에 동의하시나요?"
        cancel={{
          placeholder: "동의하지 않음",
          handler: Modal.onClose,
        }}
        success={{
          placeholder: "동의함",
          status: Create.isLoading ? "loading" : "default",
          handler: onSignUp,
        }}
      />
      <StoriesBox hooks={{ Stories }} />
    </Template>
  );
}

const Template = styled.div`
  position: relative;
  background: ${Pink[100]};
  height: 100vh;
  .SignIn-background {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .SignIn-logo {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .SignIn-bottom {
    position: absolute;
    bottom: 0px;
    width: 100%;
    padding: 40px 20px;
    .SignIn-bottom-button {
      width: 100%;
    }
    .SignIn-bottom-copyright {
      margin-top: 62px;
      justify-content: center;
      color: ${Pink[400]};
    }
  }
`;

export default SignIn;
