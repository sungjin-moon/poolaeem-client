import styled from "@emotion/styled";
import { useState, useEffect } from "react";

import Edit from "../../../assets/icons/Edit.svg";
import TrashCan from "../../../assets/icons/TrashCan.svg";
import $TrashCan from "../../../assets/icons/$TrashCan.svg";

import Pink from "../../../components/Color/Pink";
import Gray from "../../../components/Color/Gray";
import Typography from "../../../components/Typography/Pretendard";
import { Header } from "../../../components/Modal/View/Next";
import Tabs from "../../../components/Tabs/Basic";
import NextModal from "../../../components/Modal/View/Next";
import ConfirmModal from "../../../components/Modal/DialogBox/Confirm";
import Menu from "../../../components/Menu/Basic";
import ToastBox from "../../../components/Toast";

import UpdateInfoTemplate from "./Settings/UpdateInfo";
import ProblemListTemplate from "./ProblemList";
import SolvedHistoryListTemplate from "./SolvedHistoryList";

import useEdit from "../../../process/Workbook/Edit";

interface Props {
  className: string;
  workbookId: string;
  name: string;
  description: string;
  problemCount: number;
  solvedCount: number;
  createdAt: string;
  isOpen: boolean;
  onClose: () => void;
  onPush: () => void;
}

interface SettingsProps {
  onOpenInfo: () => void;
  onDelete: () => void;
}

type Data = {
  id: string;
  name: string;
  description: string;
};

const Settings = ({ onOpenInfo, onDelete }: SettingsProps) => {
  return (
    <div className="Main-list-settings">
      <Menu
        className="Main-list-settings-menu"
        name="문제집 기본정보 변경"
        Icon={<Edit />}
        onClick={onOpenInfo}
      />
      <Menu
        className="Main-list-settings-menu"
        name="문제집 삭제"
        Icon={<TrashCan />}
        onClick={onDelete}
      />
    </div>
  );
};

function EditWorkbook({
  className,
  workbookId,
  name,
  description,
  problemCount,
  solvedCount,
  createdAt,
  isOpen,
  onClose,
  onPush,
}: Props) {
  const [data, setData] = useState<undefined | Data>({
    id: "",
    name: "",
    description: "",
  });
  const Update = useEdit(workbookId, isOpen);
  const {
    UpdateInfoModal,
    DeleteModal,
    Toast,
    Delete,
    onDelete,
    onRedirectSolve,
  } = Update;
  const { tab, setTab } = Update.Tabs;

  const tabs = [
    { id: "problems", name: `문항 (${problemCount})` },
    { id: "solvedHisotries", name: `풀이내역 (${solvedCount})` },
    { id: "settings", name: "설정" },
  ];

  useEffect(() => {
    if (isOpen === true) {
      setData({ id: workbookId, name, description });
      return;
    }
    if (isOpen === false) {
      setTab(tabs[0]);
      return;
    }
  }, [isOpen]);

  if (isOpen) {
    return (
      <Template className={`EditWorkbook ${className}`}>
        <Header
          onClose={onClose}
          title="문제집"
          action={{ name: "풀이", handler: onRedirectSolve }}
        />
        <Main>
          <div className="Main-info">
            <Typography className="Main-info-name" type="subHeading" size={1}>
              {data?.name}
            </Typography>
            <Typography className="Main-info-createdAt" type="body" size={5}>
              {createdAt}
            </Typography>
            <Tabs
              className="Main-info-tabs"
              tabs={tabs}
              tab={tab}
              setTab={(tab) => {
                if (Delete.isLoading) return;
                setTab(tab);
              }}
            />
          </div>
          <div className="Main-list">
            {tab.id === "problems" && (
              <ProblemListTemplate workbookId={workbookId} />
            )}
            {tab.id === "solvedHisotries" && (
              <SolvedHistoryListTemplate workbookId={workbookId} />
            )}
            {tab.id === "settings" && (
              <Settings
                onOpenInfo={() => {
                  if (Delete.isLoading) return;
                  UpdateInfoModal.onOpen();
                }}
                onDelete={DeleteModal.onOpen}
              />
            )}
          </div>
        </Main>
        <NextModal
          animateType="rightToLeft"
          modalRef={UpdateInfoModal.ref}
          isOpen={UpdateInfoModal.isOpen}
          status={UpdateInfoModal.status}
          onClose={UpdateInfoModal.onClose}
        >
          <UpdateInfoTemplate
            isOpen={UpdateInfoModal.isOpen}
            data={data}
            onClose={(data) => {
              data && setData(data);
              UpdateInfoModal.onClose();
            }}
            onPush={() =>
              Toast.onPush({
                status: "success",
                message: "문제집 기본정보가 변경되었어요",
              })
            }
          />
        </NextModal>
        <ConfirmModal
          Icon={<$TrashCan />}
          title="문제집 삭제"
          description="문제집을 삭제하면 문항 및 풀이내역이 영구 삭제되며, 복구되지 않아요"
          cancel={{
            placeholder: "닫기",
            handler: DeleteModal.onClose,
          }}
          success={{
            placeholder: "문제집 삭제",
            status: Delete.isLoading ? "loading" : "default",
            handler: () => {
              onDelete(workbookId, onClose, () => {
                onPush();
                DeleteModal.onClose();
              });
            },
          }}
          modalRef={DeleteModal.ref}
          isOpen={DeleteModal.isOpen}
          status={DeleteModal.status}
          onClose={DeleteModal.onClose}
        />
        <ToastBox list={Toast.list} />
      </Template>
    );
  }
  return null;
}

const defaultProps = {
  className: "",
  workbookId: "",
  name: "Title",
  description: "",
  problemCount: 0,
  solvedCount: 0,
  createdAt: "0000년 0월 0일",
  isOpen: false,
  onClose: () => {},
  onPush: () => {},
};

EditWorkbook.defaultProps = defaultProps;

const Template = styled.div`
  height: 100%;
`;

const Main = styled.main`
  background: ${Pink[500]};
  border-radius: 20px 20px 0px 0px;
  height: calc(100% - 48px);
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  .Main-info {
    position: sticky;
    top: 0px;
    background: inherit;
    padding: 20px;
    .Main-info-name {
      color: ${Gray[50]};
    }
    .Main-info-createdAt {
      color: ${Gray[50]};
    }
    .Main-info-tabs {
      margin-top: 20px;
    }
  }
  .Main-list {
    padding: 0px 20px 20px 20px;
    .Main-list-settings {
      .Main-list-settings-menu {
        margin-bottom: 6px;
      }
    }
  }
`;

export default EditWorkbook;
