import { useRouter } from "next/router";
import { useEffect } from "react";

import useModal from "../../hooks/useModal";
import useStories from "../../hooks/useStories";
import useToast from "../../hooks/useToast";

import { queryClient } from "../../queries";
import useRead from "../../queries/Account/useRead";

import SettingsTemplate from "../../templates/Account/Settings";

function useAccount() {
  const stories = [
    {
      title: "내 정보",
      view: <SettingsTemplate />,
    },
    {
      title: "별명 변경",
      view: null,
    },
  ];

  const Router = useRouter();
  const Read = useRead();

  const Stories = useStories(stories);
  const Toast = useToast();

  const onSignOut = () => {};

  return {
    Router,
    Read,
    Stories,
    Toast,
  };
}

export default useAccount;
