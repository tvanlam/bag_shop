// AccountManagement.js - Thêm xử lý loading và error để tránh loading vĩnh viễn. Giữ Tailwind.
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Tag, Spin, Alert } from "antd"; // Thêm Spin và Alert
import { CREATE_ADMIN, FETCH_ACCOUNTS, selectAccounts, selectAccountLoading, selectAccountError } from "../../redux/slices/AccountSlice"; // Giả định thêm selector loading/error
import { useNavigate, useOutletContext } from "react-router-dom";

const AccountManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accounts = useSelector(selectAccounts);
  const loading = useSelector(selectAccountLoading); // Selector cho loading
  const error = useSelector(selectAccountError); // Selector cho error
  const { title } = useOutletContext();

  useEffect(() => {
    dispatch(FETCH_ACCOUNTS());
  }, [dispatch]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (id, record) => (
        <span
          className="text-blue-600 hover:text-blue-800 cursor-pointer underline"
          onClick={() => record.id && navigate(`/admin/customers/account-details/${record.id}`)}
        >
          {id}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (email) => <span className="text-gray-800">{email}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          className="rounded-full px-2 py-1 text-sm"
          color={
            status === "ACTIVE"
              ? "green"
              : status === "INACTIVE"
              ? "orange"
              : status === "DELETED"
              ? "red"
              : status === "NOT_VERIFIED"
              ? "gray"
              : "default"
          }
        >
          {status}
        </Tag>
      ),
    },
  ];

  const handleCreateAdmin = () => {
    dispatch(CREATE_ADMIN());
  };

  if (loading) {
    return <Spin size="large" className="flex justify-center items-center h-64" />; // Hiển thị loading spinner
  }

  if (error) {
    return <Alert message="Lỗi tải dữ liệu" description={error} type="error" showIcon className="mb-4" />; // Hiển thị lỗi
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>
      <div className="mb-4">
        <Button
          type="primary"
          onClick={handleCreateAdmin}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
        >
          Tạo tài khoản admin
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={accounts}
        rowKey="id"
        className="ant-table-custom"
        pagination={{ pageSize: 10 }}
      />
      <style jsx>{`
        .ant-table-custom .ant-table-thead > tr > th {
          @apply bg-gray-100 text-gray-700 font-semibold;
        }
        .ant-table-custom .ant-table-tbody > tr:hover {
          @apply bg-gray-50;
        }
        .ant-table-custom .ant-table-tbody > tr > td {
          @apply border-b border-gray-200;
        }
      `}</style>
    </div>
  );
};

export default AccountManagement;