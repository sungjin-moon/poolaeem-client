import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { AppProps } from "next/app";

import Gray from "../components/Color/Gray";
import Pink from "../components/Color/Pink";

import QueryProvider from "../queries";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyle} />
      <QueryProvider>
        <GlobalLayout>
          <div className="GlobalLayout-pages">
            <Component {...pageProps} />
          </div>
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
    background: ${Pink[50]};
  }

  @font-face {
    font-family: "Pretendard";
    src: url("/fonts/Pretendard.woff2") format("woff2");
  }
`;

// const GlobalLayout = styled.div`
//   position: relative;
//   max-width: 600px;
//   min-height: calc(100vh);
//   margin: 0 auto;
//   background: ${Gray[50]};
//   overflow-y: auto;
// `;

const GlobalLayout = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  .GlobalLayout-pages {
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 100vh;
    background: ${Gray[200]};
    overflow-y: hidden;
    @media (min-width: 960px) {
      width: 430px;
      height: 90vh;
      border-radius: 20px;
    }
  }
`;

export default App;
