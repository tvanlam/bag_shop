import axios from "axios";

// API miễn phí cho địa giới hành chính Việt Nam
const BASE_URL = "https://provinces.open-api.vn/api/";

// Danh sách 34 tỉnh thành mới theo Nghị quyết 202/2025/QH15
// (Có hiệu lực từ 01/7/2025 - Ngày sáp nhập: 12/6/2025)
// Bao gồm: 28 tỉnh + 6 thành phố trực thuộc trung ương
const MAJOR_PROVINCE_CODES = [
  // 11 tỉnh/thành không sáp nhập
  1, // Hà Nội
  46, // Huế
  4, // Cao Bằng
  11, // Điện Biên
  42, // Hà Tĩnh
  12, // Lai Châu
  20, // Lạng Sơn
  40, // Nghệ An
  22, // Quảng Ninh
  38, // Thanh Hóa
  14, // Sơn La

  // 23 tỉnh/thành mới sau sáp nhập
  89, // An Giang (An Giang + Kiên Giang)
  27, // Bắc Ninh (Bắc Ninh + Bắc Giang)
  96, // Cà Mau (Cà Mau + Bạc Liêu)
  66, // Đắk Lắk (Đắk Lắk + Phú Yên)
  75, // Đồng Nai (Đồng Nai + Bình Phước)
  87, // Đồng Tháp (Đồng Tháp + Tiền Giang)
  64, // Gia Lai (Gia Lai + Bình Định)
  33, // Hưng Yên (Hưng Yên + Thái Bình)
  56, // Khánh Hòa (Khánh Hòa + Ninh Thuận)
  10, // Lào Cai (Lào Cai + Yên Bái)
  68, // Lâm Đồng (Lâm Đồng + Đắk Nông + Bình Thuận)
  37, // Ninh Bình (Ninh Bình + Hà Nam + Nam Định)
  25, // Phú Thọ (Phú Thọ + Vĩnh Phúc + Hòa Bình)
  51, // Quảng Ngãi (Quảng Ngãi + Kon Tum)
  45, // Quảng Trị (Quảng Trị + Quảng Bình)
  72, // Tây Ninh (Tây Ninh + Long An)
  19, // Thái Nguyên (Thái Nguyên + Bắc Kạn)
  8, // Tuyên Quang (Hà Giang + Tuyên Quang)
  48, // TP. Đà Nẵng (Đà Nẵng + Quảng Nam)
  92, // TP. Cần Thơ (Cần Thơ + Sóc Trăng + Hậu Giang)
  31, // TP. Hải Phòng (Hải Phòng + Hải Dương)
  79, // TP. Hồ Chí Minh (TP.HCM + Bà Rịa - Vũng Tàu + Bình Dương)
  86, // Vĩnh Long (Vĩnh Long + Bến Tre + Trà Vinh)
];

const ProvinceService = {
  // Lấy danh sách tất cả tỉnh/thành phố (63 tỉnh)
  getAllProvinces() {
    return axios.get(`${BASE_URL}/p/`);
  },

  // Lấy danh sách 34 tỉnh thành mới theo Nghị quyết 202/2025/QH15
  async getMajorProvinces() {
    const response = await axios.get(`${BASE_URL}/p/`);
    // Lọc chỉ lấy 34 tỉnh thành mới
    const majorProvinces = response.data.filter((province) =>
      MAJOR_PROVINCE_CODES.includes(province.code)
    );
    return { ...response, data: majorProvinces };
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
