import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { Button, Descriptions } from 'antd';
import { selectAccount, DELETE_ACCOUNT, FETCH_ACCOUNT } from '../../redux/slices/AccountSlice';

const AccountDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector(selectAccount); // Sử dụng useSelector
  const { title } = useOutletContext();

  useEffect(() => {
    dispatch(FETCH_ACCOUNT(id));
  }, [dispatch, id]);

  const handleEdit = () => {
    navigate(`/edit-account/${id}`);
  };

  const handleDelete = () => {
    dispatch(DELETE_ACCOUNT(id)).then(() => {
      navigate('/admin/customers');
    });
  };

  if (!account) return <div>Loading...</div>;

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <Descriptions title="Thông tin tài khoản" bordered>
        <Descriptions.Item label="ID">{account.id}</Descriptions.Item>
        <Descriptions.Item label="Username">{account.username}</Descriptions.Item>
        <Descriptions.Item label="Email">{account.email}</Descriptions.Item>
        <Descriptions.Item label="Phone Number">{account.phoneNumber}</Descriptions.Item>
        <Descriptions.Item label="City">{account.city}</Descriptions.Item>
        <Descriptions.Item label="Address">{account.address}</Descriptions.Item>
        <Descriptions.Item label="Position">{account.position}</Descriptions.Item>
        <Descriptions.Item label="Status">{account.status}</Descriptions.Item>
      </Descriptions>
      <div style={{ marginTop: 16 }}>
        <Button type="primary" onClick={handleEdit} style={{ marginRight: 8 }}>
          Sửa
        </Button>
        <Button type="danger" onClick={handleDelete}>
          Xóa
        </Button>
      </div>
    </>
  );
};

export default AccountDetails;