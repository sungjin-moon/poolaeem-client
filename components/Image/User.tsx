import styled from "@emotion/styled";

import Gray from "../Color/Gray";
import UserIcon from "../../assets/icons/User.svg";

interface Props {
  className: string;
  src: string;
  onClick: () => void;
}

function User({ className, src, onClick }: Props) {
  return (
    <Image className={`Image_User ${className}`} onClick={onClick}>
      {src && <img src={src} />}
      {!src && <UserIcon className="Image_User-icon" />}
    </Image>
  );
}

const defaultProps = {
  className: "",
  src: "",
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
  img {
    width: 100%;
    height: 100%;
    border-radius: 32px;
    object-fit: cover;
  }
`;

export default User;
