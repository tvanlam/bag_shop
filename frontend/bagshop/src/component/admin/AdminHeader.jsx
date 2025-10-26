import React, { useMemo } from "react";
import { Dropdown, Space, Menu } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const AdminHeader = () => {
  const userMenu = useMemo(
    () => (
      <Menu className="rounded-lg shadow-md">
        <Menu.Item key="profile" icon={<UserOutlined />} className="text-gray-800 hover:bg-gray-100">
          <Link to="/profile">Hồ sơ cá nhân</Link>
        </Menu.Item>
        <Menu.Item key="logout" icon={<LogoutOutlined />} className="text-gray-800 hover:bg-gray-100">
          <Link to="/logout">Đăng xuất</Link>
        </Menu.Item>
      </Menu>
    ),
    []
  );

  return (
    <div className="flex justify-between items-center w-full h-full">
      <Dropdown menu={userMenu} placement="bottomRight" className="ml-auto">
        <Space className="cursor-pointer text-gray-700 hover:text-indigo-600 transition duration-200">
          John Doe
          <UserOutlined className="text-lg" />
        </Space>
      </Dropdown>
    </div>
  );
};

export default React.memo(AdminHeader);
