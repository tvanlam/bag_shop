import axios from "axios";

// API miễn phí cho địa giới hành chính Việt Nam
const BASE_URL = "https://provinces.open-api.vn/api/v2";

const ProvinceService = {
  // Lấy danh sách tất cả tỉnh/thành phố
  getAllProvinces() {
    return axios.get(`${BASE_URL}/p/`);
  },

  // Lấy danh sách quận/huyện theo mã tỉnh
  getDistrictsByProvinceCode(provinceCode) {
    return axios.get(`${BASE_URL}/p/${provinceCode}?depth=2`);
  },

  // Lấy danh sách phường/xã theo mã quận
  getWardsByDistrictCode(districtCode) {
    return axios.get(`${BASE_URL}/d/${districtCode}?depth=2`);
  },

  // Lấy tất cả dữ liệu (tỉnh + quận + phường) - depth=3
  getAllWithDetails() {
    return axios.get(`${BASE_URL}/p/?depth=3`);
  },
};

export default ProvinceService;
