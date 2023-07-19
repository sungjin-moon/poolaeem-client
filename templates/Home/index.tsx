import styled from "@emotion/styled";

import Typography from "../../components/Typography/Pretendard";
import SolidButton from "../../components/Button/Solid";
import Chip from "../../components/Chip/Basic";

import Layout from "../../templates";

interface Props {}

function Home() {
  return (
    <Layout>
      <Template>
        <Typography type="heading" size={1}>
          Heading1
        </Typography>
        <Typography type="heading" size={2}>
          Heading2
        </Typography>
        <Typography type="heading" size={3}>
          Heading3
        </Typography>
        <Typography type="subHeading" size={1}>
          SubHeading1
        </Typography>
        <Typography type="subHeading" size={2}>
          SubHeading2
        </Typography>
        <Typography type="caption" size={1}>
          Caption1
        </Typography>
        <Typography type="caption" size={2}>
          Caption2
        </Typography>
        <Typography type="caption" size={3}>
          Caption3
        </Typography>
        <Typography type="caption" size={4}>
          Caption4
        </Typography>
        <Typography type="caption" size={5}>
          Caption5
        </Typography>
        <Typography type="caption" size={6}>
          Caption6
        </Typography>
        <Typography type="body" size={1}>
          Body1
        </Typography>
        <Typography type="body" size={2}>
          Body2
        </Typography>
        <Typography type="body" size={3}>
          Body3
        </Typography>
        <Typography type="body" size={4}>
          Body4
        </Typography>
        <Typography type="body" size={5}>
          Body5
        </Typography>
        <Typography type="body" size={6}>
          Body6
        </Typography>
        <SolidButton size="small" theme="pink" status="disabled" />
        <SolidButton size="small" theme="lightPink" />
        <SolidButton size="small" theme="white" />
        <SolidButton size="medium" theme="pink" />
        <SolidButton size="medium" theme="lightPink" />
        <SolidButton size="medium" theme="white" />
        <SolidButton size="large" theme="pink" />
        <SolidButton size="large" theme="lightPink" />
        <SolidButton size="large" theme="white" />
        <Chip theme="pink" />
        <Chip theme="lightPink" />
        <Chip theme="yellow" />
        <Chip theme="lightYellow" />
        <Chip theme="blue" />
        <Chip theme="lightBlue" />
        <Chip theme="green" />
        <Chip theme="lightGreen" />
        <Chip theme="white" />
        <Chip theme="black" />
      </Template>
    </Layout>
  );
}

const Template = styled.div``;

export default Home;
