import messages from "../assets/messages";

interface Item {
  required: boolean;
  status: string;
  value: string;
  placeholder: string;
  message: string;
}

// const validators = {
//   email: () => {},
// };

function useValidation() {
  const requiredCheck = (item: Item) => {
    const value = item.value;
    const required = item.required;
    if (!value && required) {
      return {
        message: messages["notEntered"](),
        status: "invalid",
      };
    }

    return {
      message: "",
      status: "success",
    };
  };

  const onCheck = (item: Item) => {
    let nextItem = requiredCheck(item);

    return { ...item, ...nextItem };
  };

  const onAsyncCheck = (item: Item) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(onCheck(item));
      }, 1000);
    });
  };

  return {
    onCheck,
    onAsyncCheck,
  };
}

export default useValidation;
