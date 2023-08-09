import styled from "@emotion/styled";

import WarningSign from "../../assets/icons/$WarningSign.svg";

import Gray from "../../components/Color/Gray";
import Typography from "../../components/Typography/Pretendard";
import SoldButton from "../../components/Button/Solid";
import { Layout } from "../../components/Stories";
import Confirm from "../../components/Modal/DialogBox/Confirm";
import ImageFieldBox from "../../components/Field/Image";

import useSettings from "../../process/Account/useSettings";

interface Props {
  className: string;
  onSlidePrev: () => void;
  onSlideNext: () => void;
}

function Settings({ className, onSlidePrev, onSlideNext }: Props) {
  const { Read, Delete, Modal, ImageField, onDeleteAccount, onSignOut } =
    useSettings();

  const name = Read?.data?.name;
  const email = Read?.data?.email;

  return (
    <Layout
      title="내 정보"
      onSlidePrev={onSlidePrev}
      action={{
        name: "문의",
        handler: () => {},
      }}
    >
      <Template className={`Settings ${className}`}>
        <ImageFieldBox
          className="Settings-field"
          label=""
          item={ImageField.item}
          onChange={ImageField.onChange}
        />
        <Typography className="Settings-name" type="subHeading" size={1}>
          {name}
        </Typography>
        <Typography className="Settings-email" type="body" size={3}>
          {email}
        </Typography>
        <div className="Settings-buttons">
          <SoldButton
            className="Settings-buttons-button"
            size="large"
            placeholder="별명 변경"
            onClick={onSlideNext}
          />
          <SoldButton
            className="Settings-buttons-button"
            size="large"
            placeholder="로그 아웃"
            theme="lightPink"
            onClick={onSignOut}
          />
          <SoldButton
            className="Settings-buttons-button"
            size="large"
            placeholder="회원 탈퇴"
            theme="lightPink"
            status={Delete.isLoading ? "loading" : "default"}
            onClick={Modal.onOpen}
          />
        </div>
        <Confirm
          Icon={<WarningSign />}
          title="회원 탈퇴"
          description="탈퇴하시면 회원님의 모든 정보가 영구 삭제되며, 복구되지 않아요"
          cancel={{
            placeholder: "닫기",
            handler: Modal.onClose,
          }}
          success={{
            placeholder: "회원탈퇴",
            status: Delete.isLoading ? "loading" : "default",
            handler: onDeleteAccount,
          }}
          modalRef={Modal.ref}
          isOpen={Modal.isOpen}
          status={Modal.status}
          onClose={Modal.onClose}
        />
      </Template>
    </Layout>
  );
}

const defaultProps = {
  className: "",
  onSlidePrev: () => {},
  onSlideNext: () => {},
};

Settings.defaultProps = defaultProps;

const Template = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .Settings-field {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 10px;
  }
  .Settings-email {
    color: ${Gray[700]};
  }
  .Settings-buttons {
    width: 100%;
    margin-top: 40px;
    .Settings-buttons-button {
      width: 100%;
      margin-bottom: 8px;
      :last-child {
        margin-bottom: 0px;
      }
    }
  }
`;

export default Settings;
