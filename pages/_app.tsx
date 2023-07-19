import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { AppProps } from "next/app";

import Gray from "../components/Color/Gray";

import QueryProvider from "../queries";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyle} />
      <QueryProvider>
        <GlobalLayout>
          <Component {...pageProps} />
        </GlobalLayout>
      </QueryProvider>
    </>
  );
}

const globalStyle = css`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: Pretendard, sans-serif, Roboto;
  }

  html,
  body {
    max-width: 100vw;
    overflow-x: hidden;
    background: ${Gray[200]};
  }

  @font-face {
    font-family: "Pretendard";
    src: url("/fonts/Pretendard.woff2") format("woff2");
  }
`;

const GlobalLayout = styled.div`
  position: relative;
  max-width: 600px;
  min-height: calc(100vh);
  margin: 0 auto;
  background: ${Gray[50]};
  overflow-y: hidden;
`;

export default App;
