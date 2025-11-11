import React, { useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";

const Checkout = () => {
  const Navigate = useNavigate();
  const account = {
    fullName: "Nguyễn Văn A",
    city: "Hà Nội",
    address: "123 đường vào tim e",
    phoneNumber: "123456789",
  };
  const [selectedOption, setSelectedOption] = useState("default");

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

          <div className="delivery max-w-screen-md">
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
                    <select className="border border-gray-400 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"></select>
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
                  <p>Số điện thoại*</p>
                  <input
                    type="text"
                    placeholder="Số điện thoại"
                    className="border border-gray-300 rounded-md p-2 w-1/2"
                  />
                </div>
                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" className="w-4 h-4 accent-black" />
                  <label>Đặt làm địa chỉ mặc định</label>
                </div>
                <div className="flex justify-center mt-4">
                  <button className="border border-black bg-white-500 text-black px-6 py-2 rounded-md hover:bg-black hover:text-white">
                    Lưu địa chỉ
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
