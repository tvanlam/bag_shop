# 📋 Danh sách 34 Tỉnh Thành Mới - Nghị quyết 202/2025/QH15

## 📅 Thông tin chung:
- **Ngày thông qua:** 12/6/2025
- **Có hiệu lực từ:** 01/7/2025
- **Văn bản:** Nghị quyết 202/2025/QH15 về việc sắp xếp đơn vị hành chính cấp tỉnh
- **Kết quả:** Sáp nhập từ 63 tỉnh thành xuống còn **34 tỉnh thành**
- **Cấu trúc:** 28 tỉnh + 6 thành phố trực thuộc trung ương

---

## 🗺️ Danh sách 34 tỉnh thành mới:

### I. 11 Tỉnh/Thành không thực hiện sáp nhập:

| STT | Tên Tỉnh/Thành | Mã Code |
|-----|----------------|---------|
| 1   | Hà Nội         | 1       |
| 2   | Huế            | 46      |
| 3   | Cao Bằng       | 4       |
| 4   | Điện Biên      | 11      |
| 5   | Hà Tĩnh        | 42      |
| 6   | Lai Châu       | 12      |
| 7   | Lạng Sơn       | 20      |
| 8   | Nghệ An        | 40      |
| 9   | Quảng Ninh     | 22      |
| 10  | Thanh Hóa      | 38      |
| 11  | Sơn La         | 14      |

### II. 23 Tỉnh/Thành mới sau sáp nhập:

| STT | Tên Tỉnh/Thành Mới | Các Tỉnh Được Sáp Nhập | Mã Code | Diện tích (km²) | Dân số |
|-----|-------------------|------------------------|---------|-----------------|--------|
| 1   | An Giang          | An Giang + Kiên Giang  | 89      | 9.888,91        | 4.952.238 |
| 2   | Bắc Ninh          | Bắc Ninh + Bắc Giang   | 27      | 4.718,6         | 3.619.433 |
| 3   | Cà Mau            | Cà Mau + Bạc Liêu      | 96      | 7.942,39        | 2.606.672 |
| 4   | Đắk Lắk           | Đắk Lắk + Phú Yên      | 66      | 18.096,40       | 3.346.853 |
| 5   | Đồng Nai          | Đồng Nai + Bình Phước  | 75      | 12.737,18       | 4.491.408 |
| 6   | Đồng Tháp         | Đồng Tháp + Tiền Giang | 87      | 5.938,64        | 4.370.046 |
| 7   | Gia Lai           | Gia Lai + Bình Định    | 64      | 21.576,53       | 3.583.693 |
| 8   | Hưng Yên          | Hưng Yên + Thái Bình   | 33      | 2.514,81        | 3.567.943 |
| 9   | Khánh Hòa         | Khánh Hòa + Ninh Thuận | 56      | 8.555,86        | 2.243.554 |
| 10  | Lào Cai           | Lào Cai + Yên Bái      | 10      | 13.256,92       | 1.778.785 |
| 11  | Lâm Đồng          | Lâm Đồng + Đắk Nông + Bình Thuận | 68 | 24.233,07 | 3.872.999 |
| 12  | Ninh Bình         | Ninh Bình + Hà Nam + Nam Định | 37 | 3.942,62  | 4.412.264 |
| 13  | Phú Thọ           | Phú Thọ + Vĩnh Phúc + Hòa Bình | 25 | 9.361,38 | 4.022.638 |
| 14  | Quảng Ngãi        | Quảng Ngãi + Kon Tum   | 51      | 14.832,55       | 2.161.755 |
| 15  | Quảng Trị         | Quảng Trị + Quảng Bình | 45      | 12.700          | 1.870.845 |
| 16  | Tây Ninh          | Tây Ninh + Long An     | 72      | 8.536,44        | 3.254.170 |
| 17  | Thái Nguyên       | Thái Nguyên + Bắc Kạn  | 19      | 8.375,21        | 1.799.489 |
| 18  | Tuyên Quang       | Hà Giang + Tuyên Quang | 8       | 13.795,50       | 1.865.270 |
| 19  | TP. Đà Nẵng       | Đà Nẵng + Quảng Nam    | 48      | 11.859,59       | 3.065.628 |
| 20  | TP. Cần Thơ       | Cần Thơ + Sóc Trăng + Hậu Giang | 92 | 6.360,83 | 4.199.824 |
| 21  | TP. Hải Phòng     | Hải Phòng + Hải Dương  | 31      | 3.194,72        | 4.664.124 |
| 22  | TP. Hồ Chí Minh   | TP.HCM + Bà Rịa - Vũng Tàu + Bình Dương | 79 | 6.772,59 | 14.002.598 |
| 23  | Vĩnh Long         | Vĩnh Long + Bến Tre + Trà Vinh | 86 | 6.296,20 | 4.257.581 |

---

## 💻 Cách sử dụng trong code:

### Import service:
```javascript
import ProvinceService from "../service/ProvinceService";
```

### Lấy danh sách 34 tỉnh thành mới:
```javascript
const response = await ProvinceService.getMajorProvinces();
console.log(response.data); // Array of 34 provinces
```

### Lấy quận/huyện của tỉnh:
```javascript
const response = await ProvinceService.getDistrictsByProvinceCode(provinceCode);
console.log(response.data.districts);
```

---

## 📌 Lưu ý:
- Danh sách này được cập nhật theo **Nghị quyết 202/2025/QH15**
- Các tỉnh được sáp nhập vẫn giữ nguyên **mã code cũ** của tỉnh chính
- Quận/huyện và phường/xã vẫn được lấy từ API theo mã tỉnh
- Nếu cần lấy tất cả 63 tỉnh, sử dụng `getAllProvinces()` thay vì `getMajorProvinces()`

---

## 🔗 Tham khảo:
- [Nghị quyết 202/2025/QH15](https://thuvienphapluat.vn/banan/tin-tuc/danh-sach-34-tinh-thanh-moi-nhat-tu-1262025-theo-nghi-quyet-2022025qh15-16464)
- [API Địa giới hành chính VN](https://provinces.open-api.vn/)

