import { Header } from "antd/es/layout/layout";

const { theme, Layout } = require("antd");

const AppLayout = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      {/** // TODO Sidebar */}
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        {props.children}
      </Layout>
    </Layout>
  );
};

export default AppLayout;
