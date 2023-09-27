import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { AppProps } from "next/app";
import Head from "next/head";

import Gray from "../components/Color/Gray";
import Pink from "../components/Color/Pink";

import QueryProvider from "../queries";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>풀내임</title>
        <meta name="title" content="풀내임" key="title" />
        <meta
          name="description"
          content="단어문제 내고 풀고, 여기는 퀴즈 플랫폼 풀내임."
          key="description"
        />
        <meta
          name="keywords"
          content="퀴즈, 단어, 플랫폼, 서비스, 앱, 영어, 영어단어, 문제 풀기"
          key="keywords"
        />
        <meta
          name="image"
          content="https://poolaeem.com/poolaeem-thumbnail.jpg"
          key="image"
        />
        <meta name="url" content="https://poolaeem.com" key="url" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://poolaeem.com" />
        <meta property="og:title" content="풀내임" />
        <meta
          property="og:description"
          content="단어문제 내고 풀고, 여기는 퀴즈 플랫폼 풀내임."
        />
        <meta
          property="og:image"
          content="https://poolaeem.com/poolaeem-thumbnail.jpg"
        />
        <meta property="og:site_name" content="풀내임" />
        <meta property="og:locale" content="ko" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <link rel="canonical" href="https://poolaeem.com" />
        <link rel="shortcut icon" type="image/png" href="/poolaeem-logo.png" />
        <link
          rel="apple-touch-icon"
          type="image/png"
          href="/poolaeem-logo.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="/poolaeem-logo.png"
          sizes="16x16"
        />
      </Head>
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

const GlobalLayout = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;
  .GlobalLayout-pages {
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 100dvh;
    background: ${Gray[200]};
    overflow-y: hidden;
    ::-webkit-scrollbar {
      display: none;
    }
    @media (min-width: 960px) {
      width: 430px;
      height: 90dvh;
      border-radius: 20px;
    }
  }
`;

export default App;
