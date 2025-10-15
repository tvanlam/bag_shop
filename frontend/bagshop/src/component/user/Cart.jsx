import React, { useState } from "react";
import products from "../../data/products";

const Cart = () => {
  const [quantity, setQuantity] = useState(1);

  // Hàm chuyển đổi giá từ string sang number
  const parsePrice = (priceString) => {
    if (!priceString) return 0;
    // Loại bỏ dấu phẩy và chuyển thành số
    return parseInt(priceString.toString().replace(/,/g, "")) || 0;
  };

  const totalPrice = (product) => parsePrice(product.price) * quantity;
  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12 ">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="cart-section">
          <p className="font-bold text-center">GIỎ HÀNG</p>
          <hr className="mb-6" />
          <table className="w-full table-auto  ">
            <thead className="text-gray-600 text-center">
              <th className="px-4 py-2">Hình ảnh</th>
              <th className="px-4 py-2">Sản phẩm</th>
              <th className="px-4 py-2">Giá</th>
              <th className="px-4 py-2">Số lượng</th>
              <th className="px-4 py-2">Tổng</th>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product, index) => {
                  return (
                    <tr key={index}>
                      <td className="px-4 py-2 text-center">
                        <img
                          src={product.mainImage || "default-image.jpg"}
                          alt={product.name || "Sản phẩm"}
                          className="w-16 h-16 object-cover mx-auto"
                        />
                      </td>
                      <td className="px-4 py-2 ">
                        <p>{product.name || "Tên sản phẩm"}</p>
                        <p>{product.category || "Danh mục"}</p>
                        <p>
                          {product.colors || "Không có màu"},{" "}
                          {product.sizes || "Không có kích thước"}
                        </p>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <p>
                          {parsePrice(product.price).toLocaleString("vi-VN")} ₫
                        </p>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex items-center justify-center space-x-3">
                          <button
                            onClick={() => handleQuantityChange(-1)}
                            className="w-10 h-10 rounded-full"
                          >
                            -
                          </button>
                          <p>{quantity}</p>
                          <button
                            onClick={() => handleQuantityChange(1)}
                            className="w-10 h-10 rounded-full"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center">
                        {totalPrice(product).toLocaleString("vi-VN")} ₫
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4">
                    Giỏ hàng trống
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <hr className="mb-6" />
        </div>
      </div>
    </div>
  );
};

export default Cart;
