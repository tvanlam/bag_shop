import React from 'react';
import { Dropdown, Space, Menu } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const AdminHeader = ({ title }) => {
  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Hồ sơ cá nhân</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <Link to="/logout">Đăng xuất</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-white p-4 shadow-md flex justify-between items-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Dropdown overlay={userMenu} placement="bottomRight">
        <Space className="cursor-pointer">
          John Doe
          <UserOutlined />
        </Space>
      </Dropdown>
    </div>
  );
};

export default AdminHeader;