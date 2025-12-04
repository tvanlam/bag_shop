import React from "react";

/**
 * Component hiển thị thẻ địa chỉ mặc định
 */
const DefaultAddressCard = ({ account, isSelected, onSelect }) => {
  return (
    <div className="w-80 min-h-40 border-2 border-gray-500 rounded-md p-4 flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="default-address"
            className="accent-black w-4 h-4"
            value="default"
            checked={isSelected}
            onChange={onSelect}
          />
        </label>
        <div className="flex flex-col w-64">
          <p className="font-semibold">Địa chỉ mặc định</p>
        </div>
      </div>
      {account ? (
        <ul className="text-sm">
          <li>
            Tên: {account.firstName} {account.lastName}
          </li>
          <li>Email: {account.email}</li>
          <li>Số điện thoại: {account.phoneNumber || "N/A"}</li>
          <li>Địa chỉ: {account.address || "Chưa cập nhật"}</li>
        </ul>
      ) : (
        <p className="text-sm text-gray-500">Đang tải...</p>
      )}
    </div>
  );
};

export default DefaultAddressCard;

