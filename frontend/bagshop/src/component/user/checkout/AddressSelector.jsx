import React from "react";

/**
 * Component cho cascade dropdown: Tỉnh/TP → Quận/Huyện → Phường/Xã
 */
const AddressSelector = ({
  provinces,
  districts,
  wards,
  selectedProvinceCode,
  selectedDistrictCode,
  selectedWard,
  onProvinceChange,
  onDistrictChange,
  onWardChange,
  loading,
}) => {
  return (
    <div className="flex flex-row gap-4 pt-2">
      {/* Tỉnh/TP */}
      <p className="text-center">Tỉnh/TP*</p>
      <select
        className="w-40 rounded-md border border-gray-300 p-1"
        value={selectedProvinceCode}
        onChange={onProvinceChange}
        disabled={loading?.provinces}
      >
        <option value="">
          {loading?.provinces ? "Đang tải..." : "Chọn Tỉnh/TP"}
        </option>
        {provinces.map((province) => (
          <option key={province.code} value={province.code}>
            {province.name}
          </option>
        ))}
      </select>

      {/* Quận/Huyện */}
      <p className="text-center">Quận/Huyện*</p>
      <select
        className="w-40 rounded-md border border-gray-300 p-1"
        value={selectedDistrictCode}
        onChange={onDistrictChange}
        disabled={!selectedProvinceCode || loading?.districts}
      >
        <option value="">
          {loading?.districts ? "Đang tải..." : "Chọn Quận/Huyện"}
        </option>
        {districts.map((district) => (
          <option key={district.code} value={district.code}>
            {district.name}
          </option>
        ))}
      </select>

      {/* Phường/Xã */}
      <p className="text-center">Phường/Xã*</p>
      <select
        className="w-40 rounded-md border border-gray-300 p-1"
        value={selectedWard}
        onChange={onWardChange}
        disabled={!selectedDistrictCode || loading?.wards}
      >
        <option value="">
          {loading?.wards ? "Đang tải..." : "Chọn Phường/Xã"}
        </option>
        {wards.map((ward) => (
          <option key={ward.code} value={ward.name}>
            {ward.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddressSelector;

