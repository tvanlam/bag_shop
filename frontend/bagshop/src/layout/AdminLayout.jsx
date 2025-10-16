import React, { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AdminHeader from "../component/admin/AdminHeader";
import AdminSidebar from "../component/admin/AdminSidebar";
const { Header, Content, Sider } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen bg-gray-100">
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        width={250}
        collapsedWidth={80}
        className="fixed top-0 left-0 h-screen bg-indigo-900 text-white overflow-y-auto z-20 shadow-lg"
        breakpoint="lg"
      >
        <AdminSidebar collapsed={collapsed} />
      </Sider>
      <Layout className="ml-0">
        <Header className="fixed top-0 left-0 w-full bg-white shadow-md z-10 h-16 flex items-center px-6">
          <AdminHeader />
        </Header>
        <Content
          className={`p-6 bg-white min-h-screen ml-${collapsed ? '20' : '64'} mt-16 transition-all duration-300`}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;