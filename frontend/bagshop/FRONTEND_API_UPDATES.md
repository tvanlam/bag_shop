# Frontend API Updates - Product & Variant Management

## Tóm tắt thay đổi

Đã cập nhật frontend để khớp với các endpoint API mới từ backend cho quản lý sản phẩm và biến thể (variants).

## 1. ProductService.js - Các thay đổi API endpoints

### Trước đây:

```javascript
createVariant(productRequest) {
  return axiosClient.post("product/createVariant", productVariantRequest)
}

updateProduct(variantId, productVariantRequest) {
  return axiosClient.put("product/update", productVariantRequest, {
    params: { id: variantId },
  });
}

updateVariant(variantId, productVariantRequest) {
  return axiosClient.put("product/updateVariant", productVariantRequest, {
    params: { id: variantId },
  });
}

deleteVariant(variantId) {
  return axiosClient.delete(`product/variant/${variantId}`);
}
```

### Sau khi cập nhật:

```javascript
createVariant(productId, productVariantRequest) {
  return axiosClient.post(`product/${productId}/variants`, productVariantRequest);
}

updateProduct(productId, productRequest) {
  return axiosClient.put(`product/update/${productId}`, productRequest);
}

updateVariant(productId, variantId, productVariantRequest) {
  return axiosClient.put(`product/${productId}/variants/${variantId}`, productVariantRequest);
}

deleteVariant(variantId) {
  return axiosClient.delete(`product/variants/${variantId}`);
}
```

## 2. ProductSlice.js - Các thay đổi Redux Actions

### CREATE_VARIANT

**Trước:**

```javascript
async (productVariantRequest, { rejectWithValue }) => {
  const response = await ProductService.createProduct(productVariantRequest);
};
```

**Sau:**

```javascript
async ({ productId, productVariantRequest }, { rejectWithValue }) => {
  const response = await ProductService.createVariant(
    productId,
    productVariantRequest,
  );
};
```

### UPDATE_VARIANT

**Trước:**

```javascript
async ({ variantId, productVariantRequest }, { rejectWithValue }) => {
  const response = await ProductService.updateVariant(
    variantId,
    productVariantRequest,
  );
};
```

**Sau:**

```javascript
async (
  { productId, variantId, productVariantRequest },
  { rejectWithValue },
) => {
  const response = await ProductService.updateVariant(
    productId,
    variantId,
    productVariantRequest,
  );
};
```

## 3. Cách sử dụng trong Components

### Tạo Variant mới:

```javascript
import { CREATE_VARIANT } from "../../redux/slices/ProductSlice";

// Trong component
const handleCreateVariant = (productId, variantData) => {
  dispatch(
    CREATE_VARIANT({
      productId: productId,
      productVariantRequest: {
        productId: productId,
        sku: variantData.sku,
        color: variantData.color,
        colorCode: variantData.colorCode,
        size: variantData.size,
        imageUrl: variantData.imageUrl,
        price: variantData.price,
        stockQuantity: variantData.stockQuantity,
      },
    }),
  );
};
```

### Cập nhật Variant:

```javascript
import { UPDATE_VARIANT } from "../../redux/slices/ProductSlice";

// Trong component
const handleUpdateVariant = (productId, variantId, variantData) => {
  dispatch(
    UPDATE_VARIANT({
      productId: productId,
      variantId: variantId,
      productVariantRequest: {
        price: variantData.price,
        stockQuantity: variantData.stockQuantity,
        imageUrl: variantData.imageUrl,
        colorCode: variantData.colorCode,
      },
    }),
  );
};
```

### Cập nhật Product:

```javascript
import { UPDATE_PRODUCT } from "../../redux/slices/ProductSlice";

// Trong component
const handleUpdateProduct = (productId, productData) => {
  dispatch(
    UPDATE_PRODUCT({
      productId: productId,
      productRequest: {
        name: productData.name,
        description: productData.description,
        basePrice: productData.basePrice,
        totalStockQuantity: productData.totalStockQuantity,
        images: productData.images,
        categoryId: productData.categoryId,
      },
    }),
  );
};
```

## 4. Backend API Endpoints (Tham khảo)

- `POST /product/create` - Tạo sản phẩm mới
- `POST /product/{productId}/variants` - Tạo variant cho sản phẩm
- `PUT /product/update/{productId}` - Cập nhật sản phẩm
- `PUT /product/{productId}/variants/{variantId}` - Cập nhật variant
- `DELETE /product/{productId}` - Xóa sản phẩm (set stock = 0)
- `DELETE /product/variants/{variantId}` - Xóa variant (set stock = 0)

## 5. Lưu ý quan trọng

1. **productId** bây giờ là bắt buộc khi tạo hoặc cập nhật variant
2. Backend tự động generate SKU nếu không được cung cấp: `{productId}-{COLOR}-{SIZE}`
3. Khi cập nhật variant, chỉ cần gửi các trường cần thay đổi (price, stockQuantity, imageUrl, colorCode)
4. Backend kiểm tra duplicate variant (cùng productId, color, size) khi tạo mới
5. Xóa sản phẩm/variant chỉ set stockQuantity = 0, không xóa khỏi database

## 6. Các file đã được cập nhật

- ✅ `frontend/bagshop/src/service/ProductService.js`
- ✅ `frontend/bagshop/src/redux/slices/ProductSlice.js`

## 7. Các file cần tạo/cập nhật tiếp theo (nếu cần)

- [ ] Form tạo variant mới (admin)
- [ ] Form cập nhật variant (admin)
- [ ] Form cập nhật sản phẩm (admin)
- [ ] Component quản lý variants trong ProductDetails
