import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { Button, Descriptions, Spin, Alert } from "antd";
import { selectAccount, DELETE_ACCOUNT, FETCH_ACCOUNT, selectAccountLoading, selectAccountError } from "../../redux/slices/AccountSlice";

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
    <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">{title}</h1>
      <Descriptions title="Thông tin tài khoản" bordered column={1} className="mb-6 bg-gray-50 rounded-md p-4 shadow-inner">
        <Descriptions.Item label="ID" className="text-gray-700 font-medium">{account.id}</Descriptions.Item>
        <Descriptions.Item label="Username" className="text-gray-700 font-medium">{account.username}</Descriptions.Item>
        <Descriptions.Item label="Email" className="text-gray-700 font-medium">{account.email}</Descriptions.Item>
        <Descriptions.Item label="Phone Number" className="text-gray-700 font-medium">{account.phoneNumber}</Descriptions.Item>
        <Descriptions.Item label="City" className="text-gray-700 font-medium">{account.city}</Descriptions.Item>
        <Descriptions.Item label="Address" className="text-gray-700 font-medium">{account.address}</Descriptions.Item>
        <Descriptions.Item label="Position" className="text-gray-700 font-medium">{account.position}</Descriptions.Item>
        <Descriptions.Item label="Status" className="text-gray-700 font-medium">{account.status}</Descriptions.Item>
      </Descriptions>
      <div className="flex space-x-4 mt-6">
        <Button
          type="primary"
          onClick={handleEdit}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 shadow-md"
        >
          Sửa
        </Button>
        <Button
          danger
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 shadow-md"
        >
          Xóa
        </Button>
      </div>
    </div>
  );
};

export default AccountDetails;