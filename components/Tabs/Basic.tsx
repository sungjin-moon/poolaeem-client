import styled from "@emotion/styled";

import Gray from "../Color/Gray";
import Pink from "../Color/Pink";
import Typography from "../Typography/Pretendard";

type Tab = {
  id: string;
  name: string;
};

interface Props {
  className: string;
  tabs: Tab[];
  tab: string;
  setTab: (id: string) => void;
}

function Basic({ className, tabs, tab, setTab }: Props) {
  return (
    <Tabs className={`Tabs_Basic ${className}`}>
      {tabs.map((item, index) => {
        return (
          <Typography
            key={index}
            className={`Tabs_Basic-tab ${
              tab === item.id ? "actived" : "default"
            }`}
            type="body"
            size={4}
            onClick={() => setTab(item.id)}
          >
            {item.name}
          </Typography>
        );
      })}
    </Tabs>
  );
}

const defaultProps = {
  className: "",
  tabs: [
    { id: "0", name: "Name" },
    { id: "1", name: "Name" },
    { id: "2", name: "Name" },
  ],
  tab: "0",
  setTab: () => {},
};

Basic.defaultProps = defaultProps;

export const Tabs = styled.div`
  border-radius: 12px;
  background: ${Pink[600]};
  padding: 4px;
  display: flex;
  .Tabs_Basic-tab {
    cursor: pointer;
    padding: 4px;
    border-radius: 8px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 4px;
    height: 28px;
    color: ${Gray[50]};
    :last-child {
      margin-right: 0px;
    }
  }
  .actived {
    background: ${Pink[50]};
    color: ${Pink[500]};
  }
`;

export default Basic;
