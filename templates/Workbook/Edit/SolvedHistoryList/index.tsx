import styled from "@emotion/styled";
import { css } from "@emotion/react";

import Pink from "../../../../components/Color/Pink";
import Gray from "../../../../components/Color/Gray";
import Typography from "../../../../components/Typography/Pretendard";
import Spinner from "../../../../components/Loader/Spinner";

import useSolvedHistoryList from "../../../../process/Workbook/Edit/SolvedHistoryList";

interface Props {
  workbookId: string;
}

function SolvedHistoryList({ workbookId }: Props) {
  const { InfiniteScroll, List } = useSolvedHistoryList(workbookId);
  const { isFetched, isRefetching, hasNextPage } = List;

  const pages = List.data?.pages || [];
  const length = pages?.[pages?.length - 1]?.list?.length || 0;

  return (
    <Template className="SolvedHistoryList">
      {isFetched && length === 0 && (
        <div className="SolvedHistoryList-empty">
          <Typography
            className="SolvedHistoryList-empty-description"
            type="body"
            size={6}
          >
            아직 풀이내역이 존재하지 않아요
          </Typography>
        </div>
      )}

      {!isFetched && (
        <div className="SolvedHistoryList-loading">
          <Spinner className="SolvedHistoryList-loading-spinner" />
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
            return page.list.map((solvedHistory, solvedHistoryIndex) => {
              return (
                <div className="Table-row" key={solvedHistory.id}>
                  <ScrollView
                    ref={InfiniteScroll.ref}
                    css={css({
                      display:
                        hasNextPage === true &&
                        isLastPage &&
                        page.list.length - 1 === solvedHistoryIndex
                          ? "block"
                          : "none",
                    })}
                  />
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
        <div className="SolvedHistoryList-loading">
          <Spinner className="SolvedHistoryList-loading-spinner" />
        </div>
      )}
    </Template>
  );
}

const defaultProps = {
  workbookId: "",
};

SolvedHistoryList.defaultProps = defaultProps;

const Template = styled.div`
  .SolvedHistoryList-empty {
    height: 120px;
    border: solid 1px;
    border-color: ${Pink[400]};
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    .SolvedHistoryList-empty-description {
      color: ${Gray[50]};
    }
  }
  .SolvedHistoryList-loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 240px;
    .SolvedHistoryList-loading-spinner {
      border: 2px solid ${Pink[400]};
      border-top: 2px solid ${Gray[50]};
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
      border-color: ${Pink[200]};
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

export default SolvedHistoryList;
