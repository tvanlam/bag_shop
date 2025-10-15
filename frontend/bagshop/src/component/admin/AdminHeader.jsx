// AdminHeader.js - Sửa với Tailwind cho giao diện gọn, thanh lịch.
import React from "react";
import { Dropdown, Space, Menu } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const AdminHeader = ({ title }) => {
  const userMenu = (
    <Menu className="rounded-lg shadow-md"> {/* Bo góc và shadow */}
      <Menu.Item key="profile" icon={<UserOutlined />} className="text-gray-800 hover:bg-gray-100">
        <Link to="/profile">Hồ sơ cá nhân</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} className="text-gray-800 hover:bg-gray-100">
        <Link to="/logout">Đăng xuất</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2> {/* Chữ đậm, màu xám đậm */}
      <Dropdown overlay={userMenu} placement="bottomRight">
        <Space className="cursor-pointer text-gray-700 hover:text-indigo-600 transition duration-200"> {/* Hover hiệu ứng màu indigo */}
          John Doe
          <UserOutlined className="text-lg" />
        </Space>
      </Dropdown>
    </div>
  );
};

export default AdminHeader;