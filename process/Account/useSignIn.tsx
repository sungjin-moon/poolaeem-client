import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "universal-cookie";

import useModal from "../../hooks/useModal";

import { queryClient } from "../../queries";
import { API } from "../../queries/settings";
import useAuth from "../../queries/Account/useAuth";
import useCreate from "../../queries/Account/useCreate";

function useSignIn() {
  const Router = useRouter();
  const { push, query, replace } = Router;

  const Auth = useAuth({ key: "signIn" });
  const Create = useCreate({ key: "signUp" });
  const Modal = useModal();

  const onSignIn = async () => {
    if (Auth.isLoading) return;
    Auth.mutate(query, {
      onSuccess: (data) => {
        if (data?.code === 0) {
          console.log(data);
          const cookies = new Cookies();
          cookies.set(
            "session",
            {
              accessToken: data?.accessToken,
              refreshToken: data?.refreshToken,
            },
            {
              path: "/",
            }
          );
          return push("/");
        }
        if (data?.code === 10023) {
          return push({
            pathname: "/sign-in",
            query: {
              confirm: "register",
              ...data?.query,
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
          if (data) {
            const cookies = new Cookies();
            cookies.set("session", {
              accessToken: data?.accessToken,
              refreshToken: data?.refreshToken,
            });
            return push("/");
          }
        },
        onError: (error) => {
          console.log(error);
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
    Create,
    Modal,
    onSignIn,
    onSignUp,
    onAuthGoogle,
  };
}

export default useSignIn;
