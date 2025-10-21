import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FETCH_CARTS } from "../../redux/slices/CartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.carts);
  const accountId = useSelector((state) => state.auth.accountId);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    if (accountId) {
      dispatch(FETCH_CARTS(accountId));
    }
  }, [dispatch, accountId]);

  useEffect(() => {
    // Khởi tạo state với object lưu số lượng cho từng sản phẩm từ Redux
    if (cartItems && cartItems.length > 0) {
      const initialQuantities = cartItems.reduce((acc, item, index) => {
        acc[index] = item.quantity || 1;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    }
  }, [cartItems]);

  // Hàm chuyển đổi giá từ string sang number
  const parsePrice = (priceString) => {
    if (!priceString) return 0;
    return parseFloat(priceString.toString().replace(/,/g, "")) || 0;
  };

  const calculateTotalPrice = (item, index) => {
    return (
      parsePrice(item.priceAtAdd) * (quantities[index] || item.quantity || 1)
    );
  };

  const handleQuantityChange = (index, change) => {
    setQuantities((prev) => ({
      ...prev,
      [index]: Math.max(1, (prev[index] || 1) + change),
    }));
  };

  const calculateGrandTotal = () => {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems.reduce((total, item, index) => {
      return total + calculateTotalPrice(item, index);
    }, 0);
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
              {cartItems && cartItems.length > 0 ? (
                cartItems.map((item, index) => {
                  return (
                    <tr key={item.id || index}>
                      <td className="px-4 py-2 text-center">
                        <img
                          src={item.thumbnail || "default-image.jpg"}
                          alt={item.productName || "Sản phẩm"}
                          className="w-16 h-16 object-cover mx-auto"
                        />
                      </td>
                      <td className="px-4 py-2 ">
                        <p>{item.productName || "Tên sản phẩm"}</p>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <p>
                          {parsePrice(item.priceAtAdd).toLocaleString("vi-VN")}{" "}
                          ₫
                        </p>
                      </td>
                      <td className="px-4 py-2 text-center">
                        <div className="flex items-center justify-center space-x-3">
                          <button
                            onClick={() => handleQuantityChange(index, -1)}
                            className="w-10 h-10 rounded-full"
                          >
                            -
                          </button>
                          <p>{quantities[index] || item.quantity}</p>
                          <button
                            onClick={() => handleQuantityChange(index, 1)}
                            className="w-10 h-10 rounded-full"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center">
                        {calculateTotalPrice(item, index).toLocaleString(
                          "vi-VN"
                        )}{" "}
                        ₫
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

          {/* Tổng tiền */}
          {cartItems && cartItems.length > 0 && (
            <div className="flex justify-end mb-6">
              <div className="w-full md:w-1/3">
                <div className="flex justify-between mb-4 text-lg font-semibold">
                  <span>Tổng cộng:</span>
                  <span>{calculateGrandTotal().toLocaleString("vi-VN")} ₫</span>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                  Thanh toán
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
