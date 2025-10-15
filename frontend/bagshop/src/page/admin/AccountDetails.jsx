// AccountDetails.js - Thêm xử lý loading/error tương tự, Tailwind cho giao diện.
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { Button, Descriptions, Spin, Alert } from "antd"; // Thêm Spin và Alert
import { selectAccount, DELETE_ACCOUNT, FETCH_ACCOUNT, selectAccountLoading, selectAccountError } from "../../redux/slices/AccountSlice"; // Giả định thêm selector

const AccountDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector(selectAccount);
  const loading = useSelector(selectAccountLoading);
  const error = useSelector(selectAccountError);
  const { title } = useOutletContext();

  useEffect(() => {
    dispatch(FETCH_ACCOUNT(id));
  }, [dispatch, id]);

  const handleEdit = () => {
    navigate(`/edit-account/${id}`);
  };

  const handleDelete = () => {
    dispatch(DELETE_ACCOUNT(id)).then(() => {
      navigate("/admin/customers");
    });
  };

  if (loading) {
    return <Spin size="large" className="flex justify-center items-center h-64" />;
  }

  if (error) {
    return <Alert message="Lỗi tải dữ liệu" description={error} type="error" showIcon className="mb-4" />;
  }

  if (!account) return <Alert message="Không tìm thấy tài khoản" type="info" showIcon />;

  return (
    <div className="p-6 bg-white shadow-md rounded-lg"> {/* Container tương tự */}
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>
      <Descriptions title="Thông tin tài khoản" bordered className="mb-6">
        <Descriptions.Item label="ID">{account.id}</Descriptions.Item>
        <Descriptions.Item label="Username">{account.username}</Descriptions.Item>
        <Descriptions.Item label="Email">{account.email}</Descriptions.Item>
        <Descriptions.Item label="Phone Number">{account.phoneNumber}</Descriptions.Item>
        <Descriptions.Item label="City">{account.city}</Descriptions.Item>
        <Descriptions.Item label="Address">{account.address}</Descriptions.Item>
        <Descriptions.Item label="Position">{account.position}</Descriptions.Item>
        <Descriptions.Item label="Status">{account.status}</Descriptions.Item>
      </Descriptions>
      <div className="flex space-x-4">
        <Button
          type="primary"
          onClick={handleEdit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Sửa
        </Button>
        <Button
          danger
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Xóa
        </Button>
      </div>
    </div>
  );
};

export default AccountDetails;