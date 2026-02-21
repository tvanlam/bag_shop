import React from "react";
import DefaultAddressCard from "./DefaultAddressCard";
import NewAddressForm from "./NewAddressForm";

/**
 * Component section giao hàng (Delivery)
 * Bao gồm: Địa chỉ mặc định, Thêm địa chỉ mới, Thông tin liên hệ
 */
const DeliverySection = ({
  account,
  selectedAddressOption,
  onAddressOptionChange,
  newAddress,
  onNewAddressFieldChange,
  provinceData,
  onProvinceSelect,
  onDistrictSelect,
  onWardSelect,
  onContinue,
  formErrors,
}) => {
  return (
    <div className="deliveryStep">
      <h3 className="text-lg text-gray-700 font-bold bg-gray-200 p-3 rounded-md">
        1. Giao hàng
      </h3>
      <p className="font-bold text-md pb-1 pt-2">Địa chỉ giao hàng</p>

      {/* Address Options */}
      <div className="flex flex-row gap-4">
        {/* Default Address Card */}
        <DefaultAddressCard
          account={account}
          isSelected={selectedAddressOption === "default"}
          onSelect={(e) => onAddressOptionChange(e.target.value)}
        />

        {/* New Address Option */}
        <div className="w-80 h-50 border-2 border-gray-500 rounded-md p-4 flex flex-col gap-3">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="default-address"
              className="accent-black w-4 h-4"
              value="new"
              checked={selectedAddressOption === "new"}
              onChange={(e) => onAddressOptionChange(e.target.value)}
            />
            <div className="flex flex-col w-64">
              <p>Thêm 1 địa chỉ giao hàng</p>
            </div>
          </label>
        </div>
      </div>

      {/* New Address Form (conditional) */}
      {selectedAddressOption === "new" && (
        <NewAddressForm
          newAddress={newAddress}
          onFieldChange={onNewAddressFieldChange}
          provinceData={provinceData}
          onProvinceSelect={onProvinceSelect}
          onDistrictSelect={onDistrictSelect}
          onWardSelect={onWardSelect}
          formErrors={formErrors}
        />
      )}

      {/* Contact Information */}
      <div className="mt-6 pt-4 border-t border-gray-300">
        <h4 className="font-bold text-md mb-3">Thông tin liên hệ</h4>
        <div className="flex flex-row gap-4 items-center">
          <p>Email*</p>
          <input
            type="email"
            value={account?.email || ""}
            readOnly
            className="border border-gray-300 rounded-md p-2 w-1/2 bg-gray-100 cursor-not-allowed"
          />
        </div>
        <p className="text-sm text-gray-600 mt-2 ml-16">
          Email này sẽ được sử dụng để gửi thông tin đơn hàng
        </p>
      </div>

      {/* Continue Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={onContinue}
          className="border border-black bg-gray-600 rounded-md px-4 py-2 text-white hover:bg-gray-700"
        >
          TIẾP TỤC ĐẾN PHƯƠNG THỨC GIAO HÀNG
        </button>
      </div>
    </div>
  );
};

export default DeliverySection;
