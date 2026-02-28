# Hướng dẫn sử dụng AddressSlice và AddressService

## 📦 Đã tạo các file:

1. **`src/service/AddressService.js`** - Service để gọi API backend
2. **`src/redux/slices/AddressSlice.js`** - Redux slice quản lý state địa chỉ
3. **`src/redux/store.js`** - Đã thêm addressReducer vào store

## 🎯 Cấu trúc AddressRequest (theo backend):

```javascript
{
  accountId: number,        // ID của account
  fullName: string,         // Họ và tên
  phoneNumber: string,      // Số điện thoại
  addressLine: string,      // Địa chỉ chi tiết
  ward: string,            // Phường/Xã (optional)
  district: string,        // Quận/Huyện
  city: string,            // Tỉnh/Thành phố
  postalCode: string,      // Mã bưu điện (optional)
  type: "HOME" | "OFFICE" | "OTHER",  // Loại địa chỉ
  isDefault: boolean       // Có phải địa chỉ mặc định không
}
```

## 📝 Cách sử dụng trong Component:

### 1. Import các thứ cần thiết:

```javascript
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_ADDRESSES,
  FETCH_DEFAULT_ADDRESS,
  CREATE_ADDRESS,
  UPDATE_ADDRESS,
  SET_DEFAULT_ADDRESS,
  DELETE_ADDRESS,
  selectAddresses,
  selectDefaultAddress,
  selectSelectedAddress,
  selectAddressLoading,
  setSelectedAddress,
} from "../redux/slices/AddressSlice";
```

### 2. Lấy danh sách địa chỉ:

```javascript
const dispatch = useDispatch();
const accountId = useSelector((state) => state.auth.accountId);
const addresses = useSelector(selectAddresses);
const defaultAddress = useSelector(selectDefaultAddress);
const loading = useSelector(selectAddressLoading);

useEffect(() => {
  if (accountId) {
    dispatch(FETCH_ADDRESSES(accountId));
    dispatch(FETCH_DEFAULT_ADDRESS(accountId));
  }
}, [accountId, dispatch]);
```

### 3. Tạo địa chỉ mới:

```javascript
const handleCreateAddress = async () => {
  const addressRequest = {
    accountId: accountId,
    fullName: "Nguyễn Văn A",
    phoneNumber: "0912345678",
    addressLine: "123 Đường ABC",
    ward: "Phường 1",
    district: "Quận 1",
    city: "TP. Hồ Chí Minh",
    postalCode: "700000",
    type: "HOME",
    isDefault: false,
  };

  try {
    await dispatch(CREATE_ADDRESS(addressRequest)).unwrap();
    message.success("Thêm địa chỉ thành công!");
  } catch (error) {
    message.error(error || "Thêm địa chỉ thất bại!");
  }
};
```

### 4. Cập nhật địa chỉ:

```javascript
const handleUpdateAddress = async (addressId) => {
  const addressRequest = {
    accountId: accountId,
    fullName: "Nguyễn Văn B",
    phoneNumber: "0987654321",
    addressLine: "456 Đường XYZ",
    ward: "Phường 2",
    district: "Quận 2",
    city: "TP. Hồ Chí Minh",
    postalCode: "700000",
    type: "OFFICE",
    isDefault: false,
  };

  try {
    await dispatch(UPDATE_ADDRESS({ addressId, addressRequest })).unwrap();
    message.success("Cập nhật địa chỉ thành công!");
  } catch (error) {
    message.error(error || "Cập nhật địa chỉ thất bại!");
  }
};
```

### 5. Đặt địa chỉ làm mặc định:

```javascript
const handleSetDefault = async (addressId) => {
  try {
    await dispatch(SET_DEFAULT_ADDRESS(addressId)).unwrap();
    message.success("Đã đặt làm địa chỉ mặc định!");
  } catch (error) {
    message.error(error || "Đặt địa chỉ mặc định thất bại!");
  }
};
```

### 6. Xóa địa chỉ:

```javascript
const handleDeleteAddress = async (addressId) => {
  try {
    await dispatch(DELETE_ADDRESS(addressId)).unwrap();
    message.success("Xóa địa chỉ thành công!");
  } catch (error) {
    message.error(error || "Xóa địa chỉ thất bại!");
  }
};
```

### 7. Chọn địa chỉ (local state):

```javascript
const handleSelectAddress = (address) => {
  dispatch(setSelectedAddress(address));
};
```

## 🎨 Hiển thị danh sách địa chỉ:a

```javascript
{
  addresses.map((address) => (
    <div key={address.id} className="border p-4 rounded">
      <h3>{address.fullName}</h3>
      <p>📞 {address.phoneNumber}</p>
      <p>
        📍 {address.addressLine}, {address.ward}, {address.district},{" "}
        {address.city}
      </p>
      {address.postalCode && <p>📮 {address.postalCode}</p>}
      <p>🏷️ {address.type}</p>
      {address.isDefault && <span className="badge">Mặc định</span>}

      <button onClick={() => handleSetDefault(address.id)}>
        Đặt làm mặc định
      </button>
      <button onClick={() => handleDeleteAddress(address.id)}>Xóa</button>
    </div>
  ));
}
```

## ✅ Tóm tắt:

- ✅ **AddressService**: Gọi API backend
- ✅ **AddressSlice**: Quản lý state với Redux
- ✅ **Async Thunks**: FETCH, CREATE, UPDATE, SET_DEFAULT, DELETE
- ✅ **Selectors**: Dễ dàng lấy data từ store
- ✅ **Actions**: setSelectedAddress, clearSelectedAddress, clearAddresses

Bây giờ bạn có thể sử dụng hệ thống quản lý địa chỉ hoàn chỉnh! 🎉
