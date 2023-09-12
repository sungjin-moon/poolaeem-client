import styled from "@emotion/styled";

import Logo from "../../assets/icons/Logo.svg";
import SpeechBalloon from "../../assets/icons/SpeechBalloon.svg";

import Typography from "../../components/Typography/Pretendard";
import SolidButton from "../../components/Button/Solid";
import Pink from "../../components/Color/Pink";
import PromptModal from "../../components/Modal/DialogBox/Prompt";
import NextModal from "../../components/Modal/View/Next";
import Spinner from "../../components/Loader/Spinner";
import UserImage from "../../components/Image/User";
import ToastBox from "../../components/Toast";

import ProblemListTemplate from "./ProblemList";

import useSolve from "../../process/Solve/useSolve";

interface Props {}

function Solve() {
  const {
    Router,
    EnterNameModal,
    ProblemsModal,
    Toast,
    Info,
    Profile,
    onCopyLink,
  } = useSolve();
  const data = Info.data;

  if (!Info.isFetched) {
    return (
      <Template className="Solve">
        <div className="Solve-loading">
          <Spinner className="Solve-loading-spinner" />
        </div>
      </Template>
    );
  }

  return (
    <Template className="Solve">
      <Header>
        <Logo className="Header-logo" onClick={() => Router.push("/")} />
        <div className="Header-button" onClick={onCopyLink}>
          <Typography className="Header-button-name" type="caption" size={3}>
            공유
          </Typography>
        </div>
      </Header>
      <Main>
        <Typography className="Main-title" type="heading" size={3}>
          {data?.name}
        </Typography>
        <Typography className="Main-description" type="body" size={3}>
          {data?.description}
        </Typography>
        <Table>
          <div className="Table-row">
            <Typography className="Table-row-label" type="body" size={3}>
              출제자
            </Typography>
            <Typography className="Table-row-value" type="caption" size={3}>
              <UserImage
                className="Table-row-value-userImage"
                src={data?.creator?.imageUrl}
              />
              {data?.creator?.name}
            </Typography>
          </div>
          <div className="Table-row">
            <Typography className="Table-row-label" type="body" size={3}>
              출제일
            </Typography>
            <Typography className="Table-row-value" type="caption" size={3}>
              {data?.createdAt}
            </Typography>
          </div>
          <div className="Table-row">
            <Typography className="Table-row-label" type="body" size={3}>
              문항수
            </Typography>
            <Typography className="Table-row-value" type="caption" size={3}>
              {data?.problemCount}
            </Typography>
          </div>
          <div className="Table-row">
            <Typography className="Table-row-label" type="body" size={3}>
              풀이한 사람
            </Typography>
            <Typography className="Table-row-value" type="caption" size={3}>
              {data?.solvedCount}
            </Typography>
          </div>
        </Table>
        <SolidButton
          placeholder="풀이 시작"
          size="large"
          onClick={() => {
            if (Profile.isLoading) return;
            const profile = Profile.data;
            if (profile) {
              return ProblemsModal.onOpen({ name: profile.name });
            }
            return EnterNameModal.onOpen();
          }}
        />
        <Typography className="Main-copyright" type="body" size={6}>
          © team 901. All rights reserved.
        </Typography>
      </Main>
      <PromptModal
        Icon={<SpeechBalloon />}
        title="별명 입력"
        field={EnterNameModal.field}
        cancel={{
          placeholder: "닫기",
          handler: EnterNameModal.onClose,
        }}
        success={{
          placeholder: "풀이 시작",
          handler: (item) => {
            const name: string = item.value || "";
            return ProblemsModal.onOpen({ name });
          },
        }}
        modalRef={EnterNameModal.ref}
        isOpen={EnterNameModal.isOpen}
        status={EnterNameModal.status}
        onClose={EnterNameModal.onClose}
      />
      <NextModal
        modalRef={ProblemsModal.ref}
        animateType="bottomToTop"
        isOpen={ProblemsModal.isOpen}
        status={ProblemsModal.status}
        onClose={ProblemsModal.onClose}
      >
        <ProblemListTemplate
          isOpen={ProblemsModal.isOpen}
          name={ProblemsModal.data?.name}
          onClose={ProblemsModal.onClose}
        />
      </NextModal>
      <ToastBox list={Toast.list} />
    </Template>
  );
}

const Template = styled.div`
  position: relative;
  background: ${Pink[50]};
  height: 100%;
  .Solve-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 400px;
    .Solve-loading-loader {
      border: solid 1px;
    }
  }
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
    cursor: pointer;
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
  padding: 20px;
  height: calc(100% - 48px);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  .Main-title {
    margin-bottom: 4px;
    color: ${Pink[500]};
    text-align: center;
  }
  .Main-description {
    color: ${Pink[500]};
    text-align: center;
  }
  .Main-copyright {
    justify-content: center;
    color: ${Pink[500]};
    padding: 28px 0px;
    margin-top: auto;
  }
`;

const Table = styled.div`
  margin: 48px 0px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  .Table-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    padding: 0px 12px;
    height: 42px;
    background: ${Pink[100]};
    border-radius: 12px;
    .Table-row-label,
    .Table-row-value {
      color: ${Pink[500]};
      align-items: center;
      .Table-row-value-userImage {
        width: 26px;
        height: 26px;
        margin-right: 6px;
      }
    }
  }
`;

export default Solve;
