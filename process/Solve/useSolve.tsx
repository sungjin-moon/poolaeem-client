import { useRouter } from "next/router";

import { useInfo } from "../../queries/Solve/useRead";
import { useProfile } from "../../queries/Account/useRead";

import useModal from "../../hooks/useModal";
import useField from "../../hooks/useField";
import useToast from "../../hooks/useToast";

function useSolve() {
  const Router = useRouter();
  const EnterNameModal = useModal();
  const ProblemListModal = useModal();
  const Field = useField({
    key: "Name",
    required: true,
    status: "default",
    value: "",
    placeholder: "풀이를 시작하기 전에 별명을 입력해주세요",
    message: "",
    maxLength: 30,
  });
  const Toast = useToast();
  const Profile = useProfile(
    {},
    {
      retry: false,
    }
  );

  const workbookId = Router.query?.workbookId || "";

  const Info = useInfo(
    { id: workbookId },
    { enabled: workbookId ? true : false }
  );
  const onCopyLink = () => {
    const copyLink = window.location.href;
    navigator.clipboard.writeText(copyLink).then(
      (success) => {
        return Toast.onPush({
          status: "success",
          message: "공유주소가 클립보드에 복사되었어요",
        });
      },
      (error) => {}
    );
  };
  return {
    Router,
    EnterNameModal: {
      ...EnterNameModal,
      field: Field.item,
      Field,
    },
    ProblemListModal,
    Toast,
    Info,
    Profile,
    onCopyLink,
  };
}

export default useSolve;
