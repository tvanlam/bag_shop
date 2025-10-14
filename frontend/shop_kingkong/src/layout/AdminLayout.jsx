import React from "react";
import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../component/admin/AdminSidebar";
import AdminHeader from "../component/admin/AdminHeader";

const { Header, Content, Sider } = Layout;

const AdminLayout = () => {
  const location = useLocation();
  const getTitle = () => {
    switch (location.pathname) {
      case "/admin/dashboard":
        return "Admin Dashboard";
      case "/admin/products":
        return "Products";
      case "/admin/orders":
        return "Orders";
      case "/admin/customers":
        return "Customers";
      case "/admin/reviews":
        return "Reviews";
      case "/admin/settings":
        return "Settings";
      default:
        return "Admin Dashboard";
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminHeader
        title={getTitle()}
        style={{
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          position: "relative",
          zIndex: 1,
        }}
      />
      <Layout
        style={{
          display: "flex",
          flexDirection: "row",
          height: "calc(100vh - 30px)",
        }}
      >
        <Sider
          width={250}
          style={{
            background: "#001529",
            height: "100vh",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 2,
            overflowY: "auto",
          }}
        >
          <AdminSidebar />
        </Sider>
        <Content
          style={{
            marginLeft: 250,
            padding: "20px",
            background: "#fff",
            minHeight: "100%",
            flex: 1,
          }}
        >
          <Outlet context={{ title: getTitle() }} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
