import React, { useMemo } from "react";
import { Menu } from "antd";
import {
  HomeOutlined,
  BoxPlotOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  StarOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const AdminSidebar = ({ collapsed }) => {
  const menuItems = useMemo(
    () => [
      { key: "1", icon: <HomeOutlined className="text-xl" />, label: <Link to="/admin/dashboard">Dashboard</Link> },
      { key: "2", icon: <BoxPlotOutlined className="text-xl" />, label: <Link to="/admin/products">Products</Link> },
      { key: "3", icon: <ShoppingCartOutlined className="text-xl" />, label: <Link to="/admin/orders">Orders</Link> },
      { key: "4", icon: <UserOutlined className="text-xl" />, label: <Link to="/admin/customers">Customers</Link> },
      { key: "5", icon: <StarOutlined className="text-xl" />, label: <Link to="/admin/reviews">Reviews</Link> },
      { key: "6", icon: <SettingOutlined className="text-xl" />, label: <Link to="/admin/settings">Settings</Link> },
    ],
    []
  );

  return (
    <div className="h-screen bg-indigo-900 text-white p-4">
      <h2 className={`text-2xl font-bold mb-6 text-center transition-all duration-300 ${collapsed ? "hidden" : "block"}`}>
        KINGKONG
      </h2>
      <Menu mode="inline" className="bg-transparent border-none text-white" inlineCollapsed={collapsed} items={menuItems} />
    </div>
  );
};

export default React.memo(AdminSidebar);
