import React from "react";
import { Modal, Tabs, Form, Input, Button, message, ConfigProvider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGIN, selectAuthLoading, selectAuthError } from "../../redux/slices/AuthSlice";
import { REGISTER, FETCH_ACCOUNT } from "../../redux/slices/AccountSlice";

const AuthModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const [formLogin] = Form.useForm();
  const [formRegister] = Form.useForm();

  const handleLogin = async (values) => {
    try {
      const response = await dispatch(LOGIN(values)).unwrap();
      onClose?.();
      message.success("Đăng nhập thành công!");
      await dispatch(FETCH_ACCOUNT(response.accountId)).unwrap();
      if (response.position === "ADMIN") {
        navigate("/admin");
      }
    } catch (err) {
      message.error(err?.message || error || "Đăng nhập thất bại!");
    }
  };

  const handleRegister = async (values) => {
    try {
      await dispatch(REGISTER(values)).unwrap();
      onClose?.();
      message.success("Đăng ký thành công! Vui lòng kiểm tra email để lấy mã OTP.");
      navigate("/verify", { state: { email: values.email, action: "REGISTER" } });
    } catch (err) {
      message.error(err?.message || "Đăng ký thất bại! Vui lòng thử lại.");
    }
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
      <Modal open={open} onCancel={onClose} footer={null} centered className="rounded-2xl overflow-hidden shadow-2xl">
        <Tabs
          defaultActiveKey="login"
          centered
          className="custom-tabs font-bold italic text-lg"
          items={[
            {
              label: "Đăng nhập",
              key: "login",
              children: (
                <Form form={formLogin} layout="vertical" onFinish={handleLogin} className="space-y-4 px-4 py-2">
                  <Form.Item
                    name="username"
                    label="Tài khoản"
                    rules={[{ required: true, message: "Nhập tài khoản!" }]}
                    className="font-medium italic"
                  >
                    <Input placeholder="Nhập tài khoản" className="rounded-md border-gray-300" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{ required: true, message: "Nhập mật khẩu!" }]}
                    className="font-medium italic"
                  >
                    <Input.Password placeholder="Nhập mật khẩu" className="rounded-md border-gray-300" />
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full rounded-xl font-semibold italic bg-[#111] hover:bg-[#222] text-white h-10"
                  >
                    Đăng nhập
                  </Button>
                </Form>
              ),
            },
            {
              label: "Đăng ký",
              key: "register",
              children: (
                <Form form={formRegister} layout="vertical" onFinish={handleRegister} className="space-y-4 px-4 py-2">
                  <Form.Item
                    name="username"
                    label="Tài khoản"
                    rules={[{ required: true, message: "Nhập tài khoản!" }]}
                    className="font-medium italic"
                  >
                    <Input placeholder="Nhập tài khoản" className="rounded-md border-gray-300" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      { required: true, message: "Nhập email!" },
                      { type: "email", message: "Email không hợp lệ!" },
                    ]}
                    className="font-medium italic"
                  >
                    <Input placeholder="Nhập email" className="rounded-md border-gray-300" />
                  </Form.Item>
                  <Form.Item
                    name="phoneNumber"
                    label="Số điện thoại"
                    rules={[{ required: true, message: "Nhập số điện thoại!" }]}
                    className="font-medium italic"
                  >
                    <Input placeholder="Nhập số điện thoại" className="rounded-md border-gray-300" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{ required: true, message: "Nhập mật khẩu!" }]}
                    className="font-medium italic"
                  >
                    <Input.Password placeholder="Nhập mật khẩu" className="rounded-md border-gray-300" />
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full rounded-xl font-semibold italic bg-[#111] hover:bg-[#222] text-white h-10"
                  >
                    Đăng kí
                  </Button>
                </Form>
              ),
            },
          ]}
        />
      </Modal>
    </ConfigProvider>
  );
};

export default AuthModal;