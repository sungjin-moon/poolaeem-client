import styled from "@emotion/styled";

import WarningSign from "../../assets/icons/$WarningSign.svg";

import Gray from "../../components/Color/Gray";
import Typography from "../../components/Typography/Pretendard";
import SoldButton from "../../components/Button/Solid";
import ImageFieldBox from "../../components/Field/Image";
import ConfirmModal from "../../components/Modal/DialogBox/Confirm";
import NextModal, { Header } from "../../components/Modal/View/Next";
import ToastBox from "../../components/Toast";
import ChangeNameTemplate from "./ChangeName";

import useSettings from "../../process/Account/useSettings";

interface Props {
  className: string;
  onClose: () => void;
}

function Settings({ className, onClose }: Props) {
  const {
    Toast,
    Read,
    Delete,
    DeleteAccountModal,
    ChangeNameModal,
    ImageField,
    onChangeImage,
    onDeleteAccount,
    onSignOut,
  } = useSettings();

  const name = Read?.data?.name;
  const email = Read?.data?.email;

  return (
    <Template className={`Settings ${className}`}>
      <Header
        onClose={onClose}
        title="내 정보"
        action={{ name: "문의", handler: () => {} }}
      />
      <Main>
        <ImageFieldBox
          className="Main-field"
          label=""
          item={ImageField.item}
          onChange={onChangeImage}
        />
        <Typography className="Main-name" type="subHeading" size={1}>
          {name}
        </Typography>
        <Typography className="Main-email" type="body" size={3}>
          {email}
        </Typography>
        <div className="Main-buttons">
          <SoldButton
            className="Main-buttons-button"
            size="large"
            placeholder="별명 변경"
            onClick={ChangeNameModal.onOpen}
          />
          <SoldButton
            className="Main-buttons-button"
            size="large"
            placeholder="로그 아웃"
            theme="lightPink"
            onClick={onSignOut}
          />
          <SoldButton
            className="Main-buttons-button"
            size="large"
            placeholder="회원 탈퇴"
            theme="lightPink"
            status={Delete.isLoading ? "loading" : "default"}
            onClick={DeleteAccountModal.onOpen}
          />
        </div>
      </Main>

      <ConfirmModal
        Icon={<WarningSign />}
        title="회원 탈퇴"
        description="탈퇴하시면 회원님의 모든 정보가 영구 삭제되며, 복구되지 않아요"
        cancel={{
          placeholder: "닫기",
          handler: DeleteAccountModal.onClose,
        }}
        success={{
          placeholder: "회원탈퇴",
          status: Delete.isLoading ? "loading" : "default",
          handler: onDeleteAccount,
        }}
        modalRef={DeleteAccountModal.ref}
        isOpen={DeleteAccountModal.isOpen}
        status={DeleteAccountModal.status}
        onClose={DeleteAccountModal.onClose}
      />

      <NextModal
        modalRef={ChangeNameModal.ref}
        isOpen={ChangeNameModal.isOpen}
        status={ChangeNameModal.status}
        onClose={ChangeNameModal.onClose}
      >
        <ChangeNameTemplate
          isOpen={ChangeNameModal.isOpen}
          onClose={() => {
            ChangeNameModal.onClose();
            Toast.onPush({
              status: "success",
              message: "내 정보가 변경되었어요",
            });
          }}
        />
      </NextModal>

      <ToastBox list={Toast.list} />
    </Template>
  );
}

const defaultProps = {
  className: "",
};

Settings.defaultProps = defaultProps;

const Template = styled.div`
  height: 100%;
`;

const Main = styled.div`
  height: calc(100% - 48px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  .Main-field {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
  .Main-email {
    color: ${Gray[700]};
  }
  .Main-buttons {
    width: 100%;
    margin-top: 40px;
    .Main-buttons-button {
      width: 100%;
      margin-bottom: 8px;
      :last-child {
        margin-bottom: 0px;
      }
    }
  }
`;

export default Settings;
