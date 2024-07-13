import React from "react";
import Header from "../components/navs/Header.jsx";
import Sidebar from "../components/sidebar/Sidebar.js";
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
