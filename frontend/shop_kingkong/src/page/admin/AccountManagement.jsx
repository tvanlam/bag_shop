import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Button, Tag } from 'antd';
import { CREATE_ADMIN, FETCH_ACCOUNTS, selectAccounts } from '../../redux/slices/AccountSlice';
import { useNavigate, useOutletContext } from 'react-router-dom';

const AccountManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accounts = useSelector(selectAccounts);
  const { title } = useOutletContext();

  useEffect(() => {
    dispatch(FETCH_ACCOUNTS());
  }, [dispatch]);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (id, record) => (
        <a onClick={() => navigate(`/admin/customers/account-details/${record.id}`)} style={{ cursor: 'pointer' }}>
          {id}
        </a>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email, record) => (
        <a onClick={() => navigate(`/admin/customers/account-details/${record.id}`)} style={{ cursor: 'pointer' }}>
          {email}
        </a>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <a onClick={() => navigate(`/admin/customers/account-details/${record.id}`)} style={{ cursor: 'pointer' }}>
          <Tag color={
            status === 'ACTIVE' ? 'green' :
            status === 'INACTIVE' ? 'orange' :
            status === 'DELETED' ? 'red' :
            status === 'NOT_VERIFIED' ? 'gray' : 'default'
          }>
            {status}
          </Tag>
        </a>
      ),
    },
  ];

  const handleCreateAdmin = () => {
    dispatch(CREATE_ADMIN());
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <Button type="primary" onClick={handleCreateAdmin} style={{ marginBottom: 16 }}>
        Tạo tài khoản admin
      </Button>
      <Table columns={columns} dataSource={accounts} rowKey="id" />
    </>
  );
};

export default AccountManagement;