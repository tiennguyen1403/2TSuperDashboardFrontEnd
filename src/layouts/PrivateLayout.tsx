import { Layout } from "antd";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const { Header: AntHeader, Sider, Content } = Layout;

const layoutStyle = {
  height: "100vh",
};

const headerStyle = {
  height: 74,
};

const PrivateLayout = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) return <Navigate to="/sign-in" replace />;

  return (
    <Layout style={layoutStyle}>
      <Sider width={288}>
        <Sidebar />
      </Sider>
      <Layout>
        <AntHeader style={headerStyle}>
          <Header />
        </AntHeader>
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
