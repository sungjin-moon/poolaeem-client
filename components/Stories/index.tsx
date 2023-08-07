import styled from "@emotion/styled";
import { ReactElement, RefObject, cloneElement } from "react";
import { css } from "@emotion/react";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";
import "swiper/css";

import LeftArrow from "../../assets/icons/LeftArrow.svg";

import Gray from "../../components/Color/Gray";
import Typography from "../../components/Typography/Pretendard";

type Story = {
  title: string;
  view: ReactElement;
};

interface Props {
  className: string;
  swiperRef: RefObject<SwiperRef>;
  children: ReactElement;
  currentStory: Story;
  stories: Array<Story>;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSlidePrev: () => void;
  onSlideNext: () => void;
}

interface LayoutProps {
  className?: string;
  children: ReactElement;
  title: string;
  action?: {
    name: string;
    handler: () => void;
  };
  onSlidePrev: () => void;
}

export const Layout = ({
  className = "",
  children = <div></div>,
  title = "Title",
  action,
  onSlidePrev = () => {},
}: LayoutProps) => {
  return (
    <Wrapper className={`Strories-slide-story ${className}`}>
      <Header>
        <LeftArrow onClick={onSlidePrev} />
        <Typography className="Header-title" type="caption" size={1}>
          {title}
        </Typography>
        {action && (
          <Typography
            className="Header-name"
            type="caption"
            size={1}
            onClick={action.handler}
          >
            {action.name}
          </Typography>
        )}
      </Header>
      <div className="Wrapper-main">{children}</div>
    </Wrapper>
  );
};

function Strories({
  className,
  swiperRef,
  currentStory,
  stories,
  isOpen,
  onOpen,
  onClose,
  onSlidePrev,
  onSlideNext,
}: Props) {
  return (
    <View
      className={`Strories ${className}`}
      css={css({
        transform: isOpen === true ? "translateX(0px)" : "translateX(100%)",
      })}
    >
      <Swiper
        ref={swiperRef}
        className="Strories-slide"
        slidesPerView={1}
        loop={false}
        speed={500}
        simulateTouch={false}
        onSwiper={(swiper) => {
          console.log(swiper);
        }}
      >
        {stories.map((story, index) => {
          const View = story.view;
          return (
            <SwiperSlide key={index} className="Strories-slide-story">
              {View && cloneElement(View, { onSlidePrev, onSlideNext })}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </View>
  );
}

const defaultProps = {
  className: "",
  swiperRef: null,
  currentStory: null,
  stories: [],
  isOpen: false,
  onOpen: () => {},
  onClose: () => {},
  onSlidePrev: () => {},
  onSlideNext: () => {},
};

Strories.defaultProps = defaultProps;

const View = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background: ${Gray[50]};
  transition: 0.3s ease-in-out;
  .Strories-slide {
    height: 100%;
  }
`;

const Header = styled.header`
  height: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 8px;
  .Header-name {
    width: 48px;
    display: flex;
    justify-content: center;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  .Wrapper-main {
    padding: 20px;
    height: 100%;
  }
`;

export default Strories;
