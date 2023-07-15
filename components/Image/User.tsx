import styled from "@emotion/styled";

import Gray from "../Color/Gray";
import UserIcon from "../../assets/icons/User.svg";

interface Props {
  className: string;
  onClick: () => void;
}

function User({ className, onClick }: Props) {
  return (
    <Image className={`Image_User ${className}`} onClick={onClick}>
      <UserIcon className="Image_User-icon" />
    </Image>
  );
}

const defaultProps = {
  className: "",
  onClick: () => {},
};

User.defaultProps = defaultProps;

export const Image = styled.div`
  width: 48px;
  height: 48px;
  .Image_User-icon {
    width: 100%;
    height: 100%;
  }
`;

export default User;
