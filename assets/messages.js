const messages = {
  notEntered: () => "이 입력란은 필수항목입니다.",
  format: () => "입력란의 형식을 확인해주세요.",
  minLength: (length = 2) => `최소 ${length}자 이상 입력해주세요.`,
  maxLength: (length = 200) => `최대 ${length}자까지 입력해주세요.`,
};

export default messages;
