import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../component/admin/AdminSidebar";
import AdminHeader from "../component/admin/AdminHeader";

const { Content, Sider } = Layout;

const AdminLayout = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false); // State cho collapsible sider

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
      case "/admin/customers/account-details/:id":
        return "Account Details"; // Thêm cho trang chi tiết
      default:
        return "Admin Dashboard";
    }
  };

  return (
    <Layout className="min-h-screen bg-gray-100"> 
      <AdminHeader
        title={getTitle()}
        className="fixed top-0 left-0 w-full bg-white shadow-md z-10 h-16 flex items-center px-6"
      />
      <Layout className="mt-16 flex flex-row"> 
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={250}
          className="fixed top-16 left-0 h-[calc(100vh-4rem)] bg-indigo-900 text-white overflow-y-auto transition-all duration-300" // Màu indigo thanh lịch cho thời trang, transition mượt
          breakpoint="lg"
          collapsedWidth="80"
        >
          <AdminSidebar collapsed={collapsed} />
        </Sider>
        <Content
          className={`ml-${collapsed ? '20' : '250'} p-6 bg-white min-h-[calc(100vh-4rem)] flex-1 transition-all duration-300`} // Margin left động, padding gọn
        >
          <Outlet context={{ title: getTitle() }} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;