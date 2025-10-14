import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, BoxPlotOutlined, ShoppingCartOutlined, UserOutlined, StarOutlined, SettingOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { key: '/admin/dashboard', icon: <HomeOutlined />, label: <Link to="/admin/dashboard">Dashboard</Link> },
    { key: '/admin/products', icon: <BoxPlotOutlined />, label: <Link to="/admin/products">Products</Link> },
    { key: '/admin/orders', icon: <ShoppingCartOutlined />, label: <Link to="/admin/orders">Orders</Link> },
    { key: '/admin/customers', icon: <UserOutlined />, label: <Link to="/admin/customers">Customers</Link> },
    { key: '/admin/reviews', icon: <StarOutlined />, label: <Link to="/admin/reviews">Reviews</Link> },
    { key: '/admin/settings', icon: <SettingOutlined />, label: <Link to="/admin/settings">Settings</Link> },
  ];

  return (
    <div style={{ padding: '16px 0', color: '#fff' }}>
      <h2 className="text-2xl font-bold mb-6 text-center" style={{ marginTop: '10px' }}>KINGKONG</h2>
      <Menu
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
        style={{ background: 'transparent', border: 'none', color: '#fff' }}
        items={menuItems.map(item => ({ ...item, style: { color: '#fff' } }))}
      />
    </div>
  );
};

export default AdminSidebar;