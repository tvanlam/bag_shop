import React, { useMemo } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Tabs,
  message,
  ConfigProvider,
  DatePicker,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  UPDATE_EMAIL,
  UPDATE_PASSWORD,
  UPDATE_INFORMATION,
} from "../../redux/slices/AccountSlice";

const UpdateAccountModal = ({ open, onClose, account }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formPw] = Form.useForm();
  const [formEmail] = Form.useForm();
  const [formInfo] = Form.useForm();
  const loading = useSelector((s) => s.account.loading);

  // Prefill cho tab Cập nhật thông tin
  const initialInfo = useMemo(
    () => ({
      username: account?.username || "",
      phoneNumber: account?.phoneNumber || "",
      dateOfBirth: account?.dateOfBirth || "",

      city: account?.city || "",
      address: account?.address || "",
    }),
    [account]
  );

  const handleFinish = (values, type) => {
    if (type === "CHANGE_EMAIL") {
      dispatch(
        UPDATE_EMAIL({
          accountRequest: { email: values.newEmail },
          accountId: account.id,
        })
      )
        .unwrap()
        .then(() => {
          message.success("OTP đã được gửi tới email mới!");
          onClose?.();
          navigate("/verify", {
            state: { email: values.newEmail, action: "CHANGE_EMAIL" },
          });
        })
        .catch((err) => message.error(err || "Đổi email thất bại"));
    } else if (type === "CHANGE_PASSWORD") {
      dispatch(
        UPDATE_PASSWORD({
          accountRequest: { password: values.newPassword },
          accountId: account.id,
        })
      )
        .unwrap()
        .then(() => {
          message.success("OTP đã được gửi để xác nhận đổi mật khẩu!");
          onClose?.();
          navigate("/verify", {
            state: { email: account.email, action: "CHANGE_PASSWORD" },
          });
        })
        .catch((err) => message.error(err || "Đổi mật khẩu thất bại"));
    } else if (type === "UPDATE_INFORMATION") {
      dispatch(
        UPDATE_INFORMATION({
          accountRequest: { ...values },
          accountId: account.id,
        })
      )
        .unwrap()
        .then(() => {
          message.success("Cập nhật thông tin thành công!");
          onClose?.();
        })
        .catch((err) => message.error(err || "Cập nhật thông tin thất bại"));
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#111", // đồng bộ nút đen
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
          Tabs: {
            inkBarColor: "#111",
          },
        },
      }}
    >
      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        // Ẩn title để Tabs làm header giống ảnh
        title={null}
        styles={{ paddingTop: 16 }}
      >
        <Tabs
          defaultActiveKey="changePassword"
          centered
          className="ua-tabs"
          items={[
            {
              key: "changePassword",
              label: "Đổi mật khẩu",
              children: (
                <Form
                  form={formPw}
                  layout="vertical"
                  onFinish={(v) => handleFinish(v, "CHANGE_PASSWORD")}
                  requiredMark={false}
                  className="space-y-3"
                >
                  <Form.Item
                    name="newPassword"
                    label={<span className="font-medium">Mật khẩu mới</span>}
                    rules={[
                      { required: true, message: "Vui lòng nhập mật khẩu mới" },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      placeholder="Nhập mật khẩu mới"
                    />
                  </Form.Item>

                  <Button
                    htmlType="submit"
                    type="primary"
                    size="large"
                    block
                    loading={loading}
                    style={{ background: "#111", borderColor: "#111" }}
                  >
                    Gửi yêu cầu đổi mật khẩu
                  </Button>
                </Form>
              ),
            },
            {
              key: "changeEmail",
              label: "Đổi email",
              children: (
                <Form
                  form={formEmail}
                  layout="vertical"
                  onFinish={(v) => handleFinish(v, "CHANGE_EMAIL")}
                  requiredMark={false}
                  className="space-y-3"
                  initialValues={{ newEmail: account?.email || "" }}
                >
                  <Form.Item
                    name="newEmail"
                    label={<span className="font-medium">Email mới</span>}
                    rules={[
                      { required: true, message: "Vui lòng nhập email" },
                      { type: "email", message: "Email không hợp lệ" },
                    ]}
                  >
                    <Input size="large" placeholder="Nhập email mới" />
                  </Form.Item>

                  <Button
                    htmlType="submit"
                    type="primary"
                    size="large"
                    block
                    loading={loading}
                    style={{ background: "#111", borderColor: "#111" }}
                  >
                    Gửi yêu cầu đổi email
                  </Button>
                </Form>
              ),
            },
            {
              key: "updateInfo",
              label: "Cập nhật thông tin",
              children: (
                <Form
                  form={formInfo}
                  layout="vertical"
                  onFinish={(v) => handleFinish(v, "UPDATE_INFORMATION")}
                  requiredMark={false}
                  className="space-y-3"
                  initialValues={initialInfo}
                >
                  <Form.Item
                    name="username"
                    label={<span className="font-medium">Tên người dùng</span>}
                  >
                    <Input size="large" placeholder="Tên hiển thị" />
                  </Form.Item>
                  <Form.Item
                    name="phoneNumber"
                    label={<span className="font-medium">Số điện thoại</span>}
                  >
                    <Input size="large" placeholder="Nhập số điện thoại" />
                  </Form.Item>
                  <Form.Item
                    name="dateOfBirth"
                    label={<span className="font-medium">Ngày sinh</span>}
                  >
                    <DatePicker size="large" />
                  </Form.Item>
                  <Form.Item
                    name="city"
                    label={<span className="font-medium">Thành phố</span>}
                  >
                    <Input size="large" placeholder="Nhập thành phố" />
                  </Form.Item>
                  <Form.Item
                    name="address"
                    label={<span className="font-medium">Địa chỉ</span>}
                  >
                    <Input size="large" placeholder="Nhập địa chỉ" />
                  </Form.Item>

                  <Button
                    htmlType="submit"
                    type="primary"
                    size="large"
                    block
                    loading={loading}
                    style={{ background: "#111", borderColor: "#111" }}
                  >
                    Cập nhật thông tin
                  </Button>
                </Form>
              ),
            },
          ]}
        />

        {/* Custom CSS cho Tabs giống ảnh: chữ đậm, căn giữa, gạch chân đen */}
        <style>
          {`
            .ua-tabs .ant-tabs-nav {
              margin-bottom: 16px;
            }
            .ua-tabs .ant-tabs-tab {
              font-weight: 700;
              font-size: 18px;
            }
            .ua-tabs .ant-tabs-ink-bar {
              height: 3px;
              background: #111 !important;
            }
            .ua-tabs .ant-tabs-tab-btn:hover {
              color: #111 !important;
            }
            .ua-tabs .ant-input, 
            .ua-tabs .ant-input-password {
              border-radius: 12px;
            }
          `}
        </style>
      </Modal>
    </ConfigProvider>
  );
};

export default UpdateAccountModal;
