# VNPay Integration Troubleshooting

## Lỗi: "Website này chưa được phê duyệt"

### Nguyên nhân:
VNPay Sandbox yêu cầu **returnUrl phải được đăng ký trước** với TMN Code (Terminal Code).

### Giải pháp:

#### Option 1: Sử dụng localhost (Recommended cho development)
```properties
vnp.returnUrl=http://localhost:8080/vnpay-payment/get
```

**Ưu điểm:**
- Không cần đăng ký với VNPay
- Test nhanh trên local

**Nhược điểm:**
- Không test được từ mobile/external devices

#### Option 2: Đăng ký ngrok URL với VNPay
1. Truy cập VNPay Merchant Portal
2. Đăng ký returnUrl: `https://your-ngrok-url.ngrok-free.app/vnpay-payment/get`
3. Đợi VNPay phê duyệt (có thể mất vài giờ)

#### Option 3: Sử dụng VNPay Demo Account
VNPay cung cấp demo account với config sẵn:
- TMN Code: `DEMOV210` (hoặc check tài liệu VNPay mới nhất)
- Hash Secret: (check tài liệu VNPay)
- Return URL: Phải đăng ký trước

## Kiểm tra config hiện tại:

### 1. Test config endpoint:
```bash
GET http://localhost:8080/vnpay-payment/config-test
```

### 2. Kiểm tra logs:
```bash
# Xem logs khi tạo payment
tail -f logs/application.log | grep -i vnpay
```

### 3. Test payment với request đúng:
```json
POST http://localhost:8080/vnpay-payment/create
Content-Type: application/json

{
    "total": 600000,
    "orderId": "1"
    // returnUrl sẽ dùng giá trị mặc định từ config
}
```

Hoặc override returnUrl:
```json
{
    "total": 600000,
    "orderId": "1",
    "returnUrl": "http://localhost:8080/vnpay-payment/get"
}
```

## Các lỗi thường gặp:

### 1. "Không tìm thấy website"
- **Nguyên nhân:** Sai TMN Code hoặc Hash Secret
- **Giải pháp:** Kiểm tra lại credentials từ VNPay

### 2. "Website chưa được phê duyệt"
- **Nguyên nhân:** returnUrl chưa được đăng ký
- **Giải pháp:** Dùng localhost hoặc đăng ký URL với VNPay

### 3. "Chữ ký không hợp lệ"
- **Nguyên nhân:** Sai Hash Secret hoặc encoding
- **Giải pháp:** Kiểm tra Hash Secret và đảm bảo dùng UTF-8 encoding

## Testing với VNPay Sandbox:

### Thẻ test:
- Số thẻ: `9704198526191432198`
- Tên chủ thẻ: `NGUYEN VAN A`
- Ngày phát hành: `07/15`
- Mật khẩu OTP: `123456`

### Flow test:
1. Gọi API `/vnpay-payment/create` → nhận `paymentUrl`
2. Mở `paymentUrl` trên browser
3. Chọn phương thức thanh toán
4. Nhập thông tin thẻ test
5. VNPay redirect về `returnUrl` với kết quả
6. Backend xử lý callback và update order status

## Debug checklist:

- [ ] TMN Code đúng
- [ ] Hash Secret đúng
- [ ] returnUrl đã được đăng ký với VNPay
- [ ] Encoding sử dụng UTF-8
- [ ] Amount > 0 và là số nguyên
- [ ] OrderId là string hợp lệ
- [ ] Server có thể nhận request từ VNPay (không bị firewall block)

## Liên hệ hỗ trợ:
- VNPay Hotline: 1900 55 55 77
- Email: support@vnpay.vn
- Tài liệu: https://sandbox.vnpayment.vn/apis/docs/

