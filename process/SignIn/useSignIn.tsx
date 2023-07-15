import { useRouter } from "next/router";
import Cookies from "universal-cookie";

import useModal from "../../hooks/useModal";

import { API } from "../../queries/settings";
import useAuth from "../../queries/Account/useAuth";

function useSignIn() {
  const Router = useRouter();
  const { push, query } = Router;

  const Auth = useAuth({ key: "signIn" });
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
        if (data.code === 10023) {
          return push("/sign-in?confirm=agrmn");
        }
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };
  const onAuthGoogle = () => push(`${API}/api/signin/oauth2/google`);

  return {
    Router,
    Auth,
    Modal,
    onSignIn,
    onAuthGoogle,
  };
}

export default useSignIn;
