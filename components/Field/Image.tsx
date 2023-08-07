import styled from "@emotion/styled";

import Gray from "../Color/Gray";
import Pink from "../Color/Pink";
import Field from "./index";
import ImageBox from "../Image/User";
import SolidButton from "../Button/Solid";

interface Props {
  className: string;
  label: string;
  required: boolean;
}

function Image({ className, label, required }: Props) {
  return (
    <Field
      className={`Field_Image ${className}`}
      label={label}
      required={required}
      // message={item.message}
    >
      <Wrapper>
        <div className="Wrapper-temp" />
        <UploadImage>
          <ImageBox className="UploadImage-image" />
          <div className="UploadImage-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M15.875 6.875H9.125V0.125H6.875V6.875H0.125V9.125H6.875V15.875H9.125V9.125H15.875V6.875Z"
                fill="white"
              />
            </svg>
          </div>
        </UploadImage>
        <SolidButton
          className="Wrapper-delete"
          placeholder="삭제"
          theme="lightPink"
        />
      </Wrapper>
    </Field>
  );
}

const defaultProps = {
  className: "",
  label: "Label",
  required: true,
  item: {},
  onChange: () => {},
};

Image.defaultProps = defaultProps;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .Wrapper-temp {
    width: 46px;
  }
  .Wrapper-delete {
    width: 46px;
  }
`;

const UploadImage = styled.div`
  position: relative;
  width: 104px;
  height: 104px;
  .UploadImage-image {
    width: 100%;
    height: 100%;
  }
  .UploadImage-button {
    border: solid 2px;
    border-color: ${Gray[50]};
    border-radius: 16px;
    width: 28px;
    height: 28px;
    position: absolute;
    background: ${Pink[500]};
    right: 0px;
    bottom: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default Image;
