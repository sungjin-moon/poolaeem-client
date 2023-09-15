import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Logo from "../../assets/icons/$Logo-pink.svg";
import WarningSign from "../../assets/icons/$WarningSign.svg";

import Gray from "../../components/Color/Gray";
import Pink from "../../components/Color/Pink";
import Typography from "../../components/Typography/Pretendard";
import Spinner from "../../components/Loader/Spinner";
import ConfirmModal from "../../components/Modal/DialogBox/Confirm";
import ToastBox from "../../components/Toast";
import Selector from "../../components/Selector/Basic";
import SolidButton from "../../components/Button/Solid";
import ProgressBar, { useCount } from "../../components/ProgressBar/Circular";

import useProblemList from "../../process/Solve/useProblemList";

interface Props {
  className: string;
  isOpen: boolean;
  name: string;
  problemCount: number;
  onClose: () => void;
  onCopyLink: () => void;
}

function ProblemList({
  className,
  isOpen,
  name,
  problemCount,
  onClose,
  onCopyLink,
}: Props) {
  const {
    isEnd,
    setEnd,
    InfiniteScroll,
    Router,
    Toast,
    CloseModal,
    Slide,
    List,
    Marking,
    onNext,
    onSelect,
    onMarking,
    onInit,
    onCreateWorkbook,
  } = useProblemList(isOpen);
  const { count, setCount } = useCount();

  if ((isOpen && Marking.isError) || List.isError) {
    return (
      <Template className={`ProblemList ${className}`}>
        <div className="ProblemList-loading">
          <Typography
            className="ProblemList-loading-message"
            type="caption"
            size={3}
          >
            오류가 났네요
          </Typography>
        </div>
        <Typography className="ProblemList-copyright" type="body" size={6}>
          © team 901. All rights reserved.
        </Typography>
      </Template>
    );
  }

  if (isOpen && Marking.isLoading) {
    return (
      <Template className={`ProblemList ${className}`}>
        <div className="ProblemList-loading">
          <Spinner className="ProblemList-loading-spinner" />
          <Typography
            className="ProblemList-loading-message"
            type="caption"
            size={3}
          >
            채점 중이에요
            <br />
            잠시만 기다려주세요
          </Typography>
        </div>
        <Typography className="ProblemList-copyright" type="body" size={6}>
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
      <Template className={`ProblemList ${className}`}>
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
              onClick={onInit}
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

  if (isOpen && List.isLoading) {
    return (
      <Template className={`ProblemList ${className}`}>
        <div className="ProblemList-loading">
          <Spinner className="ProblemList-loading-spinner" />
          <Typography
            className="ProblemList-loading-message"
            type="caption"
            size={3}
          >
            풀이 준비 중이에요
            <br />
            잠시만 기다려주세요
          </Typography>
        </div>
        <Typography className="ProblemList-copyright" type="body" size={6}>
          © team 901. All rights reserved.
        </Typography>
      </Template>
    );
  }

  const pages = List.data?.pages || [];
  // const length = pages?.[pages?.length - 1]?.list?.length || 0;

  if (isOpen && List.isFetched) {
    return (
      <Template className={`ProblemList ${className}`}>
        <Header>
          <Typography
            className="Header-action"
            type="caption"
            size={3}
            onClick={CloseModal.onOpen}
          >
            풀이 종료
          </Typography>
          <ProgressBar
            className="Header-progressBar"
            value={30}
            maxValue={30}
            timeout={1000}
            count={count}
            setCount={setCount}
            onChange={(count) => {
              if (count === 30) {
                onNext();
                return true;
              }
              return false;
            }}
          />
          {isEnd ? (
            <Typography
              className="Header-action"
              type="caption"
              size={3}
              onClick={() => onMarking(name)}
            >
              완료
            </Typography>
          ) : (
            <Typography
              className="Header-action"
              type="caption"
              size={3}
              onClick={onNext}
            >
              다음 문항
            </Typography>
          )}
        </Header>
        <Swiper
          ref={Slide.ref}
          className="ProblemList-swiper"
          slidesPerView={1}
          loop={false}
          speed={500}
          allowSlidePrev={false}
          simulateTouch={true}
          onSlideChange={(swiper) => {
            // console.log("slide change", swiper);
            setCount(0);
            if (swiper.isEnd) {
              setEnd(swiper.isEnd);
            }
          }}
          // onSwiper={(swiper) => {
          //   console.log(swiper);
          // }}
        >
          {pages.map((page, pageIndex) => {
            const lastPageIndex = pages.length - 1;
            const isLastPage = lastPageIndex === pageIndex;
            return page.list.map((problem, problemIndex) => {
              return (
                <SwiperSlide key={problem.id}>
                  <Problem>
                    <ScrollView
                      ref={InfiniteScroll.ref}
                      css={css({
                        display:
                          List.hasNextPage === true &&
                          isLastPage &&
                          page.list.length - 1 === problemIndex
                            ? "block"
                            : "none",
                      })}
                    />
                    <div className="Problem-info">
                      <Typography
                        className="Problem-info-solvedCount"
                        type="body"
                        size={4}
                      >
                        문항 {problem.number}/{problemCount}
                      </Typography>
                      <Typography
                        className="Problem-info-question"
                        type="heading"
                        size={3}
                      >
                        {problem.question}
                      </Typography>
                    </div>
                    <div className="Problem-options">
                      {problem.options.map((option, optionIndex) => {
                        return (
                          <Selector
                            key={option.id}
                            name={option.name}
                            value={option.isSelected}
                            onChange={(isSelected) =>
                              onSelect({
                                isSelected,
                                pageIndex,
                                problemIndex,
                                optionIndex,
                              })
                            }
                          />
                        );
                      })}
                    </div>
                  </Problem>
                </SwiperSlide>
              );
            });
          })}
        </Swiper>
        <ConfirmModal
          Icon={<WarningSign />}
          title="풀이 종료"
          description="풀이를 종료하시겠어요? 지금까지 풀이한 내역은 저장되지 않아요"
          cancel={{
            placeholder: "닫기",
            handler: CloseModal.onClose,
          }}
          success={{
            placeholder: "풀이 종료",
            handler: () => {
              setEnd(false);
              onClose();
              CloseModal.onClose();
            },
          }}
          modalRef={CloseModal.ref}
          isOpen={CloseModal.isOpen}
          status={CloseModal.status}
          onClose={CloseModal.onClose}
        />
        <ToastBox list={Toast.list} />
      </Template>
    );
  }

  return <Template className={`ProblemList ${className}`} />;
}

const defaultProps = {
  className: "",
  isOpen: false,
  onClose: () => {},
  onCopyLink: () => {},
};

ProblemList.defaultProps = defaultProps;

const Template = styled.div`
  position: relative;
  background: ${Pink[500]};
  height: 100%;
  .ProblemList-loading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px 20px;
    .ProblemList-loading-message {
      margin-top: 16px;
      color: ${Gray[50]};
      text-align: center;
    }
  }
  .ProblemList-copyright {
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

const ScrollView = styled.div`
  height: 1px;
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

export default ProblemList;
