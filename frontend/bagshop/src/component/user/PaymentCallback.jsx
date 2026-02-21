import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Spin } from "antd";

/**
 * Component xử lý callback từ VNPay sau khi thanh toán
 */
const PaymentCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    const handlePaymentCallback = async () => {
      try {
        // Lấy các tham số từ URL
        const responseCode = searchParams.get("vnp_ResponseCode");
        const transactionStatus = searchParams.get("vnp_TransactionStatus");
        const orderId = searchParams.get("vnp_TxnRef");

        // VNPay response code: 00 = success
        if (responseCode === "00" && transactionStatus === "00") {
          toast.success("Thanh toán thành công!");

          // Redirect về trang chủ hoặc trang đơn hàng
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else {
          // Thanh toán thất bại
          const errorMessage = getErrorMessage(responseCode);
          toast.error(errorMessage);

          setTimeout(() => {
            navigate("/cart");
          }, 2000);
        }
      } catch (error) {
        console.error("Payment callback error:", error);
        toast.error("Có lỗi xảy ra khi xử lý thanh toán!");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } finally {
        setProcessing(false);
      }
    };

    handlePaymentCallback();
  }, [searchParams, navigate]);

  // Hàm lấy thông báo lỗi dựa trên response code
  const getErrorMessage = (code) => {
    const errorMessages = {
      "07": "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).",
      "09": "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.",
      10: "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần",
      11: "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.",
      12: "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.",
      13: "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP).",
      24: "Giao dịch không thành công do: Khách hàng hủy giao dịch",
      51: "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.",
      65: "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.",
      75: "Ngân hàng thanh toán đang bảo trì.",
      79: "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định.",
      99: "Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)",
    };

    return errorMessages[code] || "Thanh toán không thành công!";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-5">
      <div className="text-center max-w-md mx-auto">
        {processing ? (
          <>
            <Spin size="large" />
            <h2 className="text-2xl font-bold text-gray-800 mt-6">
              Đang xử lý thanh toán...
            </h2>
            <p className="text-gray-600 mt-2">Vui lòng đợi trong giây lát</p>
          </>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Đang chuyển hướng...
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCallback;
