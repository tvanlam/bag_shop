import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { message } from "antd";
import { clearSupportSlice, VERIFY } from "../../redux/slices/SupportSlice";
import { RESENT } from "../../redux/slices/AuthSlice";
const OTP_LENGTH = 5;

const VerificationPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success } = useSelector((s) => s.support ?? {});

  const email = state?.email;
  const action = state?.action || "CHANGE_PASSWORD";

  const [code, setCode] = useState(Array(OTP_LENGTH).fill(""));
  const [timeLeft, setTimeLeft] = useState(120);
  const inputs = useRef([]);

  useEffect(() => {
    if (!email) {
      message.error("Thiếu email để xác thực");
      navigate("/");
    }
  }, [email, navigate]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleInput = useCallback(
    (index, value) => {
      if (!/^\d?$/.test(value)) return;
      const next = [...code];
      next[index] = value;
      setCode(next);
      if (value && index < OTP_LENGTH - 1) inputs.current[index + 1]?.focus();
    },
    [code],
  );

  const handleKeyDown = useCallback(
    (index, e) => {
      if (e.key === "Backspace" && !code[index] && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    },
    [code],
  );

  const handlePaste = useCallback((e) => {
    const pasted = e.clipboardData
      .getData("text")
      .slice(0, OTP_LENGTH)
      .split("");
    if (pasted.every((c) => /^\d$/.test(c))) {
      setCode(pasted.concat(Array(OTP_LENGTH - pasted.length).fill("")));
      inputs.current[OTP_LENGTH - 1]?.focus();
    }
  }, []);

  // ✅ Gửi object { email, action, otp } cho backend
  const submitCode = useCallback(() => {
    if (code.every((d) => d !== "")) {
      dispatch(VERIFY({ email, action, otp: code.join("") }));
    }
  }, [code, dispatch, email, action]);

  // ✅ Resend OTP dùng email + action từ state trước đó
  const handleResend = useCallback(() => {
    dispatch(RESENT({ email, action }));
    message.success("Đã gửi lại mã OTP");
    setCode(Array(OTP_LENGTH).fill(""));
    setTimeLeft(120);
    inputs.current[0]?.focus();
  }, [dispatch, email, action]);

  useEffect(() => {
    if (success) {
      dispatch(clearSupportSlice());
      message.success("Bạn đã xác thực thành công");
      navigate(
        action === "REGISTER"
          ? "/"
          : action === "CHANGE_EMAIL"
            ? "/profile"
            : "/",
      );
    } else if (error) {
      message.error(error?.message || "Mã không hợp lệ");
      setCode(Array(OTP_LENGTH).fill(""));
      inputs.current[0]?.focus();
    }
  }, [success, error, action, dispatch, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Xác nhận OTP
        </h1>
        <p className="text-center text-gray-600 mb-2">
          Nhập mã OTP được gửi đến{" "}
          <span className="font-semibold">{email}</span>
        </p>
        <p className="text-center text-sm text-gray-500 mb-6">
          Hành động: {action.replace("_", " ").toLowerCase()}
        </p>

        <div className="flex justify-center gap-2 mb-6" onPaste={handlePaste}>
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInput(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputs.current[index] = el)}
              className="w-12 h-12 text-center text-xl font-medium border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              disabled={loading}
            />
          ))}
        </div>

        <div className="text-center mb-4">
          {timeLeft > 0 ? (
            <p className="text-gray-600">
              Mã OTP hết hạn sau: {Math.floor(timeLeft / 60)}:
              {(timeLeft % 60).toString().padStart(2, "0")}
            </p>
          ) : (
            <p className="text-red-500">Mã OTP đã hết hạn</p>
          )}
        </div>

        {loading && (
          <p className="text-blue-500 text-center mb-4">Đang xác nhận...</p>
        )}

        <div className="flex justify-between gap-4">
          <button
            onClick={handleResend}
            disabled={loading || timeLeft > 0}
            className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all disabled:opacity-50"
          >
            Gửi lại OTP
          </button>
          <button
            onClick={submitCode}
            disabled={loading || code.some((d) => d === "")}
            className="flex-1 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
