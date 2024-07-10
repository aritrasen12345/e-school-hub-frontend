import { Header } from "antd/es/layout/layout";
import Sidebar from "../components/sidebar/Sidebar";
import { Layout, theme } from "antd";

const AppLayout = (props) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Sidebar />
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
