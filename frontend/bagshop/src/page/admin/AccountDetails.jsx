import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Descriptions, Spin, Alert } from "antd";
import {
  DELETE_ACCOUNT,
  FETCH_SELECTED_ACCOUNT,
  selectSelectedAccount,
  selectSelectedAccountLoading,
  selectSelectedAccountError,
} from "../../redux/slices/AccountSlice";

const AccountDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account = useSelector(selectSelectedAccount);
  const loading = useSelector(selectSelectedAccountLoading);
  const error = useSelector(selectSelectedAccountError);

  useEffect(() => {
    dispatch(FETCH_SELECTED_ACCOUNT(id));
  }, [dispatch, id]);

  const handleEdit = () => {
    navigate(`/edit-account/${id}`);
  };

  const handleDelete = () => {
    dispatch(DELETE_ACCOUNT(id)).then(() => {
      navigate("/admin/customers");
    });
  };

  const handleBack = () => {
    navigate("/admin/customers");
  };

  if (loading) {
    return <Spin size="large" className="flex justify-center items-center h-64" />;
  }

  if (error) {
    return <Alert message="Lỗi tải dữ liệu" description={error} type="error" showIcon className="mb-4" />;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      {/* Nút trở về */}
      <div className="mb-4">
        <Button
          onClick={handleBack}
          className="text-gray-700 hover:text-indigo-600 font-medium px-4 py-2 rounded transition duration-200"
          icon={<span className="mr-2">←</span>}
          type="text"
        >
          Trở về
        </Button>
      </div>

      <Descriptions title="Thông tin tài khoản" bordered column={1} className="mb-6 bg-gray-50 rounded-md p-4 shadow-inner">
        <Descriptions.Item label="ID">{account.id}</Descriptions.Item>
        <Descriptions.Item label="Username">{account.username}</Descriptions.Item>
        <Descriptions.Item label="Email">{account.email}</Descriptions.Item>
        <Descriptions.Item label="Phone Number">{account.phoneNumber}</Descriptions.Item>
        <Descriptions.Item label="City">{account.city}</Descriptions.Item>
        <Descriptions.Item label="Address">{account.address}</Descriptions.Item>
        <Descriptions.Item label="Position">{account.position}</Descriptions.Item>
        <Descriptions.Item label="Status">{account.status}</Descriptions.Item>
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
          className="bg-red-600 hover:bg-red-700 text-black font-semibold py-2 px-6 rounded-lg transition duration-300 shadow-md"
        >
          Xóa
        </Button>
      </div>
    </div>
  );
};

export default AccountDetails;
