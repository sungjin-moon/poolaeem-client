import styled from "@emotion/styled";
import { css } from "@emotion/react";

import EmptyPresent from "../../assets/icons/$EmptyPresent.svg";
import Edit from "../../assets/icons/Edit.svg";

import Typography from "../../components/Typography/Pretendard";
import SolidButton from "../../components/Button/Solid";
import NextModal from "../../components/Modal/View/Next";
import Spinner from "../../components/Loader/Spinner";
import WorkbookCard from "../../components/Card/Workbook";
import FloatButton from "../../components/Button/Float";
import ToastBox from "../../components/Toast";

import Layout from "./";

import CreateWorkbookTemplate from "./Create";
import UpdateWorkbookTemplate from "./Edit";

import useWorkbookList from "../../process/Workbook/useList";

interface Props {}

function List() {
  const { CreateModal, UpdateModal, List, InfiniteScroll, Toast } =
    useWorkbookList();

  const { isFetched, isRefetching, hasNextPage } = List;
  const pages = List.data?.pages || [];
  const length = pages?.[pages?.length - 1]?.list?.length || 0;

  return (
    <Layout>
      <Template>
        {!isFetched && (
          <div className="WorkbookListTemplate-loading">
            <Spinner className="WorkbookListTemplate-loading-spinner" />
          </div>
        )}
        {isFetched && length > 0 && (
          <div className="WorkbookListTemplate-list">
            {pages.map((page, pageIndex) => {
              const lastPageIndex = pages.length - 1;
              const isLastPage = lastPageIndex === pageIndex;
              return page.list.map((workbook, workbookIndex) => {
                return (
                  <WorkbookCard
                    key={workbook.id}
                    onClick={() => UpdateModal.onOpen(workbook)}
                    name={workbook.name}
                    createdAt={workbook.createdAt}
                    problemCount={workbook.problemCount}
                    solvedCount={workbook.solvedCount}
                    ScrollView={
                      <ScrollView
                        ref={InfiniteScroll.ref}
                        css={css({
                          display:
                            hasNextPage === true &&
                            isLastPage &&
                            page.list.length - 1 === workbookIndex
                              ? "block"
                              : "none",
                        })}
                      />
                    }
                  />
                );
              });
            })}
            <FloatButton
              className="WorkbookListTemplate-list-button"
              onClick={CreateModal.onOpen}
            />
          </div>
        )}
        {isFetched && length === 0 && (
          <EmptyBox>
            <div className="EmptyBox-wrapper">
              <EmptyPresent className="EmptyBox-wrapper-icon" />
              <Typography
                className="EmptyBox-wrapper-title"
                type="subHeading"
                size={1}
              >
                아직 문제집이 없어요
              </Typography>
              <Typography
                className="EmptyBox-wrapper-description"
                type="body"
                size={3}
              >
                지금 바로 새로운 문제집을 만들어보세요
              </Typography>
              <SolidButton
                className="EmptyBox-wrapper-button"
                Icon={<Edit />}
                placeholder="문제집 만들기"
                iconType="icon"
                onClick={CreateModal.onOpen}
              />
            </div>
          </EmptyBox>
        )}

        {isRefetching && (
          <div className="WorkbookListTemplate-loading">
            <Spinner className="WorkbookListTemplate-loading-spinner" />
          </div>
        )}
        <NextModal
          animateType="bottomToTop"
          modalRef={CreateModal.ref}
          isOpen={CreateModal.isOpen}
          status={CreateModal.status}
          onClose={CreateModal.onClose}
        >
          <CreateWorkbookTemplate
            isOpen={CreateModal.isOpen}
            onClose={CreateModal.onClose}
            onPush={() => {
              Toast.onPush({
                status: "success",
                message: "문제집이 만들어졌어요",
              });
            }}
          />
        </NextModal>
        <NextModal
          animateType="rightToLeft"
          modalRef={UpdateModal.ref}
          isOpen={UpdateModal.isOpen}
          status={UpdateModal.status}
          onClose={UpdateModal.onClose}
        >
          <UpdateWorkbookTemplate
            workbookId={UpdateModal.data?.id}
            createdAt={UpdateModal.data?.createdAt}
            isOpen={UpdateModal.isOpen}
            onClose={UpdateModal.onClose}
            onPush={() =>
              Toast.onPush({
                status: "noti",
                message: "문제집이 삭제되었어요",
              })
            }
          />
        </NextModal>
        <ToastBox list={Toast.list} />
      </Template>
    </Layout>
  );
}

const Template = styled.div`
  height: calc(100% - 48px);
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  .WorkbookListTemplate-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px 0px;
  }
  .WorkbookListTemplate-list {
    padding: 12px 8px;
    .WorkbookListTemplate-list-button {
      position: absolute;
      bottom: 0px;
      right: 0px;
      margin: 20px;
    }
  }
`;

const EmptyBox = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .EmptyBox-wrapper {
    padding: 0px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .EmptyBox-wrapper-title {
      margin: 4px 0px;
    }
    .EmptyBox-wrapper-button {
      margin-top: 24px;
    }
  }
`;

const ScrollView = styled.div`
  height: 1px;
`;

export default List;
