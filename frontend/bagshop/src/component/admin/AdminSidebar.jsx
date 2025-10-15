// AdminSidebar.js - Sửa để hỗ trợ collapsed (chỉ icon), sử dụng Tailwind cho style.
import React from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  BoxPlotOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  StarOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = ({ collapsed }) => {
  const location = useLocation();

  const menuItems = [
    { key: "/admin/dashboard", icon: <HomeOutlined className="text-xl" />, label: <Link to="/admin/dashboard">Dashboard</Link> },
    { key: "/admin/products", icon: <BoxPlotOutlined className="text-xl" />, label: <Link to="/admin/products">Products</Link> },
    { key: "/admin/orders", icon: <ShoppingCartOutlined className="text-xl" />, label: <Link to="/admin/orders">Orders</Link> },
    { key: "/admin/customers", icon: <UserOutlined className="text-xl" />, label: <Link to="/admin/customers">Customers</Link> },
    { key: "/admin/reviews", icon: <StarOutlined className="text-xl" />, label: <Link to="/admin/reviews">Reviews</Link> },
    { key: "/admin/settings", icon: <SettingOutlined className="text-xl" />, label: <Link to="/admin/settings">Settings</Link> },
  ];

  return (
    <div className="p-4 text-white">
      <h2 className={`text-2xl font-bold mb-6 text-center transition-all duration-300 ${collapsed ? 'hidden' : 'block'}`}>KINGKONG</h2> {/* Ẩn tiêu đề khi collapsed */}
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        className="bg-transparent border-none text-white"
        items={menuItems.map((item) => ({
          ...item,
          className: `my-1 transition-all duration-300 ${collapsed ? 'justify-center' : ''}`, // Căn giữa icon khi collapsed
        }))}
      />
    </div>
  );
};

export default AdminSidebar;