import React, { useRef, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Checkout = () => {
  const Navigate = useNavigate();
  const dispatch = useSelector((state) => state.auth.accountId);
  // const loading = useSelector((state) => state.checkout.loading);
  const shippingRef = useRef(null);
  const account = {
    fullName: "Nguyễn Văn A",
    city: "Hà Nội",
    address: "123 đường vào tim e",
    phoneNumber: "123456789",
    email: "nguyenvana@example.com",
  };
  const [selectedOption, setSelectedOption] = useState("default");
  const handleContinueToShipping = () => {
    shippingRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 pt-24 pb-12  ">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-2">
            <button onClick={() => Navigate(-1)} className="underline">
              Giỏ hàng
            </button>
            <FaGreaterThan />
            <span>Thanh toán</span>
          </div>
          <p className="font-bold text-center text-2xl mb-6">Thanh toán</p>

          <div className="deliveryStep max-w-screen-md">
            <h3 className="text-lg text-gray-700 font-bold bg-gray-200 p-3 rounded-md">
              1.Giao hàng
            </h3>
            <p className="font-bold text-md pb-1 pt-2">Địa chỉ giao hàng</p>
            <div className="flex flex-row gap-4">
              <div className="w-80 h-40 border-2 border-gray-500 rounded-md p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="default-address"
                      className="accent-black w-4 h-4"
                      value="default"
                      checked={selectedOption === "default"}
                      onChange={(e) => setSelectedOption(e.target.value)}
                    />
                  </label>
                  <div className="flex flex-col w-64">
                    <select className="border border-gray-400 rounded-md p-2 focus:outline-none ">
                      <option value="">Hà Nội</option>
                      <option value="">TPHCM</option>
                    </select>
                  </div>
                </div>
                <ul>
                  <li>Tên: {account.fullName}</li>
                  <li>Thành phố: {account.city}</li>
                  <li>Địa chỉ: {account.address}</li>
                  <li>Số điện thoại: {account.phoneNumber}</li>
                </ul>
              </div>
              <div className="w-80 h-40 border-2 border-gray-500 rounded-md p-4 flex flex-col gap-3">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="default-address"
                    className="accent-black w-4 h-4"
                    value="new"
                    checked={selectedOption == "new"}
                    onChange={(e) => setSelectedOption(e.target.value)}
                  />
                  <div className="flex flex-col w-64">
                    <p>Thêm 1 địa chỉ giao hàng</p>
                  </div>
                </label>
              </div>
            </div>

            {selectedOption === "new" && (
              <form className="flex flex-col gap-2 mt-2 text-sm pb-1 pt-2 ">
                <h4 className="font-bold ">THÊM MỘT ĐỊA CHỈ GIAO HÀNG MỚI</h4>
                <p className="opacity-50">*Các trường bắt buộc</p>
                <div className="flex flex-row gap-4">
                  <input
                    type="text"
                    placeholder="Họ*"
                    className="border border-gray-300 rounded-md p-2 w-1/2"
                  />
                  <input
                    type="text"
                    placeholder="Tên*"
                    className="border border-gray-300 rounded-md p-2 w-1/2"
                  />
                </div>
                <div className="flex flex-col pt-2">
                  <p className="font-bold">Địa điểm: </p>
                  <input
                    type="text"
                    placeholder="Địa chỉ*"
                    className="border border-gray-300 rounded-md p-2 "
                  />
                </div>
                <div className="flex flex-row gap-4 pt-2">
                  <p className="text-center">Tỉnh/TP*</p>
                  <select className="w-40 rounded-md ">
                    <option value="" disabled selected>
                      Chọn Tỉnh/TP
                    </option>
                  </select>
                  <p className="text-center">Quận/Huyện*</p>
                  <select className="w-40 rounded-md">
                    <option value="" disabled selected>
                      Chọn Quận/Huyện
                    </option>
                  </select>
                  <p className="text-center">Phường/Xã*</p>
                  <select className="w-40 rounded-md">
                    <option value="" disabled selected>
                      Chọn Phường/Xã
                    </option>
                  </select>
                </div>
                <div className="flex flex-row gap-4 pt-4">
                  <p>Số liên lạc*</p>
                  <input
                    type="text"
                    placeholder="Số điện thoại liên hệ"
                    className="border border-gray-300 rounded-md p-2 w-1/2"
                  />
                </div>

                <div className="flex items-center gap-2 pt-4">
                  <input type="checkbox" className="w-4 h-4 accent-black" />
                  <label>Lưu địa chỉ cho những lần mua sau</label>
                </div>
                <div className="flex justify-center mt-4">
                  <button className="border border-black bg-white-500 text-black px-6 py-2 rounded-md hover:bg-black hover:text-white">
                    Lưu địa chỉ
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-gray-300">
              <h4 className="font-bold text-md mb-3">Thông tin liên hệ</h4>
              <div className="flex flex-row gap-4 items-center">
                <p>Email*</p>
                <input
                  type="email"
                  value={account.email}
                  readOnly
                  className="border border-gray-300 rounded-md p-2 w-1/2 bg-gray-100 cursor-not-allowed"
                />
              </div>
              <p className="text-sm text-gray-600 mt-2 ml-16">
                Email này sẽ được sử dụng để gửi thông tin đơn hàng
              </p>
            </div>

            {/* Nút tiếp tục - Áp dụng cho cả 2 trường hợp */}
            <div className="flex justify-center mt-6">
              <button
                onClick={() => handleContinueToShipping}
                className="border border-black bg-gray-600 rounded-md px-4 py-2 text-white hover:bg-gray-700"
              >
                TIẾP TỤC ĐẾN PHƯƠNG THỨC GIAO HÀNG
              </button>
            </div>
          </div>

          <div className="shippingMethodStep max-w-screen-md mt-12">
            <h3 className="text-lg text-gray-700 font-bold bg-gray-200 p-3 rounded-md">
              2.Phương thức vận chuyển
            </h3>
            <p className="font-bold">PHƯƠNG THỨC GIAO HÀNG</p>
            <div className="w-80 h-40 border border-black rounded-md p-4 flex flex-col gap-3">
              <label className="flex items-center gap-2">
                <input
                  onChange={(e) => setSelectedOption(e.target.value)}
                  type="radio"
                  name="standard-shipping"
                  className="accent-black w-4 h-4"
                />
              </label>
            </div>
          </div>

          <div className="paymentStep max-w-screen-md mt-12">
            <h3 className="text-lg text-gray-700 font-bold bg-gray-200 p-3 rounded-md">
              3.Thanh toán
            </h3>
          </div>
        </div>
        <div className="max-w-4xl"></div>
      </div>
    </>
  );
};

export default Checkout;
