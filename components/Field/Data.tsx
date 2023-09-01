import { useState, ReactElement } from "react";
import styled from "@emotion/styled";

import Pink from "../Color/Pink";

import Field from "./index";
import SolidButton from "../Button/Solid";
import Typography from "../Typography/Pretendard";
import Chip from "../Chip/Basic";
import PromptModal from "../Modal/DialogBox/Prompt";

import useModal from "../../hooks/useModal";

type Theme = "pink" | "lightPink";

type Value = {
  id: string;
  name: string;
  theme: Theme;
};

type Button = {
  Icon?: ReactElement;
  name: string;
  field: {
    placeholder: string;
  };
};

type Item = {
  required: boolean;
  status: string;
  value: Value[];
  placeholder: string;
  message: string;
  maxLength?: undefined | number;
};

interface Props {
  className: string;
  label: string;
  item: Item;
  onChange: undefined | ((item: Item) => void);
  firstButton: Button;
  secondButton: Button;
}

function Data({
  className,
  label,
  item,
  onChange,
  firstButton,
  secondButton,
}: Props) {
  const FirstModal = useModal();
  const SecondModal = useModal();
  const [$value, $setValue] = useState<Value[]>([]);

  const getHandler = () => {
    if (item.value && onChange) {
      return {
        type: "plugin",
        value: item.value,
        setValue: (value: Value[]) => {
          console.log(value);
          onChange({ ...item, value });
        },
      };
    }
    return {
      type: "default",
      value: $value,
      setValue: $setValue,
    };
  };

  const onAdd = (name: string, theme: Theme) => {
    const { value, setValue } = getHandler();
    const createdValue = [{ id: "", name, theme }];
    return setValue([...value, ...createdValue]);
  };

  const onRemove = (index: number) => {
    const { value, setValue } = getHandler();
    const nextValue = value.filter((value, i) => index !== i);
    return setValue(nextValue);
  };

  const { value } = getHandler();
  const maxLength = item.maxLength || 0;

  return (
    <Field
      className={`Field_Data ${className}`}
      label={label}
      required={item.required}
      message={item.message}
      currentLength={value.length}
      maxLength={maxLength}
    >
      <>
        <Container
          css={{
            borderColor:
              item.status === "invalid" ? Pink[500] : "rgba(95, 92, 93, 0.18)",
          }}
        >
          {value.length > 0 ? (
            <div className="Container-chips">
              {value.map((item, index) => {
                return (
                  <Chip
                    key={item.id || index}
                    className="Container-chips-chip"
                    name={item.name}
                    theme={item.theme}
                    isClose={true}
                    onClose={() => onRemove(index)}
                  />
                );
              })}
            </div>
          ) : (
            <Typography
              className="Container-placeholder"
              type="caption"
              size={2}
            >
              {item.placeholder}
            </Typography>
          )}

          <div className="Container-buttons">
            {secondButton && (
              <SolidButton
                className="Container-buttons-button"
                size="large"
                placeholder={secondButton.name}
                theme="lightPink"
                status={value.length >= maxLength ? "disabled" : "default"}
                onClick={SecondModal.onOpen}
              />
            )}
            {firstButton && (
              <SolidButton
                className="Container-buttons-button"
                size="large"
                placeholder={firstButton.name}
                theme="pink"
                status={value.length >= maxLength ? "disabled" : "default"}
                onClick={FirstModal.onOpen}
              />
            )}
          </div>
        </Container>
        {secondButton && (
          <PromptModal
            Icon={secondButton.Icon}
            title={secondButton.name}
            field={secondButton.field}
            cancel={{
              placeholder: "닫기",
              handler: SecondModal.onClose,
            }}
            success={{
              placeholder: secondButton.name,
              handler: (item) => {
                console.log(item);
                if (item.status !== "success") return;
                const name: string = item.value || "";
                onAdd(name, "lightPink");
                SecondModal.onClose();
              },
            }}
            modalRef={SecondModal.ref}
            isOpen={SecondModal.isOpen}
            status={SecondModal.status}
            onClose={SecondModal.onClose}
          />
        )}
        {firstButton && (
          <PromptModal
            Icon={firstButton.Icon}
            title={firstButton.name}
            field={firstButton.field}
            cancel={{
              placeholder: "닫기",
              handler: FirstModal.onClose,
            }}
            success={{
              placeholder: firstButton.name,
              handler: (item) => {
                console.log(item);
                if (item.status !== "success") return;
                const name: string = item.value || "";
                onAdd(name, "pink");
                FirstModal.onClose();
              },
            }}
            modalRef={FirstModal.ref}
            isOpen={FirstModal.isOpen}
            status={FirstModal.status}
            onClose={FirstModal.onClose}
          />
        )}
      </>
    </Field>
  );
}

const defaultProps = {
  className: "",
  label: "Label",
  item: {
    required: true,
    status: "default",
    value: undefined,
    placeholder: "Placeholder",
    message: "",
  },
  onChange: undefined,
  firstButton: {
    Icon: null,
    name: "Add Data1",
    field: {
      placeholder: "",
    },
  },
  secondButton: {
    Icon: null,
    name: "Add Data2",
    field: {
      placeholder: "",
    },
  },
};

Data.defaultProps = defaultProps;

const Container = styled.div`
  border: solid 1px;
  border-color: rgba(95, 92, 93, 0.18);
  border-radius: 16px;
  padding: 16px;
  transition: 0.3s ease-in-out;
  .Container-placeholder {
    color: rgba(95, 92, 93, 0.36);
  }
  .Container-chips {
    display: flex;
    flex-wrap: wrap;
    column-gap: 6px;
    row-gap: 8px;
    .Container-chips-chip {
    }
  }
  .Container-buttons {
    display: flex;
    padding-top: 16px;
    margin-top: 16px;
    border-top: solid 1px;
    border-color: rgba(95, 92, 93, 0.18);
    .Container-buttons-button {
      width: 100%;
      margin-right: 8px;
      :last-child {
        margin-right: 0px;
      }
    }
  }
`;

export default Data;
