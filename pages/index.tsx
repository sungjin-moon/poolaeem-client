import { ReactElement, useEffect } from "react";
import { NextPage } from "next";
import {} from "next/router";

import HomeTemplate from "../templates/Home";

function Home() {
  // const googleAuth = () => {
  //   const url = "https://accounts.google.com/o/oauth2/v2/auth";

  //   const options = {
  //     redirect_uri: "http://localhost:3000/api/auth/google",
  //     client_id:
  //       "267851941117-bbaat882jr32gd70pb256kmj8k9ne1ll.apps.googleusercontent.com",
  //     access_type: "offline",
  //     response_type: "code",
  //     prompt: "consent",
  //     scope: "https://www.googleapis.com/auth/userinfo.email",
  //   };

  //   const qs = new URLSearchParams(options);

  //   const result = `${url}?${qs.toString()}`;

  //   console.log(`${url}?${qs.toString()}`);
  //   // return `${url}?${qs.toString()}`
  //   window.location.href = result;
  // };

  // const onAuthGoogle = () => {
  //   googleAuth();
  // };

  // return (
  //   <div>
  //     {/* <button onClick={onAuthGoogle}>Google Button</button> */}
  //     <button
  //       onClick={() => {
  //         window.location.href =
  //           "https://poolaeem.com/api/signin/oauth2/google";
  //       }}
  //     >
  //       Google Button
  //     </button>
  //   </div>
  // );

  return <HomeTemplate />;
}

export default Home;
