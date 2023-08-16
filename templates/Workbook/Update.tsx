import { useEffect } from "react";
import styled from "@emotion/styled";

import Pink from "../../components/Color/Pink";
import { Header } from "../../components/Modal/View/Next";

import useUpdateWorkbook from "../../process/Workbook/useUpdate";

interface Props {
  className: string;
  isOpen: boolean;
  onClose: () => void;
  onPush: () => void;
}

function UpdateWorkbook({ className, isOpen, onClose, onPush }: Props) {
  const {} = useUpdateWorkbook();

  return (
    <Template className={`UpdateWorkbook ${className}`}>
      <Header
        onClose={onClose}
        title="문제집"
        action={{ name: "풀이", handler: () => {} }}
      />
      <Main></Main>
    </Template>
  );
}

const defaultProps = {
  className: "",
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
`;

export default UpdateWorkbook;
