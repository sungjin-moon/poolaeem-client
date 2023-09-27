import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { AppProps } from "next/app";
import Head from "next/head";

import Logo from "../assets/icons/$Logo-pink.svg";

import Gray from "../components/Color/Gray";
import Pink from "../components/Color/Pink";
import Typography from "../components/Typography/Pretendard";

import QueryProvider from "../queries";
import { useEffect, useState } from "react";

function App({ Component, pageProps }: AppProps) {
  const [isActive, setActive] = useState(false);
  const [disable, setDisable] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setActive(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (isActive === true) {
      const timer = setTimeout(() => {
        setDisable(true);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [isActive]);

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
            <Splash
              className="GlobalLayout-pages-page splash"
              css={{
                opacity: isActive ? 0 : 1,
                display: disable ? "none" : "flex",
              }}
            >
              <Logo className="splash-logo" />
              <Typography className="splash-copyright" type="body" size={6}>
                © team 901. All rights reserved.
              </Typography>
            </Splash>
            <div className="GlobalLayout-pages-page view">
              <Component {...pageProps} />
            </div>
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
    position: relative;
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
    .GlobalLayout-pages-page {
      height: inherit;
      transition: 0.3s ease-in-out;
    }
    .splash {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
    }
    .view {
      z-index: 1;
    }
  }
`;

const Splash = styled.div`
  background: ${Pink[500]};
  z-index: 2;
  display: flex;
  flex-direction: column;
  padding: 20px;
  .splash-logo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .splash-copyright {
    margin-top: auto;
    padding: 28px;
    justify-content: center;
    color: ${Pink[200]};
  }
`;

export default App;
