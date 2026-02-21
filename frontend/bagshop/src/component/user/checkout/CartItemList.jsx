import React from "react";

/**
 * Component hiển thị danh sách sản phẩm trong giỏ hàng
 */
const CartItemList = ({ cartItems, parsePrice }) => {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return (
      <div className="mb-4 max-h-60 overflow-y-auto">
        <p className="text-sm text-gray-500 text-center py-4">Giỏ hàng trống</p>
      </div>
    );
  }

  return (
    <div className="mb-4 max-h-60 overflow-y-auto">
      {cartItems.map((item) => {
        const itemKey = item.itemId || item.id || item.productId;
        const price = parsePrice(item.priceAtAdd || item.price);
        const quantity = item.quantity || 1;

        return (
          <div key={itemKey} className="flex gap-3 mb-3 pb-3 border-b">
            <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0">
              {item.thumbnail && (
                <img
                  src={item.thumbnail}
                  alt={item.productName}
                  className="w-full h-full object-cover rounded"
                />
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{item.productName}</p>
              {(item.color || item.size) && (
                <p className="text-xs text-gray-500">
                  {item.color && <span>Màu: {item.color}</span>}
                  {item.color && item.size && <span> • </span>}
                  {item.size && <span>Size: {item.size}</span>}
                </p>
              )}
              <p className="text-xs text-gray-500">Số lượng: {quantity}</p>
              <p className="text-sm font-semibold text-gray-700">
                {(price * quantity).toLocaleString("vi-VN")}đ
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartItemList;
