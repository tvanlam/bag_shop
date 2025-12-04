import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ProvinceService from "../../../../service/ProvinceService";

/**
 * Custom hook để quản lý dữ liệu địa giới hành chính (Tỉnh/Quận/Phường)
 * Sử dụng cascade dropdown pattern
 */
export const useProvinceData = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState("");
  const [selectedDistrictCode, setSelectedDistrictCode] = useState("");
  const [loading, setLoading] = useState({
    provinces: false,
    districts: false,
    wards: false,
  });

  // Fetch danh sách 34 tỉnh thành mới (Nghị quyết 202/2025/QH15)
  useEffect(() => {
    const fetchProvinces = async () => {
      setLoading((prev) => ({ ...prev, provinces: true }));
      try {
        const response = await ProvinceService.getMajorProvinces();
        setProvinces(response.data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách tỉnh thành:", error);
        toast.error("Không thể tải danh sách tỉnh thành");
      } finally {
        setLoading((prev) => ({ ...prev, provinces: false }));
      }
    };
    fetchProvinces();
  }, []);

  // Fetch danh sách quận/huyện khi chọn tỉnh
  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedProvinceCode) {
        setLoading((prev) => ({ ...prev, districts: true }));
        try {
          const response = await ProvinceService.getDistrictsByProvinceCode(
            selectedProvinceCode
          );
          setDistricts(response.data.districts || []);
          setWards([]); // Reset wards khi đổi tỉnh
        } catch (error) {
          console.error("Lỗi khi tải danh sách quận/huyện:", error);
          toast.error("Không thể tải danh sách quận/huyện");
        } finally {
          setLoading((prev) => ({ ...prev, districts: false }));
        }
      } else {
        setDistricts([]);
        setWards([]);
      }
    };
    fetchDistricts();
  }, [selectedProvinceCode]);

  // Fetch danh sách phường/xã khi chọn quận
  useEffect(() => {
    const fetchWards = async () => {
      if (selectedDistrictCode) {
        setLoading((prev) => ({ ...prev, wards: true }));
        try {
          const response = await ProvinceService.getWardsByDistrictCode(
            selectedDistrictCode
          );
          setWards(response.data.wards || []);
        } catch (error) {
          console.error("Lỗi khi tải danh sách phường/xã:", error);
          toast.error("Không thể tải danh sách phường/xã");
        } finally {
          setLoading((prev) => ({ ...prev, wards: false }));
        }
      } else {
        setWards([]);
      }
    };
    fetchWards();
  }, [selectedDistrictCode]);

  // Helper function để lấy tên tỉnh từ code
  const getProvinceName = (code) => {
    const province = provinces.find((p) => p.code.toString() === code);
    return province?.name || "";
  };

  // Helper function để lấy tên quận từ code
  const getDistrictName = (code) => {
    const district = districts.find((d) => d.code.toString() === code);
    return district?.name || "";
  };

  // Reset tất cả selections
  const resetSelections = () => {
    setSelectedProvinceCode("");
    setSelectedDistrictCode("");
    setDistricts([]);
    setWards([]);
  };

  return {
    provinces,
    districts,
    wards,
    selectedProvinceCode,
    selectedDistrictCode,
    setSelectedProvinceCode,
    setSelectedDistrictCode,
    loading,
    getProvinceName,
    getDistrictName,
    resetSelections,
  };
};

