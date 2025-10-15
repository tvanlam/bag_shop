// AuthModal.js - Sửa handleLogin để dispatch FETCH_ACCOUNT sau LOGIN và dùng response.position để check redirect.
import React from "react";
import { Modal, Tabs, Form, Input, Button, message, ConfigProvider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN, selectAuthLoading, selectAuthError } from "../../redux/slices/AuthSlice";
import { REGISTER, FETCH_ACCOUNT } from "../../redux/slices/AccountSlice"; // Đảm bảo import FETCH_ACCOUNT

const AuthModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const [formLogin] = Form.useForm();
  const [formRegister] = Form.useForm();

  const handleLogin = (values) => {
    dispatch(LOGIN(values))
      .unwrap()
      .then(async (response) => {
        onClose?.();
        message.success("Đăng nhập thành công!");
        // Dispatch FETCH_ACCOUNT để lấy chi tiết tài khoản nếu cần
        await dispatch(FETCH_ACCOUNT(response.accountId)).unwrap();
        if (response.position === "ADMIN") {
          navigate("/admin");
        }
      })
      .catch((err) => {
        message.error(err?.message || error || "Đăng nhập thất bại!");
      });
  };

  const handleRegister = (values) => {
    dispatch(REGISTER(values))
      .unwrap()
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        onClose?.();
        message.success("Đăng ký thành công! Vui lòng kiểm tra email để lấy mã OTP.");
        // Truyền kèm email/action sang trang verify (tuỳ bạn dùng)
        navigate("/verify", { state: { email: values.email, action: "REGISTER" } });
      })
      .catch((err) => {
        // Hiển thị lỗi trả về từ API
        message.error(err?.message || "Đăng ký thất bại! Vui lòng thử lại.");
      });
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#111",
          colorError: "#ef4444",
        },
      }}
    >
      <Modal open={open} onCancel={onClose} footer={null} centered className="rounded-2xl">
        <Tabs
          defaultActiveKey="login"
          centered
          className="custom-tabs"
          items={[
            {
              label: <span className="font-semibold italic text-lg hover:text-gray-800">Đăng nhập</span>,
              key: "login",
              children: (
                <Form
                  form={formLogin}
                  layout="vertical"
                  onFinish={handleLogin}
                  className="space-y-4"
                  requiredMark={false}
                >
                  <Form.Item
                    name="username"
                    label={<span className="font-medium italic">Tài khoản</span>}
                    rules={[{ required: true, message: "Nhập tài khoản!" }]}
                  >
                    <Input placeholder="Nhập tài khoản" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label={<span className="font-medium italic">Mật khẩu</span>}
                    rules={[{ required: true, message: "Nhập mật khẩu!" }]}
                  >
                    <Input.Password placeholder="Nhập mật khẩu" />
                  </Form.Item>

                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full rounded-xl font-semibold italic"
                  >
                    Đăng nhập
                  </Button>
                </Form>
              ),
            },
            {
              label: <span className="font-semibold italic text-lg hover:text-gray-800">Đăng ký</span>,
              key: "register",
              children: (
                <Form
                  form={formRegister}
                  layout="vertical"
                  onFinish={handleRegister}
                  className="space-y-4"
                  requiredMark={false}
                >
                  <Form.Item
                    name="username"
                    label={<span className="font-medium italic">Tài khoản</span>}
                    rules={[{ required: true, message: "Nhập tài khoản!" }]}
                  >
                    <Input placeholder="Nhập tài khoản" />
                  </Form.Item>

                  <Form.Item
                    name="email"
                    label={<span className="font-medium italic">Email</span>}
                    rules={[
                      { required: true, message: "Nhập email!" },
                      { type: "email", message: "Email không hợp lệ!" },
                    ]}
                  >
                    <Input placeholder="Nhập email" />
                  </Form.Item>

                  <Form.Item
                    name="phoneNumber"
                    label={<span className="font-medium italic">Số điện thoại</span>}
                    rules={[{ required: true, message: "Nhập số điện thoại!" }]}
                  >
                    <Input placeholder="Nhập số điện thoại" />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    label={<span className="font-medium italic">Mật khẩu</span>}
                    rules={[{ required: true, message: "Nhập mật khẩu!" }]}
                  >
                    <Input.Password placeholder="Nhập mật khẩu" />
                  </Form.Item>

                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full rounded-xl font-semibold italic"
                  >
                    Đăng kí
                  </Button>
                </Form>
              ),
            },
          ]}
        />
      </Modal>

      <style>
        {`
          .custom-tabs .ant-tabs-tab {
            font-weight: 600;
            font-style: italic;
            font-size: 1.1rem;
          }
          .custom-tabs .ant-tabs-tab:hover {
            color: #111 !important;
          }
          .custom-tabs .ant-tabs-tab-active .ant-tabs-tab-btn {
            color: #111 !important;
          }
          .custom-tabs .ant-tabs-ink-bar {
            background: #111 !important;
          }
        `}
      </style>
    </ConfigProvider>
  );
};

export default AuthModal;