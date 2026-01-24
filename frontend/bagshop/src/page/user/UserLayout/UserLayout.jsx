import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  UserOutlined,
  ShoppingOutlined,
  HeartOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const UserLayout = ({ children }) => {
  const location = useLocation();

  const menuItems = [
    {
      key: "profile",
      label: "Hồ sơ",
      path: "/profile",
      icon: <UserOutlined className="text-lg" />,
    },
    {
      key: "order",
      label: "Đơn hàng",
      path: "/order",
      icon: <ShoppingOutlined className="text-lg" />,
    },
    {
      key: "wishlist",
      label: "Yêu thích",
      path: "/wishlist",
      icon: <HeartOutlined className="text-lg" />,
    },
    {
      key: "settings",
      label: "Cài đặt",
      path: "/settings",
      icon: <SettingOutlined className="text-lg" />,
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-12 mx-auto px-10 py-10">
      <div className="flex gap-6">
        {/* Sidebar Menu */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-28">
            <div className="p-4  from-blue-500 ">
              <h2 className=" font-bold text-lg text-center">
                Tài khoản của tôi
              </h2>
            </div>
            <nav className="p-2">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.key}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all duration-200 ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-semibold shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    }`}
                  >
                    <span
                      className={isActive ? "text-blue-600" : "text-gray-500"}
                    >
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">{children}</div>
      </div>
    </div>
  );
};

export default UserLayout;
