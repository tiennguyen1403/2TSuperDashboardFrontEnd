import { Layout } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AxiosConfig from "../components/AxiosConfig";

const { Header: AntHeader, Sider, Content } = Layout;

const layoutStyle = {
  height: "100vh",
};

const headerStyle = {
  height: 74,
};

const contentStyle = {
  padding: "32px 48px",
  "overflow-y": "auto",
};

const PrivateLayout = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) return <Navigate to="/sign-in" replace />;

  return (
    <AxiosConfig>
      <Layout style={layoutStyle}>
        <Sider width={288}>
          <Sidebar />
        </Sider>
        <Layout>
          <AntHeader style={headerStyle}>
            <Header />
          </AntHeader>
          <Content style={contentStyle}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </AxiosConfig>
  );
};

export default PrivateLayout;
