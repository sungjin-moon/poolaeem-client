import styled from "@emotion/styled";

import EmptyPresent from "../../assets/icons/$EmptyPresent.svg";
import Edit from "../../assets/icons/Edit.svg";

import Typography from "../../components/Typography/Pretendard";
import SolidButton from "../../components/Button/Solid";
import NextModal from "../../components/Modal/View/Next";

import Layout from "../../templates";

import CreateWorkbookTemplate from "../../templates/Workbook/Create";

import useModal from "../../hooks/useModal";

interface Props {}

function Home() {
  const Modal = useModal();
  return (
    <Layout>
      <Template>
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
              onClick={Modal.onOpen}
            />
          </div>
        </EmptyBox>
        <NextModal
          animateType="bottomToTop"
          modalRef={Modal.ref}
          isOpen={Modal.isOpen}
          status={Modal.status}
          onClose={Modal.onClose}
        >
          <CreateWorkbookTemplate
            isOpen={Modal.isOpen}
            onClose={Modal.onClose}
          />
        </NextModal>
      </Template>
    </Layout>
  );
}

const Template = styled.div`
  height: calc(100% - 48px);
  overflow-y: auto;
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

export default Home;
