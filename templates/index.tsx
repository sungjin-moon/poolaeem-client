import { ReactElement } from "react";
import styled from "@emotion/styled";

import Gray from "../components/Color/Gray";

interface Props {
  children: ReactElement;
}

function Layout({ children }: Props) {
  return <Template>{children}</Template>;
}

const Template = styled.div`
  position: relative;
  max-width: 600px;
  min-height: calc(100vh);
  margin: 0 auto;
  background: ${Gray[50]};
  overflow-y: hidden;
`;

export default Layout;
