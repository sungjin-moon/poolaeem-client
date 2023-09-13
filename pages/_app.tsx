import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { AppProps } from "next/app";

import Gray from "../components/Color/Gray";
import Pink from "../components/Color/Pink";

import QueryProvider from "../queries";
import { useEffect } from "react";

function App({ Component, pageProps }: AppProps) {
  let vh = 0;

  useEffect(() => {
    // vh = window.innerHeight * 0.01;
    // document.documentElement.style.setProperty("--vh", `${vh}px`);
    const setVh = () => {
      vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    window.addEventListener("resize", setVh);
    setVh();

    return () => window.removeEventListener("resize", setVh);
  }, []);

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
  :root {
    --vh: 100%;
  }

  html,
  body {
    background: ${Pink[50]};
    height: 100vh;
    height: var(--vh);
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
  /* height: -webkit-fill-available;
  height: fill-available; */
  /* height: 100vh; */
  height: calc(var(--vh, 1vh) * 100);
  @media (min-width: 960px) {
    height: 100vh;
  }
  .GlobalLayout-pages {
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 100vh;
    background: ${Gray[200]};
    overflow-y: hidden;
    ::-webkit-scrollbar {
      display: none;
    }
    @media (min-width: 960px) {
      width: 430px;
      height: 90vh;
      border-radius: 20px;
    }
  }
`;

export default App;
