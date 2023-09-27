import { useState, useRef } from "react";
import styled from "@emotion/styled";
import { Autoplay } from "swiper/modules"; //*
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import CheckSign from "../../assets/icons/$CheckSign.svg";
import Problem from "../../assets/icons/$Problem.svg";
import Share from "../../assets/icons/$Share.svg";
import Solve from "../../assets/icons/$Solve.svg";

import Typography from "../../components/Typography/Pretendard";
import SolidButton from "../../components/Button/Solid";
import Pink from "../../components/Color/Pink";
import Chip from "../../components/Chip/Basic";
import ConfirmModal from "../../components/Modal/DialogBox/Confirm";

import SignInBackground from "../../assets/icons/SignInBackground.svg";
import Google from "../../assets/icons/$Google.svg";

import useSignIn from "../../process/Account/useSignIn";

interface Props {}

function SignIn({}: Props) {
  const { Modal, Create, onAuthGoogle, onSignUp } = useSignIn();
  const ref = useRef(null);
  const [viewIndex, setViewIndex] = useState(0);

  return (
    <Template className="SignIn">
      <SignInBackground className="SignIn-background" />
      <div className="SignIn-container">
        <Info>
          <Swiper
            ref={ref}
            initialSlide={viewIndex}
            className="Info-swiper"
            slidesPerView={1}
            loop={false}
            speed={500}
            modules={[Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            onActiveIndexChange={(swiper) => {
              setViewIndex(swiper.activeIndex);
            }}
            allowTouchMove={false}
          >
            <SwiperSlide className="Info-swiper-slide">
              <Problem className="Info-swiper-slide-card" />
            </SwiperSlide>
            <SwiperSlide className="Info-swiper-slide">
              <Share className="Info-swiper-slide-card" />
            </SwiperSlide>
            <SwiperSlide className="Info-swiper-slide">
              <Solve className="Info-swiper-slide-card" />
            </SwiperSlide>
          </Swiper>
          <div className="Info-tabs">
            <Chip
              className="Info-tabs-tab"
              name="출제"
              theme={viewIndex === 0 ? "pink" : "lightPink"}
            />
            <Chip
              className="Info-tabs-tab"
              name="공유"
              theme={viewIndex === 1 ? "pink" : "lightPink"}
            />
            <Chip
              className="Info-tabs-tab"
              name="풀이"
              theme={viewIndex === 2 ? "pink" : "lightPink"}
            />
          </div>
          {viewIndex === 0 && (
            <Typography className="Info-description" type="body" size={3}>
              모두 함께 풀 수 있는
              <br />
              문제집을 편리하게 만들어보세요
            </Typography>
          )}
          {viewIndex === 1 && (
            <Typography className="Info-description" type="body" size={3}>
              내가 만든 문제집을
              <br />
              모두에게 공유해보세요
            </Typography>
          )}
          {viewIndex === 2 && (
            <Typography className="Info-description" type="body" size={3}>
              자유롭게 문제를 풀고
              <br />
              함께 지식을 채워봐요
            </Typography>
          )}
        </Info>
        <div className="SignIn-container-buttons">
          <SolidButton
            className="SignIn-container-buttons-button"
            theme="white"
            size="large"
            placeholder="Google 계정 로그인"
            Icon={<Google />}
            onClick={onAuthGoogle}
          />
        </div>

        <Typography className="SignIn-container-copyright" type="body" size={6}>
          © team 901. All rights reserved.
        </Typography>
      </div>
      <ConfirmModal
        Icon={<CheckSign />}
        title="약관 동의"
        description="만 14세 이상이며 개인정보 수집(이메일 주소, 이름)에 동의하시나요?"
        cancel={{
          placeholder: "동의하지 않음",
          handler: Modal.onClose,
        }}
        success={{
          placeholder: "동의함",
          status: Create.isLoading ? "loading" : "default",
          handler: onSignUp,
        }}
        modalRef={Modal.ref}
        isOpen={Modal.isOpen}
        status={Modal.status}
        onClose={Modal.onClose}
      />
    </Template>
  );
}

const Template = styled.div`
  position: relative;
  background: ${Pink[100]};
  height: 100%;
  .SignIn-background {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .SignIn-container {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    height: 100dvh;
    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none;
    }
    @media (min-width: 960px) {
      height: 100%;
    }
    .SignIn-container-buttons {
      margin: 20px 0px;
      .SignIn-container-buttons-button {
        width: 100%;
      }
    }

    .SignIn-container-copyright {
      margin-top: auto;
      justify-content: center;
      color: ${Pink[400]};
      padding: 28px 0px;
    }
  }
`;

const Info = styled.div`
  padding: 60px 0px;
  .Info-swiper {
    .Info-swiper-slide {
      width: 100%;
      height: 335px;
      .Info-swiper-slide-card {
        width: 100%;
        height: 100%;
      }
    }
  }
  .Info-tabs {
    display: flex;
    justify-content: center;
    gap: 6px;
    margin: 16px 0px;
    .Info-tabs-tab {
    }
  }
  .Info-description {
    justify-content: center;
    text-align: center;
    color: ${Pink[500]};
  }
`;

export default SignIn;
