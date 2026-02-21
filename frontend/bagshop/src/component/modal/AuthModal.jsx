import React from "react";
import {
  Modal,
  Tabs,
  Form,
  Input,
  Button,
  message,
  ConfigProvider,
  DatePicker,
  Checkbox,
  Divider,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import {
  LOGIN,
  GOOGLE_LOGIN,
  selectAuthLoading,
  selectAuthError,
} from "../../redux/slices/AuthSlice";
import { REGISTER, FETCH_ACCOUNT } from "../../redux/slices/AccountSlice";

const AuthModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);
  const [formLogin] = Form.useForm();
  const [formRegister] = Form.useForm();

  const handleGoogleSuccess = async (tokenResponse) => {
    try {
      const response = await dispatch(
        GOOGLE_LOGIN(tokenResponse.access_token),
      ).unwrap();
      onClose?.();
      message.success("Đăng nhập Google thành công!");
      await dispatch(FETCH_ACCOUNT(response.accountId)).unwrap();
      if (response.position === "ADMIN") {
        navigate("/admin");
      }
    } catch (err) {
      message.error(err?.message || err || "Đăng nhập Google thất bại!");
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: handleGoogleSuccess,
    onError: () => message.error("Đăng nhập Google thất bại!"),
  });

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
      message.success(
        "Đăng ký thành công! Vui lòng kiểm tra email để lấy mã OTP.",
      );
      navigate("/verify", {
        state: { email: values.email, action: "REGISTER" },
      });
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
      <Modal
        open={open}
        onCancel={onClose}
        footer={null}
        centered
        className="rounded-2xl overflow-hidden shadow-2xl"
      >
        <Tabs
          defaultActiveKey="login"
          centered
          className="custom-tabs font-bold italic text-lg"
          items={[
            {
              label: "Đăng nhập",
              key: "login",
              children: (
                <Form
                  form={formLogin}
                  layout="vertical"
                  onFinish={handleLogin}
                  className="space-y-4 px-4 py-2"
                >
                  <Form.Item
                    name="username"
                    label="Tài khoản"
                    rules={[{ required: true, message: "Nhập tài khoản!" }]}
                    className="font-medium italic"
                  >
                    <Input
                      placeholder="Nhập tài khoản"
                      className="rounded-md border-gray-300"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{ required: true, message: "Nhập mật khẩu!" }]}
                    className="font-medium italic"
                  >
                    <Input.Password
                      placeholder="Nhập mật khẩu"
                      className="rounded-md border-gray-300"
                    />
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full rounded-xl font-semibold italic bg-[#111] hover:bg-[#222] text-white h-10"
                  >
                    Đăng nhập
                  </Button>

                  <Divider plain className="text-gray-400 text-sm">
                    hoặc
                  </Divider>

                  <Button
                    onClick={() => loginWithGoogle()}
                    className="w-full rounded-xl font-semibold h-10 border border-gray-300 flex items-center justify-center gap-2 hover:border-gray-400"
                    icon={
                      <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5 h-5"
                      />
                    }
                  >
                    Đăng nhập với Google
                  </Button>
                </Form>
              ),
            },
            {
              label: "Đăng ký",
              key: "register",
              children: (
                <Form
                  form={formRegister}
                  layout="vertical"
                  onFinish={handleRegister}
                  className="space-y-4 px-4 py-2"
                >
                  <Form.Item
                    name="username"
                    label="Tài khoản"
                    rules={[{ required: true, message: "Nhập tài khoản!" }]}
                    className="font-medium italic"
                  >
                    <Input
                      placeholder="Nhập tài khoản"
                      className="rounded-md border-gray-300"
                    />
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
                    <Input
                      placeholder="Nhập email"
                      className="rounded-md border-gray-300"
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Mật khẩu"
                    rules={[{ required: true, message: "Nhập mật khẩu!" }]}
                    className="font-medium italic"
                  >
                    <Input.Password
                      placeholder="Nhập mật khẩu"
                      className="rounded-md border-gray-300"
                    />
                  </Form.Item>
                  <Form.Item
                    name="phoneNumber"
                    label="Số điện thoại"
                    rules={[{ required: true, message: "Nhập số điện thoại!" }]}
                    className="font-medium italic"
                  >
                    <Input
                      placeholder="Nhập số điện thoại"
                      className="rounded-md border-gray-300"
                    />
                  </Form.Item>

                  <Form.Item
                    name="dateOfBirth"
                    label="Ngày sinh"
                    rules={[{ required: true, message: "Chọn ngày sinh!" }]}
                    className="font-medium italic"
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      placeholder="Chọn ngày sinh"
                      className="rounded-md border-gray-300"
                    />
                  </Form.Item>
                  <Form.Item
                    name="agreeToTerms"
                    valuePropName="checked"
                    rules={[
                      {
                        validator: (_, value) =>
                          value
                            ? Promise.resolve()
                            : Promise.reject(
                                new Error("Bạn phải đồng ý với điều khoản!"),
                              ),
                      },
                    ]}
                    className="font-medium italic"
                  >
                    <Checkbox>
                      Tôi đồng ý với{" "}
                      <a
                        href="/terms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 underline"
                      >
                        điều khoản và điều kiện
                      </a>
                    </Checkbox>
                  </Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    className="w-full rounded-xl font-semibold italic bg-[#111] hover:bg-[#222] text-white h-10"
                  >
                    Đăng kí
                  </Button>

                  <Divider plain className="text-gray-400 text-sm">
                    hoặc đăng ký nhanh
                  </Divider>

                  <Button
                    onClick={() => loginWithGoogle()}
                    className="w-full rounded-xl font-semibold h-10 border border-gray-300 flex items-center justify-center gap-2 hover:border-gray-400"
                    icon={
                      <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        className="w-5 h-5"
                      />
                    }
                  >
                    Đăng ký với Google
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
