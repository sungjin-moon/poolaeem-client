import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "universal-cookie";

import useModal from "../../hooks/useModal";

import { API } from "../../queries/settings";
import useAuth from "../../queries/Account/useAuth";
import useCreate from "../../queries/Account/useCreate";

function useSignIn() {
  const Router = useRouter();
  const { push, query } = Router;

  const Auth = useAuth({ key: "signIn" });
  const Create = useCreate({ key: "signUp" });
  const Modal = useModal();

  const onSignIn = async () => {
    if (Auth.isLoading) return;
    Auth.mutate(query, {
      onSuccess: (data) => {
        console.log(data);
        // const cookies = new Cookies();
        // cookies.set("session", {
        //   token: data.token,
        // });

        if (data.code === 0) {
          return push("/");
        }
        if (data.code === 10023) {
          return push({
            pathname: "/sign-in",
            query: {
              confirm: "register",
              ...data.data,
            },
          });
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  const onSignUp = async () => {
    if (Create.isLoading) return;
    Create.mutate(
      {
        oauthProvider: String(query.oauthProvider),
        oauthId: String(query.oauthId),
        email: String(query.email),
      },
      {
        onSuccess: (data) => {
          console.log(data);
          // const cookies = new Cookies();
          // cookies.set("session", {
          //   token: data.token,
          // });
          // if (data.code === 10023) {
          //   return push("/sign-in?confirm=register");
          // }
        },
        onError: (error) => {
          console.log(error);
          return push("/404");
        },
      }
    );
  };

  const onAuthGoogle = () => push(`${API}/api/signin/oauth2/google`);

  useEffect(() => {
    if (Router.query?.confirm === "register") {
      Modal.onOpen();
    }
  }, [Router.query?.confirm]);

  return {
    Router,
    Auth,
    Modal,
    onSignIn,
    onSignUp,
    onAuthGoogle,
  };
}

export default useSignIn;
