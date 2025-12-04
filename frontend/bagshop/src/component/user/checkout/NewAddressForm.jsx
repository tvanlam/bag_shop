import React from "react";
import AddressSelector from "./AddressSelector";

/**
 * Component form nhập địa chỉ giao hàng mới
 */
const NewAddressForm = ({
  newAddress,
  onFieldChange,
  provinceData,
  onProvinceSelect,
  onDistrictSelect,
  onWardSelect,
}) => {
  const {
    provinces,
    districts,
    wards,
    selectedProvinceCode,
    selectedDistrictCode,
    loading,
  } = provinceData;

  const handleProvinceChange = (e) => {
    const code = e.target.value;
    const selectedProvince = provinces.find(
      (p) => p.code.toString() === code
    );
    onProvinceSelect(code, selectedProvince?.name || "");
  };

  const handleDistrictChange = (e) => {
    const code = e.target.value;
    const selectedDistrict = districts.find(
      (d) => d.code.toString() === code
    );
    onDistrictSelect(code, selectedDistrict?.name || "");
  };

  const handleWardChange = (e) => {
    onWardSelect(e.target.value);
  };

  return (
    <form
      className="flex flex-col gap-2 mt-2 text-sm pb-1 pt-2"
      onSubmit={(e) => e.preventDefault()}
    >
      <h4 className="font-bold">THÊM MỘT ĐỊA CHỈ GIAO HÀNG MỚI</h4>
      <p className="opacity-50">*Các trường bắt buộc</p>

      {/* Họ và Tên */}
      <div className="flex flex-row gap-4">
        <input
          type="text"
          placeholder="Họ*"
          value={newAddress.firstName}
          onChange={(e) => onFieldChange("firstName", e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-1/2"
        />
        <input
          type="text"
          placeholder="Tên*"
          value={newAddress.lastName}
          onChange={(e) => onFieldChange("lastName", e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-1/2"
        />
      </div>

      {/* Địa chỉ */}
      <div className="flex flex-col pt-2">
        <p className="font-bold">Địa điểm:</p>
        <input
          type="text"
          placeholder="Địa chỉ*"
          value={newAddress.address}
          onChange={(e) => onFieldChange("address", e.target.value)}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>

      {/* Cascade Dropdown: Tỉnh → Quận → Phường */}
      <AddressSelector
        provinces={provinces}
        districts={districts}
        wards={wards}
        selectedProvinceCode={selectedProvinceCode}
        selectedDistrictCode={selectedDistrictCode}
        selectedWard={newAddress.ward}
        onProvinceChange={handleProvinceChange}
        onDistrictChange={handleDistrictChange}
        onWardChange={handleWardChange}
        loading={loading}
      />

      {/* Số điện thoại */}
      <div className="flex flex-row gap-4 pt-4">
        <p>Số liên lạc*</p>
        <input
          type="text"
          placeholder="Số điện thoại liên hệ"
          value={newAddress.phoneNumber}
          onChange={(e) => onFieldChange("phoneNumber", e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-1/2"
        />
      </div>

      {/* Checkbox lưu địa chỉ */}
      <div className="flex items-center gap-2 pt-4">
        <input
          type="checkbox"
          className="w-4 h-4 accent-black"
          checked={newAddress.saveAddress}
          onChange={(e) => onFieldChange("saveAddress", e.target.checked)}
        />
        <label>Lưu địa chỉ cho những lần mua sau</label>
      </div>
    </form>
  );
};

export default NewAddressForm;

