import styled from "@emotion/styled";
import { useState, useEffect } from "react";

import Edit from "../../../assets/icons/Edit.svg";
import TrashCan from "../../../assets/icons/TrashCan.svg";
import Add from "../../../assets/icons/Add.svg";
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
import Spinner from "../../../components/Loader/Spinner";

import UpdateInfoTemplate from "./UpdateInfo";
import CreateProblemTemplate from "./CreateProblem";

import useUpdate from "../../../process/Workbook/Update/useUpdate";

interface Props {
  className: string;
  id: string;
  name: string;
  description: string;
  createdAt: string;
  isOpen: boolean;
  onClose: () => void;
  onPush: () => void;
}

interface SettingsProps {
  onOpenInfo: () => void;
  onDelete: () => void;
}

interface ProblemsProps {
  isFetched: boolean;
  isRefetching: boolean;
  pages: ProblemPages[];
  length: number;
  onOpenCreate: () => void;
}

interface SolvedHistoriesProps {
  isFetched: boolean;
  isRefetching: boolean;
  pages: SolvedHistoryPages[];
  length: number;
}

type Data = {
  id: string;
  name: string;
  description: string;
};

type SolvedHistory = {
  id: string;
  userName: string;
  questionCount: number;
  correctCount: number;
  solvedAt: string;
};

type Problem = {
  id: string;
  question: string;
  type: string;
  optionCount: number;
  timeout: number;
};

type SolvedHistoryPages = {
  total: number;
  hasNext: boolean;
  list: SolvedHistory[];
};

type ProblemPages = {
  total: number;
  hasNext: boolean;
  list: Problem[];
};

const Settings = ({ onOpenInfo, onDelete }: SettingsProps) => {
  return (
    <div className="Main-settings">
      <Menu
        className="Main-settings-menu"
        name="문제집 기본정보 변경"
        Icon={<Edit />}
        onClick={onOpenInfo}
      />
      <Menu
        className="Main-settings-menu"
        name="문제집 삭제"
        Icon={<TrashCan />}
        onClick={onDelete}
      />
    </div>
  );
};

const Problems = ({
  isFetched,
  isRefetching,
  pages,
  length,
  onOpenCreate,
}: ProblemsProps) => {
  return (
    <div className="Main-problems">
      {isFetched && (
        <Menu
          className="Main-problems-menu"
          name="문항 추가"
          Icon={<Add />}
          onClick={onOpenCreate}
        />
      )}
      {isFetched && length === 0 && (
        <div className="Main-problems-empty">
          <Typography
            className="Main-problems-empty-description"
            type="body"
            size={6}
          >
            아직 문항이 존재하지 않아요
          </Typography>
        </div>
      )}
      {!isFetched && (
        <div className="Main-problems-loading">
          <Spinner className="Main-problems-loading-spinner" />
        </div>
      )}
      {isFetched && length > 0 && (
        <div className="Main-problems-list">
          {pages.map((page, pageIndex) => {
            const lastPageIndex = pages.length - 1;
            const isLastPage = lastPageIndex === pageIndex;
            return page.list.map((problem) => {
              return (
                <div className="Table-row" key={problem.id}>
                  {problem.id}
                </div>
              );
            });
          })}
        </div>
      )}

      {isRefetching && (
        <div className="Main-problems-loading">
          <Spinner className="Main-problems-loading-spinner" />
        </div>
      )}
    </div>
  );
};

const SolvedHistories = ({
  isFetched,
  isRefetching,
  pages,
  length,
}: SolvedHistoriesProps) => {
  return (
    <div className="Main-solvedHistories">
      {isFetched && length === 0 && (
        <div className="Main-solvedHistories-empty">
          <Typography
            className="Main-solvedHistories-empty-description"
            type="body"
            size={6}
          >
            아직 풀이내역이 존재하지 않아요
          </Typography>
        </div>
      )}

      {!isFetched && (
        <div className="Main-solvedHistories-loading">
          <Spinner className="Main-solvedHistories-loading-spinner" />
        </div>
      )}
      {isFetched && length > 0 && (
        <Table>
          <div className="Table-column">
            <Typography className="Table-column-name" type="body" size={6}>
              별명
            </Typography>
            <Typography className="Table-column-name" type="body" size={6}>
              풀이날짜
            </Typography>
            <Typography className="Table-column-name" type="body" size={6}>
              문항
            </Typography>
          </div>
          {pages.map((page, pageIndex) => {
            const lastPageIndex = pages.length - 1;
            const isLastPage = lastPageIndex === pageIndex;
            return page.list.map((solvedHistory) => {
              return (
                <div className="Table-row" key={solvedHistory.id}>
                  {/* <ScrollView
                        ref={InfiniteScroll.ref}
                        css={css({
                          display:
                            hasNextPage === true &&
                            isLastPage &&
                            page.list.length - 1 === workbookIndex
                              ? "block"
                              : "none",
                        })}
                      /> */}
                  <Typography
                    className="Table-row-name"
                    type="caption"
                    size={6}
                  >
                    {solvedHistory.userName}
                  </Typography>
                  <Typography
                    className="Table-row-name"
                    type="caption"
                    size={6}
                  >
                    {solvedHistory.solvedAt}
                  </Typography>
                  <Typography
                    className="Table-row-name"
                    type="caption"
                    size={6}
                  >
                    {`${solvedHistory.correctCount}/${solvedHistory.questionCount} 문항`}
                  </Typography>
                </div>
              );
            });
          })}
        </Table>
      )}

      {isRefetching && (
        <div className="Main-solvedHistories-loading">
          <Spinner className="Main-solvedHistories-loading-spinner" />
        </div>
      )}
    </div>
  );
};

function UpdateWorkbook({
  className,
  id,
  name,
  description,
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
  const Update = useUpdate(id, isOpen);
  const {
    UpdateInfoModal,
    DeleteModal,
    CreateProblemModal,
    Toast,
    Delete,
    SolvedHistoryList,
    ProblemList,
    onDelete,
  } = Update;
  const { tabs, tab, setTab } = Update.Tabs;

  const solvedHistoryPages = SolvedHistoryList.data?.pages || [];
  const solvedHistoryLength =
    solvedHistoryPages?.[solvedHistoryPages?.length - 1]?.list?.length || 0;

  const problemPages = ProblemList.data?.pages || [];
  const problemLength =
    problemPages?.[problemPages?.length - 1]?.list?.length || 0;

  useEffect(() => {
    if (isOpen === true) {
      setData({ id, name, description });
      return;
    }
  }, [isOpen]);
  return (
    <Template className={`UpdateWorkbook ${className}`}>
      <Header
        onClose={onClose}
        title="문제집"
        action={{ name: "풀이", handler: () => {} }}
      />
      <Main>
        <Typography className="Main-name" type="subHeading" size={1}>
          {data?.name}
        </Typography>
        <Typography className="Main-createdAt" type="body" size={5}>
          {createdAt}
        </Typography>
        <Tabs
          className="Main-tabs"
          tabs={tabs}
          tab={tab}
          setTab={(tab) => {
            if (Delete.isLoading) return;
            setTab(tab);
          }}
        />
        {tab.id === "problems" && (
          <Problems
            isFetched={ProblemList.isFetched}
            isRefetching={ProblemList.isRefetching}
            pages={problemPages}
            length={problemLength}
            onOpenCreate={CreateProblemModal.onOpen}
          />
        )}
        {tab.id === "solvedHisotries" && (
          <SolvedHistories
            isFetched={SolvedHistoryList.isFetched}
            isRefetching={SolvedHistoryList.isRefetching}
            pages={solvedHistoryPages}
            length={solvedHistoryLength}
          />
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
      <NextModal
        animateType="bottomToTop"
        modalRef={CreateProblemModal.ref}
        isOpen={CreateProblemModal.isOpen}
        status={CreateProblemModal.status}
        onClose={CreateProblemModal.onClose}
      >
        <CreateProblemTemplate
          isOpen={CreateProblemModal.isOpen}
          onClose={CreateProblemModal.onClose}
          onPush={() =>
            Toast.onPush({
              status: "success",
              message: "문항이 추가되었어요",
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
            onDelete(id, onClose, () => {
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

const defaultProps = {
  className: "",
  id: "",
  name: "Title",
  description: "",
  createdAt: "0000년 0월 0일",
  isOpen: false,
  onClose: () => {},
  onPush: () => {},
};

UpdateWorkbook.defaultProps = defaultProps;

const Template = styled.div`
  height: 100%;
`;

const Main = styled.main`
  padding: 20px;
  background: ${Pink[500]};
  border-radius: 20px 20px 0px 0px;
  height: 100%;
  .Main-name {
    color: ${Gray[50]};
  }
  .Main-createdAt {
    color: ${Gray[50]};
  }
  .Main-tabs {
    margin: 20px 0px;
  }
  .Main-settings {
    .Main-settings-menu {
      margin-bottom: 6px;
    }
  }
  .Main-solvedHistories {
    .Main-solvedHistories-empty {
      height: 120px;
      border: solid 1px;
      border-color: ${Pink[400]};
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      .Main-solvedHistories-empty-description {
        color: ${Gray[50]};
      }
    }
    .Main-solvedHistories-loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 240px;
      .Main-solvedHistories-loading-spinner {
        border: 2px solid ${Pink[400]};
        border-top: 2px solid ${Gray[50]};
      }
    }
  }
  .Main-problems {
    .Main-problems-menu {
      margin-bottom: 6px;
    }
    .Main-problems-empty {
      height: 120px;
      border: solid 1px;
      border-color: ${Pink[400]};
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      .Main-problems-empty-description {
        color: ${Gray[50]};
      }
    }
    .Main-problems-loading {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 240px;
      .Main-problems-loading-spinner {
        border: 2px solid ${Pink[400]};
        border-top: 2px solid ${Gray[50]};
      }
    }
  }
`;

const Table = styled.div`
  display: flex;
  flex-direction: column;
  .Table-column {
    display: flex;
    padding: 0px 6px;
    .Table-column-name {
      width: 100%;
      padding: 0px 6px;
      border-right: solid 1px;
      color: ${Gray[50]};
      border-color: transparent;
      :last-child {
        border-right: 0px;
      }
    }
  }
  .Table-row {
    display: flex;
    padding: 8px 6px;
    background: ${Pink[400]};
    border-radius: 12px;
    margin-top: 6px;
    .Table-row-name {
      width: 100%;
      border-right: solid 1px;
      color: ${Gray[50]};
      padding: 0px 6px;
      :last-child {
        border-right: 0px;
      }
    }
  }
`;

const ScrollView = styled.div`
  height: 1px;
`;

export default UpdateWorkbook;
