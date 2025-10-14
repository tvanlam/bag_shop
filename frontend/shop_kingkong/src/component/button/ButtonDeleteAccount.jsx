import React, { useState } from "react";
import { Button, Modal, Input, Typography, Alert, message, ConfigProvider } from "antd";
import { ExclamationCircleOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { DELETE_ACCOUNT } from "../../redux/slices/AccountSlice";
import { LOGOUT } from "../../redux/slices/AuthSlice";

const { Text } = Typography;

const ButtonDeleteAccount = ({ accountId, className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accountLoading = useSelector((s) => s.account?.loading);
  const authLoading = useSelector((s) => s.auth?.loading);

  const [open, setOpen] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const loading = Boolean(accountLoading || authLoading);

  const onOpen = () => setOpen(true);
  const onClose = () => {
    if (!loading) {
      setOpen(false);
      setConfirmText("");
    }
  };

  const handleDelete = async () => {
    if (confirmText.trim().toUpperCase() !== "DELETE") {
      message.warning("Vui lòng gõ chính xác 'DELETE' để xác nhận xoá.");
      return;
    }
    try {
      await dispatch(DELETE_ACCOUNT(accountId)).unwrap();
      try {
        await dispatch(LOGOUT(accountId)).unwrap();
      } catch {
        /* bỏ qua lỗi logout nếu có */
      }

      message.success("Tài khoản đã được xoá. Hẹn gặp lại!");
      navigate("/", { replace: true });
    } catch (err) {
      message.error(err?.message || "Xoá tài khoản thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#111", // Đồng bộ nút đen
          borderRadius: 12,
          controlHeight: 44,
        },
        components: {
          Input: {
            paddingBlockLG: 12,
            borderRadiusLG: 12,
          },
          Button: {
            borderRadius: 12,
          },
        },
      }}
    >
      <Button
        icon={<DeleteOutlined />}
        danger
        type="primary"
        onClick={onOpen}
        size="large"
        className={className}
        style={{ background: "#111", borderColor: "#111" }}
      >
        Xoá tài khoản
      </Button>

      <Modal
        open={open}
        onCancel={onClose}
        onOk={handleDelete}
        okText="Tôi hiểu, XOÁ"
        okButtonProps={{
          danger: true,
          loading,
          size: "large",
          style: { background: "#111", borderColor: "#111" },
        }}
        cancelButtonProps={{ disabled: loading, size: "large" }}
        centered
        title={
          <div className="flex items-center gap-2">
            <ExclamationCircleOutlined style={{ color: "#faad14", fontSize: "18px" }} />
            <span className="font-bold text-lg">Xác nhận xoá tài khoản</span>
          </div>
        }
        styles={{ body: { paddingTop: 16 } }}
      >
        <Alert
          type="warning"
          showIcon
          message={<span className="font-medium">Hành động không thể hoàn tác</span>}
          description="Việc xoá tài khoản sẽ đăng xuất bạn khỏi hệ thống và có thể làm mất quyền truy cập các dữ liệu liên quan."
          style={{ marginBottom: 16, borderRadius: 12 }}
        />

        <div style={{ marginBottom: 8 }}>
          <Text>
            Vui lòng gõ <Text strong>&quot;DELETE&quot;</Text> để xác nhận:
          </Text>
        </div>

        <Input
          placeholder='Nhập "DELETE" để xác nhận'
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          disabled={loading}
          size="large"
        />
      </Modal>

      <style>
        {`
          .ant-input, .ant-input-password {
            border-radius: 12px;
          }
        `}
      </style>
    </ConfigProvider>
  );
};

export default ButtonDeleteAccount;