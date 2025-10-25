import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button, Tag, Spin, Alert } from "antd";
import {
  CREATE_ADMIN,
  FETCH_ACCOUNTS,
  selectAccounts,
  selectAccountListLoading,
  selectAccountError,
} from "../../redux/slices/AccountSlice";
import { useNavigate } from "react-router-dom";

const AccountManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accounts = useSelector(selectAccounts);
  const loadingList = useSelector(selectAccountListLoading);
  const error = useSelector(selectAccountError);

  useEffect(() => {
    console.log("AccountManagement mounted at:", new Date().toLocaleTimeString());
    dispatch(FETCH_ACCOUNTS());
    return () => console.log("AccountManagement unmounted at:", new Date().toLocaleTimeString());
  }, [dispatch]);

  const handleCreateAdmin = () => {
    console.log("Creating admin at:", new Date().toLocaleTimeString());
    dispatch(CREATE_ADMIN());
  };

  const columns = useMemo(
    () => [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
        render: (id, record) => (
          <span
            className="text-blue-600 hover:text-blue-800 cursor-pointer underline font-medium"
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
        render: (email) => <span className="text-gray-800 font-medium">{email}</span>,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status) => (
          <Tag
            className="rounded-full px-3 py-1 text-sm font-semibold"
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
    ],
    [navigate]
  );

  if (loadingList) {
    return <Spin size="large" className="flex justify-center items-center h-64" />;
  }

  if (error) {
    return <Alert message="Lỗi tải dữ liệu" description={error} type="error" showIcon className="mb-4" />;
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-200">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Danh sách tài khoản</h1>
      <div className="mb-6">
        <Button
          type="primary"
          onClick={handleCreateAdmin}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 shadow-md"
        >
          Tạo tài khoản admin
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={Array.isArray(accounts) ? accounts : []}
        rowKey="id"
        pagination={{ pageSize: 10, showSizeChanger: true, pageSizeOptions: ["10", "20", "50"] }}
        className="overflow-x-auto"
        rowClassName="hover:bg-gray-50 transition duration-200"
        headStyle={{ backgroundColor: "#f9fafb", color: "#374151", fontWeight: "600" }}
        bordered={false}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default AccountManagement;
