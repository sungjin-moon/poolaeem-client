import { Global, css } from "@emotion/react";
import { AppProps } from "next/app";

import Gray from "../components/Color/Gray";
import Layout from "../templates";

import QueryProvider from "../queries";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={globalStyle} />
      <QueryProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
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

export default App;
