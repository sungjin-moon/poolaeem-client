import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import WarningSign from "../../assets/icons/$WarningSign.svg";

import Gray from "../../components/Color/Gray";
import Pink from "../../components/Color/Pink";
import Typography from "../../components/Typography/Pretendard";
import Spinner from "../../components/Loader/Spinner";
import ConfirmModal from "../../components/Modal/DialogBox/Confirm";
import ToastBox from "../../components/Toast";
import Selector from "../../components/Selector/Basic";

import useProblemList from "../../process/Solve/useProblemList";
import { useState } from "react";

interface Props {
  className: string;
  isOpen: boolean;
  name: string;
  onClose: () => void;
}

function ProblemList({ className, isOpen, name, onClose }: Props) {
  const [isEnd, setEnd] = useState(false);
  const {
    InfiniteScroll,
    Toast,
    CloseModal,
    Slide,
    List,
    Marking,
    onNext,
    onSelect,
    onMarking,
  } = useProblemList(isOpen);

  if (Marking.isError || List.isError) {
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

  if (Marking.isLoading) {
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

  if (Marking.isSuccess) {
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
          <Typography
            className="Header-action"
            type="caption"
            size={3}
            // onClick={onMarking}
          >
            공유
          </Typography>
        </Header>
        <Main>asd</Main>
        <Typography className="ProblemList-copyright" type="body" size={6}>
          © team 901. All rights reserved.
        </Typography>
      </Template>
    );
  }

  const { isLoading, isFetched, hasNextPage } = List;

  if (isLoading) {
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

  if (isOpen && isFetched) {
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
          simulateTouch={true}
          onSlideChange={(swiper) => {
            // console.log("slide change", swiper);
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
                          hasNextPage === true &&
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
                        문항 {problem.number}/10
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
  return null;
}

const defaultProps = {
  className: "",
  isOpen: false,
  onClose: () => {},
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
  .Header-action {
    color: ${Gray[50]};
    cursor: pointer;
    padding: 0px 12px;
  }
`;

const Main = styled.main`
  .Main-swiper {
    .Main-swiper-slide {
    }
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

export default ProblemList;
