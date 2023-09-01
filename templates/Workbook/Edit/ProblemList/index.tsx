import styled from "@emotion/styled";

import Edit from "../../../../assets/icons/Edit.svg";
import TrashCan from "../../../../assets/icons/TrashCan.svg";
import Add from "../../../../assets/icons/Add.svg";
import $TrashCan from "../../../../assets/icons/$TrashCan.svg";

import Menu from "../../../../components/Menu/Basic";
import Pink from "../../../../components/Color/Pink";
import Gray from "../../../../components/Color/Gray";
import Typography from "../../../../components/Typography/Pretendard";
import Spinner from "../../../../components/Loader/Spinner";
import Chip from "../../../../components/Chip/Basic";
import NextModal from "../../../../components/Modal/View/Next";
import ConfirmModal from "../../../../components/Modal/DialogBox/Confirm";
import ToastBox from "../../../../components/Toast";

import CreateProblemTemplate from "./CreateProblem";

import useProblemList from "../../../../process/Workbook/Edit/ProblemList";

interface Props {
  workbookId: string;
}

function ProblemList({ workbookId }: Props) {
  const {
    List,
    Delete,
    CreateModal,
    DeleteModal,
    UpdateModal,
    Toast,
    onDelete,
  } = useProblemList(workbookId);
  const { isFetched, isRefetching } = List;

  const pages = List.data?.pages || [];
  const length = pages?.[pages?.length - 1]?.list?.length || 0;

  return (
    <Template className="ProblemList">
      {isFetched && (
        <Menu
          className="ProblemList-menu"
          name="문항 추가"
          Icon={<Add />}
          onClick={CreateModal.onOpen}
        />
      )}
      {isFetched && length === 0 && (
        <div className="ProblemList-empty">
          <Typography
            className="ProblemList-empty-description"
            type="body"
            size={6}
          >
            아직 문항이 존재하지 않아요
          </Typography>
        </div>
      )}
      {!isFetched && (
        <div className="ProblemList-loading">
          <Spinner className="ProblemList-loading-spinner" />
        </div>
      )}
      {isFetched && length > 0 && (
        <div className="ProblemList-list">
          {pages.map((page, pageIndex) => {
            const lastPageIndex = pages.length - 1;
            const isLastPage = lastPageIndex === pageIndex;
            return page.list.map((problem, index) => {
              return (
                <ProblemCard key={problem.id}>
                  <Typography
                    className="ProblemCard-label"
                    type="body"
                    size={6}
                  >
                    문항 {index + 1}
                  </Typography>
                  <Typography
                    className="ProblemCard-question"
                    type="subHeading"
                    size={2}
                  >
                    {problem.question}
                  </Typography>
                  <div className="ProblemCard-bottom">
                    <div className="ProblemCard-bottom-chips">
                      <Chip
                        className="ProblemCard-bottom-chips-chip"
                        theme="lightPink"
                        name="객관식 문제"
                      />
                      <Chip
                        className="ProblemCard-bottom-chips-chip"
                        theme="lightPink"
                        name={`${problem.optionCount}개 선택지`}
                      />
                    </div>
                    <div className="ProblemCard-bottom-icons">
                      <Edit
                        className="ProblemCard-bottom-icons-icon"
                        onClick={() => UpdateModal.onOpen(problem)}
                      />
                      <TrashCan
                        className="ProblemCard-bottom-icons-icon"
                        onClick={() => DeleteModal.onOpen(problem)}
                      />
                    </div>
                  </div>
                </ProblemCard>
              );
            });
          })}
        </div>
      )}
      {isRefetching && (
        <div className="ProblemList-loading">
          <Spinner className="ProblemList-loading-spinner" />
        </div>
      )}
      <NextModal
        animateType="bottomToTop"
        modalRef={CreateModal.ref}
        isOpen={CreateModal.isOpen}
        status={CreateModal.status}
        onClose={CreateModal.onClose}
      >
        <CreateProblemTemplate
          isOpen={CreateModal.isOpen}
          data={{ id: workbookId }}
          onClose={CreateModal.onClose}
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
        title="문항 삭제"
        description="이 문항을 삭제하시겠어요?"
        cancel={{
          placeholder: "닫기",
          handler: DeleteModal.onClose,
        }}
        success={{
          placeholder: "문항 삭제",
          status: Delete.isLoading ? "loading" : "default",
          handler: onDelete,
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
  workbookId: "",
};

ProblemList.defaultProps = defaultProps;

const Template = styled.div`
  height: calc(100% - 76px - 18px - 36px);
  .ProblemList-menu {
    margin-bottom: 6px;
  }
  .ProblemList-empty {
    height: 120px;
    border: solid 1px;
    border-color: ${Pink[400]};
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    .ProblemList-empty-description {
      color: ${Gray[50]};
    }
  }
  .ProblemList-list {
    height: calc(100% - 48px - 6px);
    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  .ProblemList-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 240px;
    .ProblemList-loading-spinner {
      border: 2px solid ${Pink[400]};
      border-top: 2px solid ${Gray[50]};
    }
  }
`;

const ProblemCard = styled.div`
  padding: 12px;
  margin-bottom: 6px;
  border-radius: 12px;
  background: ${Pink[400]};
  :last-child {
    margin-bottom: 0px;
  }
  .ProblemCard-label {
    color: ${Gray[50]};
  }
  .ProblemCard-question {
    color: ${Gray[50]};
  }
  .ProblemCard-bottom {
    border-top: solid 1px;
    border-color: ${Pink[200]};
    margin-top: 8px;
    padding-top: 8px;
    display: flex;
    justify-content: space-between;
    .ProblemCard-bottom-chips {
      margin-right: 4px;
      display: flex;
      .ProblemCard-bottom-chips-chip {
        margin-right: 4px;
        :last-child {
          margin-right: 0px;
        }
      }
    }
    .ProblemCard-bottom-icons {
      display: flex;
      .ProblemCard-bottom-icons-icon {
        cursor: pointer;
        margin-right: 4px;
        :last-child {
          margin-right: 0px;
        }
        path {
          fill: ${Gray[50]};
        }
      }
    }
  }
`;

export default ProblemList;
