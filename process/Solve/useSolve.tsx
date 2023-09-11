import { useRouter } from "next/router";
import useRead from "../../queries/Solve/useRead";

import useModal from "../../hooks/useModal";
import useField from "../../hooks/useField";
import useToast from "../../hooks/useToast";

function useSolve() {
  const Router = useRouter();
  const Modal = useModal();
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

  const workbookId = Router.query?.workbookId || "";

  const Read = useRead(
    { id: workbookId },
    { enabled: workbookId ? true : false }
  );
  console.log(Router);
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
  console.log(Read.data);
  return {
    Router,
    Modal: {
      ...Modal,
      field: Field.item,
    },
    Toast,
    Read,
    onCopyLink,
  };
}

export default useSolve;
