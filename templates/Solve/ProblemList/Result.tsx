import { useEffect } from "react";
import styled from "@emotion/styled";

import Logo from "../../../assets/icons/$Logo-pink.svg";

import Gray from "@/components/Color/Gray";
import Pink from "@/components/Color/Pink";
import Typography from "@/components/Typography/Pretendard";
import Spinner from "@/components/Loader/Spinner";
import SolidButton from "@/components/Button/Solid";
import ProgressBar from "@/components/ProgressBar/Circular";

import { ClientProblemListPayload } from "@/queries/Solve/useList";

import useResult from "@/process/Solve/ProblemList/useResult";

interface Props {
  className: string;
  isOpen: boolean;
  name: string;
  pages: ClientProblemListPayload[];
  onReset: () => void;
  onCopyLink: () => void;
}

function Result({
  className,
  isOpen,
  name,
  pages,
  onReset,
  onCopyLink,
}: Props) {
  const { Router, Marking, onMarking, onInit, onCreateWorkbook } =
    useResult(isOpen);

  useEffect(() => {
    onMarking(name, pages);
  }, []);

  if (isOpen && Marking.isError) {
    return (
      <Template className={`Result ${className}`}>
        <div className="Result-loading">
          <Typography
            className="Result-loading-message"
            type="caption"
            size={3}
          >
            오류가 났네요
          </Typography>
        </div>
        <Typography className="Result-copyright" type="body" size={6}>
          © team 901. All rights reserved.
        </Typography>
      </Template>
    );
  }

  if (isOpen && Marking.isLoading) {
    return (
      <Template className={`Result ${className}`}>
        <div className="Result-loading">
          <Spinner className="Result-loading-spinner" />
          <Typography
            className="Result-loading-message"
            type="caption"
            size={3}
          >
            채점 중이에요
            <br />
            잠시만 기다려주세요
          </Typography>
        </div>
        <Typography className="Result-copyright" type="body" size={6}>
          © team 901. All rights reserved.
        </Typography>
      </Template>
    );
  }

  if (isOpen && Marking.isSuccess) {
    const name = Marking.data.name;
    const solvedCount = Marking.data.solvedCount;
    const correctedCount = Marking.data.correctedCount;
    const accuracyRate = Marking.data.accuracyRate;
    return (
      <Template className={`Result ${className}`}>
        <Header>
          <Logo className="Header-logo" onClick={() => Router.push("/")} />
          <Typography
            className="Header-action"
            type="caption"
            size={3}
            onClick={onCopyLink}
          >
            공유
          </Typography>
        </Header>
        <Main>
          <div className="Main-info">
            <Typography className="Main-info-title" type="subHeading" size={1}>
              풀이결과
            </Typography>
            <ProgressBar
              className="Main-info-progressBar"
              value={accuracyRate}
              maxValue={100}
              timeout={30}
            />
          </div>

          <Table>
            <div className="Table-row">
              <Typography className="Table-row-label" type="body" size={3}>
                내 별명
              </Typography>
              <Typography className="Table-row-value" type="caption" size={3}>
                {name}
              </Typography>
            </div>
            <div className="Table-row">
              <Typography className="Table-row-label" type="body" size={3}>
                풀이한 문항수
              </Typography>
              <Typography className="Table-row-value" type="caption" size={3}>
                {`${solvedCount} 문항`}
              </Typography>
            </div>
            <div className="Table-row">
              <Typography className="Table-row-label" type="body" size={3}>
                맞힌 문항수
              </Typography>
              <Typography className="Table-row-value" type="caption" size={3}>
                {`${correctedCount} 문항`}
              </Typography>
            </div>
            <div className="Table-row">
              <Typography className="Table-row-label" type="body" size={3}>
                정답률
              </Typography>
              <Typography className="Table-row-value" type="caption" size={3}>
                {`${accuracyRate}%`}
              </Typography>
            </div>
          </Table>
          <div className="Main-buttons">
            <SolidButton
              className="Main-buttons-button"
              theme="pink"
              placeholder="다시 풀기"
              size="large"
              onClick={() => onInit(onReset)}
            />
            <SolidButton
              className="Main-buttons-button"
              theme="lightPink"
              placeholder="문제집 만들기"
              size="large"
              onClick={onCreateWorkbook}
            />
          </div>
          <Typography className="Main-copyright" type="body" size={6}>
            © team 901. All rights reserved.
          </Typography>
        </Main>
      </Template>
    );
  }

  return <Template className={`Result ${className}`} />;
}

const defaultProps = {
  className: "",
  isOpen: false,
  onReset: () => {},
  onCopyLink: () => {},
};

Result.defaultProps = defaultProps;

const Template = styled.div`
  position: relative;
  background: ${Pink[500]};
  height: 100%;
  .Result-loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px 20px;
    .Result-loading-message {
      margin-top: 16px;
      color: ${Gray[50]};
      text-align: center;
    }
  }
  .Result-copyright {
    position: absolute;
    bottom: 0px;
    padding: 48px 20px;
    width: 100%;
    justify-content: center;
    text-align: center;
    color: ${Gray[50]};
  }
`;

const Header = styled.header`
  min-height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 8px;
  .Header-logo {
    width: 92px;
    height: 32px;
    cursor: pointer;
  }
  .Header-progressBar {
    width: 36px;
    height: 36px;
  }
  .Header-action {
    color: ${Gray[50]};
    cursor: pointer;
    padding: 0px 12px;
  }
`;

const Main = styled.main`
  padding: 20px 20px 48px 20px;
  display: flex;
  flex-direction: column;
  height: calc(100% - 48px);
  overflow-y: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  .Main-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    .Main-info-title {
      color: ${Gray[50]};
    }
    .Main-info-progressBar {
    }
  }
  .Main-buttons {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 40px;
  }
  .Main-copyright {
    color: ${Gray[50]};
    justify-content: center;
    margin-top: auto;
  }
`;

const Problem = styled.div`
  height: calc(90vh - 48px);
  display: flex;
  flex-direction: column;
  .Problem-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 40px 20px;
    .Problem-info-solvedCount {
      color: ${Pink[100]};
    }
    .Problem-info-question {
      color: ${Gray[50]};
    }
  }
  .Problem-options {
    display: flex;
    flex-direction: column;
    padding: 8px 20px 56px 20px;
    gap: 6px;
    overflow: auto;
    height: calc(90vh - 148px - 48px);
    @media (max-width: 960px) {
      height: calc(100vh - 148px - 48px);
    }
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Table = styled.div`
  margin: 40px 0px;
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
    background: ${Pink[400]};
    border-radius: 12px;
    .Table-row-label,
    .Table-row-value {
      color: ${Gray[50]};
      align-items: center;
      .Table-row-value-userImage {
        width: 26px;
        height: 26px;
        margin-right: 6px;
      }
    }
  }
`;

export default Result;
