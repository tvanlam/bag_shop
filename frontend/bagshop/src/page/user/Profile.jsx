import React, { useEffect, useState } from "react";
import { Card, Descriptions, Tag, Spin, Divider, Avatar, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_ACCOUNT,
  selectAccount,
  selectAccountLoading,
} from "../../redux/slices/AccountSlice";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import UpdateAccountModal from "../../component/modal/UpdateAccountModal";
import ButtonDeleteAccount from "../../component/button/ButtonDeleteAccount";
import UserLayout from "./UserLayout/UserLayout";

const Profile = () => {
  const accountId = useSelector((state) => state.auth.accountId);
  const dispatch = useDispatch();
  const account = useSelector(selectAccount);
  const loading = useSelector(selectAccountLoading);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (accountId) dispatch(FETCH_ACCOUNT(accountId));
  }, [accountId, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spin size="large" />
      </div>
    );
  }

  if (!account) {
    return (
      <div className="text-center text-gray-500 py-10">
        Không tìm thấy thông tin tài khoản
      </div>
    );
  }

  return (
    <UserLayout>
      <Card
        className="shadow-lg rounded-2xl"
        title={
          <div className="flex items-center gap-4">
            <Avatar
              size={64}
              style={{ backgroundColor: "#1890ff" }}
              icon={<UserOutlined />}
            />
            <div className="mt-6 pb-6">
              <h2 className="text-xl font-bold m-0">
                {account.firstName && account.lastName
                  ? `${account.firstName} ${account.lastName}`
                  : account.username}
              </h2>
              <p className="text-gray-400 m-0 text-sm">@{account.username}</p>
              <p className="text-gray-500 m-0">Mã KH: {account.id}</p>
            </div>
          </div>
        }
        extra={
          <Button
            type="primary"
            size="large"
            onClick={() => setOpenModal(true)}
            style={{
              background: "#111",
              borderColor: "#111",
              borderRadius: 12,
              fontWeight: 600,
            }}
          >
            Cập nhật
          </Button>
        }
        bodyStyle={{ paddingTop: 12 }}
      >
        {/* Thông tin liên hệ */}
        <Divider plain>
          <span className="font-semibold"> Thông tin liên hệ</span>
        </Divider>
        <Descriptions
          bordered
          column={1}
          labelStyle={{ fontWeight: 600, width: 60 }}
          contentStyle={{ background: "#fff" }}
          className="rounded-xl overflow-hidden"
        >
          <Descriptions.Item label={<UserOutlined />}>
            {account.firstName && account.lastName
              ? `${account.firstName} ${account.lastName}`
              : "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item label={<MailOutlined />}>
            {account.email}
          </Descriptions.Item>
          <Descriptions.Item label={<PhoneOutlined />}>
            {account.phoneNumber}
          </Descriptions.Item>
          <Descriptions.Item label={<CalendarOutlined />}>
            {account.dateOfBirth || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item label={<EnvironmentOutlined />}>
            {account.city || "Chưa cập nhật"}
          </Descriptions.Item>
          <Descriptions.Item label={<HomeOutlined />}>
            {account.address || "Chưa cập nhật"}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <ButtonDeleteAccount accountId={account.id} className="mt-4" />
      <UpdateAccountModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        account={account}
      />

      {/* Tinh chỉnh nhẹ về khoảng cách/bóng đổ */}
      <style>
        {`
          .ant-card {
            border-radius: 16px;
          }
          .ant-descriptions-bordered .ant-descriptions-item-label {
            background: #fafafa;
          }
          .ant-divider-horizontal.ant-divider-with-text-left::before,
          .ant-divider-horizontal.ant-divider-with-text-left::after {
            border-top-color: #f0f0f0;
          }
        `}
      </style>
    </UserLayout>
  );
};

export default Profile;
