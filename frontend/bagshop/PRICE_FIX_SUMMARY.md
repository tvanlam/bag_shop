# Price Fix Summary - ProductDetails.jsx

## 🐛 Vấn đề

**Giá trong giỏ hàng không khớp với giá hiển thị trên trang sản phẩm**

### Nguyên nhân:

1. **Backend lưu giá theo variant** - Mỗi variant có giá riêng (`variant.price`)
2. **Frontend hiển thị giá của product** - Đang hiển thị `product.basePrice`
3. **Không gửi productVariantId** - Request thiếu thông tin variant
4. **Không có UI chọn variant** - User không thể chọn màu sắc/kích thước

### Kết quả:
- Backend lấy giá từ variant (ví dụ: 500,000đ)
- Frontend hiển thị giá từ product (ví dụ: 450,000đ)
- **Giá không khớp!** ❌

## ✅ Giải pháp

Đã cập nhật **ProductDetails.jsx** để:

### 1. Thêm State Management cho Variant

```jsx
const [selectedVariant, setSelectedVariant] = useState(null);
const [selectedColor, setSelectedColor] = useState(null);
const [selectedSize, setSelectedSize] = useState(null);
```

### 2. Auto-select Variant đầu tiên

```jsx
useEffect(() => {
  if (currentProduct?.productVariants?.length > 0) {
    const firstVariant = currentProduct.productVariants[0];
    setSelectedVariant(firstVariant);
    setSelectedColor(firstVariant.color);
    setSelectedSize(firstVariant.size);
  }
}, [currentProduct]);
```

### 3. Hiển thị Giá từ Variant

**Trước:**
```jsx
<p className="text-2xl text-gray-800 font-bold mb-4">
  {formatVND(currentProduct.basePrice || currentProduct.price)}
</p>
```

**Sau:**
```jsx
<p className="text-2xl text-gray-800 font-bold mb-4">
  {selectedVariant
    ? formatVND(selectedVariant.price)
    : formatVND(currentProduct.basePrice || currentProduct.price)}
</p>
```

### 4. Thêm UI Chọn Variant

**Color Selection:**
- Hiển thị tất cả màu sắc có sẵn
- Color swatch với `colorCode`
- Active state khi được chọn

**Size Selection:**
- Hiển thị kích thước tương ứng với màu đã chọn
- Active state khi được chọn

**Selected Variant Info:**
- Hiển thị variant đã chọn
- Hiển thị giá của variant
- Hiển thị tồn kho của variant

### 5. Gửi productVariantId khi Add to Cart

**Trước:**
```jsx
const cartRequest = {
  items: [{
    productId: currentProduct.id,
    quantity: quantity,
  }],
};
```

**Sau:**
```jsx
const cartRequest = {
  items: [{
    productId: currentProduct.id,
    productVariantId: selectedVariant.id,  // ✅ Thêm
    quantity: quantity,
  }],
};
```

### 6. Validation

```jsx
// Kiểm tra variant đã được chọn chưa
if (!selectedVariant) {
  toast.error("Vui lòng chọn màu sắc và kích thước!");
  return;
}

// Kiểm tra variant còn hàng không
if (selectedVariant.stockQuantity === 0) {
  toast.error("Sản phẩm này hiện đã hết hàng!");
  return;
}
```

### 7. Smart Button States

```jsx
<button
  onClick={handleAddToCart}
  disabled={
    !selectedVariant ||
    (selectedVariant && selectedVariant.stockQuantity === 0)
  }
>
  {!selectedVariant
    ? "Vui lòng chọn màu sắc và kích thước"
    : selectedVariant.stockQuantity > 0
      ? "Thêm vào giỏ hàng"
      : "Hết hàng"}
</button>
```

## 🎯 Kết quả

### Trước khi fix:
- ❌ Giá hiển thị: 450,000đ (basePrice)
- ❌ Giá trong giỏ: 500,000đ (variant.price)
- ❌ **KHÔNG KHỚP!**

### Sau khi fix:
- ✅ Giá hiển thị: 500,000đ (selectedVariant.price)
- ✅ Giá trong giỏ: 500,000đ (selectedVariant.price)
- ✅ **KHỚP!**

## 📊 Flow mới

```
1. User vào trang ProductDetails
2. Auto-select variant đầu tiên
3. Hiển thị giá của variant đã chọn
4. User có thể chọn màu/size khác
5. Giá tự động cập nhật theo variant
6. Click "Thêm vào giỏ hàng"
7. Gửi productId + productVariantId + quantity
8. Backend lưu với giá của variant
9. Giỏ hàng hiển thị đúng giá
```

## ✨ Features mới

- ✅ Variant selection UI (color + size)
- ✅ Color swatch với colorCode
- ✅ Real-time price update
- ✅ Stock validation per variant
- ✅ Smart button states
- ✅ Auto-selection first variant
- ✅ Proper error messages

---

**Last Updated:** 2026-02-02
**Status:** ✅ Fixed - Giá đã khớp giữa product page và cart

