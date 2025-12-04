# 🗺️ Hướng dẫn sử dụng API Địa giới hành chính Việt Nam

## 📦 Đã tích hợp:

### 1. **ProvinceService** (`src/service/ProvinceService.js`)
Service để gọi API địa giới hành chính Việt Nam từ **provinces.open-api.vn**

### 2. **Checkout Component** (`src/component/user/Checkout.jsx`)
Đã cập nhật form địa chỉ với dropdown cascade cho Tỉnh/TP → Quận/Huyện → Phường/Xã

## 🌐 API Endpoint:

**Base URL:** `https://provinces.open-api.vn/api`

### Các endpoint có sẵn:

1. **Lấy tất cả tỉnh/thành phố (63 tỉnh):**
   ```
   GET /p/
   ```

2. **Lấy chi tiết tỉnh + quận/huyện:**
   ```
   GET /p/{province_code}?depth=2
   ```

3. **Lấy chi tiết quận + phường/xã:**
   ```
   GET /d/{district_code}?depth=2
   ```

4. **Lấy tất cả (tỉnh + quận + phường):**
   ```
   GET /p/?depth=3
   ```

## 🎯 Cách hoạt động trong Checkout:

### 1. **Khi component mount:**
- Tự động fetch danh sách 63 tỉnh/thành phố
- Hiển thị trong dropdown "Tỉnh/TP"

### 2. **Khi user chọn Tỉnh/TP:**
- Lưu mã tỉnh (province code)
- Fetch danh sách quận/huyện của tỉnh đó
- Enable dropdown "Quận/Huyện"
- Reset dropdown "Phường/Xã"

### 3. **Khi user chọn Quận/Huyện:**
- Lưu mã quận (district code)
- Fetch danh sách phường/xã của quận đó
- Enable dropdown "Phường/Xã"

### 4. **Khi user chọn Phường/Xã:**
- Lưu tên phường/xã vào state

## 📊 Cấu trúc dữ liệu:

### Province (Tỉnh/TP):
```json
{
  "code": 1,
  "name": "Thành phố Hà Nội",
  "name_en": "Ha Noi City",
  "full_name": "Thành phố Hà Nội",
  "full_name_en": "Ha Noi City",
  "code_name": "ha_noi"
}
```

### District (Quận/Huyện):
```json
{
  "code": 1,
  "name": "Quận Ba Đình",
  "name_en": "Ba Dinh District",
  "full_name": "Quận Ba Đình",
  "full_name_en": "Ba Dinh District",
  "code_name": "ba_dinh",
  "province_code": 1
}
```

### Ward (Phường/Xã):
```json
{
  "code": 1,
  "name": "Phường Phúc Xá",
  "name_en": "Phuc Xa Ward",
  "full_name": "Phường Phúc Xá",
  "full_name_en": "Phuc Xa Ward",
  "code_name": "phuc_xa",
  "district_code": 1
}
```

## 🎨 UI Features:

✅ **Cascade Dropdown:** Tỉnh → Quận → Phường
✅ **Auto-disable:** Quận/Phường bị disable cho đến khi chọn cấp trên
✅ **Auto-reset:** Khi đổi Tỉnh, tự động reset Quận và Phường
✅ **63 tỉnh thành:** Đầy đủ tất cả tỉnh/thành phố Việt Nam
✅ **Real-time data:** Dữ liệu được cập nhật từ API

## 🔧 State Management:

```javascript
// State lưu danh sách
const [provinces, setProvinces] = useState([]);      // 63 tỉnh
const [districts, setDistricts] = useState([]);      // Quận/huyện của tỉnh được chọn
const [wards, setWards] = useState([]);              // Phường/xã của quận được chọn

// State lưu lựa chọn hiện tại
const [selectedProvinceCode, setSelectedProvinceCode] = useState("");
const [selectedDistrictCode, setSelectedDistrictCode] = useState("");

// State lưu vào form (tên, không phải code)
const [newAddress, setNewAddress] = useState({
  city: "",      // Tên tỉnh/TP
  district: "",  // Tên quận/huyện
  ward: "",      // Tên phường/xã
  // ... các field khác
});
```

## 📝 Ví dụ sử dụng trong component khác:

```javascript
import ProvinceService from "../service/ProvinceService";

// Lấy danh sách tỉnh
const provinces = await ProvinceService.getAllProvinces();
console.log(provinces.data); // Array of 63 provinces

// Lấy quận/huyện của Hà Nội (code = 1)
const hanoi = await ProvinceService.getDistrictsByProvinceCode(1);
console.log(hanoi.data.districts); // Array of districts in Hanoi

// Lấy phường/xã của Quận Ba Đình (code = 1)
const baDinh = await ProvinceService.getWardsByDistrictCode(1);
console.log(baDinh.data.wards); // Array of wards in Ba Dinh
```

## 🚀 Lợi ích:

1. **Dữ liệu chính xác:** API chính thức từ Tổng cục Thống kê
2. **Miễn phí:** Không cần API key
3. **Đầy đủ:** 63 tỉnh/thành, hàng nghìn quận/huyện, phường/xã
4. **Cập nhật:** Dữ liệu được cập nhật thường xuyên
5. **UX tốt:** Cascade dropdown giúp user dễ chọn địa chỉ

## ⚠️ Lưu ý:

- API có thể bị chậm trong lần đầu load (do fetch từ server)
- Nên cache dữ liệu tỉnh/thành (ít thay đổi) để tăng performance
- Dropdown Quận/Phường sẽ bị disable nếu chưa chọn cấp trên
- Khi đổi Tỉnh, Quận và Phường sẽ tự động reset

---

**API Source:** https://provinces.open-api.vn/
**Documentation:** https://provinces.open-api.vn/api-docs/

