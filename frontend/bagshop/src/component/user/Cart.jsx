import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  DELETE_CART,
  FETCH_CARTS,
  UPDATE_CART,
  setTotalQuantity,
} from "../../redux/slices/CartSlice";
import { FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.carts);
  const accountId = useSelector((state) => state.auth.accountId);
  const loading = useSelector((state) => state.cart.loading);

  const [quantities, setQuantities] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (accountId) {
      dispatch(FETCH_CARTS(accountId));
    }
  }, [dispatch, accountId]);

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      const initialQuantities = cartItems.reduce((acc, item) => {
        acc[item.id] = item.quantity || 1;
        return acc;
      }, {});
      setQuantities(initialQuantities);
    } else {
      setQuantities({});
    }
  }, [cartItems]);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => {
      return sum + (quantities[item.id] || item.quantity || 1);
    }, 0);
    dispatch(setTotalQuantity(total));
  }, [quantities, cartItems, dispatch]);

  const parsePrice = (priceString) => {
    if (!priceString) return 0;
    return parseFloat(priceString.toString().replace(/,/g, "")) || 0;
  };

  const calculateTotalPrice = (item) => {
    return (
      parsePrice(item.priceAtAdd) * (quantities[item.id] || item.quantity || 1)
    );
  };

  const handleQuantityChange = async (itemId, change) => {
    if (!accountId || updating) return;

    setUpdating(true);

    const currentQuantity = quantities[itemId] || 1;
    const newQuantity = Math.max(1, currentQuantity + change);

    // Optimistic update
    setQuantities((prev) => ({
      ...prev,
      [itemId]: newQuantity,
    }));

    try {
      const cartRequest = {
        accountId: parseInt(accountId),
        items: cartItems.map((item) => ({
          productId: parseInt(item.productId),
          quantity:
            item.id === itemId
              ? newQuantity
              : quantities[item.id] || item.quantity || 1,
        })),
      };

      console.log(" REQUEST:", JSON.stringify(cartRequest, null, 2)); // DEBUG

      await dispatch(
        UPDATE_CART({
          accountId: parseInt(accountId),
          cartRequest,
        })
      ).unwrap();

      toast.success("Cập nhật số lượng thành công!", {
        position: "top-right",
        autoClose: 1500,
      });
    } catch (error) {
      console.error(" ERROR:", error); // DEBUG

      // Rollback
      setQuantities((prev) => ({
        ...prev,
        [itemId]: currentQuantity,
      }));

      toast.error(`Lỗi: ${error.message || "Cập nhật thất bại!"}`, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const confirmDelete = async () => {
    if (!accountId || !selectedItem) return;

    setUpdating(true);
    try {
      await dispatch(
        DELETE_CART({
          accountId: parseInt(accountId),
          cartItemId: parseInt(selectedItem.id),
        })
      ).unwrap();

      // Re-fetch carts to ensure frontend matches backend canonical state
      await dispatch(FETCH_CARTS(parseInt(accountId)));

      toast.success("Xóa sản phẩm thành công!", {
        position: "top-center",
        autoClose: 2000,
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Xóa sản phẩm thất bại!", {
        position: "top-center",
        autoClose: 2000,
      });
    } finally {
      setUpdating(false);
      setIsOpen(false);
      setSelectedItem(null);
    }
  };

  const cancelDelete = () => {
    setIsOpen(false);
    setSelectedItem(null);
  };

  const calculateGrandTotal = () => {
    if (!cartItems || cartItems.length === 0) return 0;
    return cartItems.reduce((total, item) => {
      return total + calculateTotalPrice(item);
    }, 0);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <p className="font-bold text-center text-2xl mb-6">GIỎ HÀNG</p>
        <hr className="mb-6" />

        {loading && cartItems.length === 0 ? (
          <div className="text-center py-12">Đang tải...</div>
        ) : cartItems.length > 0 ? (
          <>
            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr className="text-gray-600 text-sm">
                  <th className="px-4 py-3">Hình ảnh</th>
                  <th className="px-4 py-3">Sản phẩm</th>
                  <th className="px-4 py-3 text-center">Giá</th>
                  <th className="px-4 py-3 text-center">Số lượng</th>
                  <th className="px-4 py-3 text-center">Tổng</th>
                  <th className="px-4 py-3 text-center">Xóa</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="px-4 py-4 text-center">
                      <img
                        src={item.thumbnail || "default-image.jpg"}
                        alt={item.productName}
                        className="w-16 h-16 object-cover mx-auto rounded"
                      />
                    </td>
                    <td className="px-4 py-4">{item.productName}</td>
                    <td className="px-4 py-4 text-center">
                      <span className="text-sm text-gray-600">
                        {formatCurrency(parsePrice(item.priceAtAdd))}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-center">
                      <div className="flex items-center justify-center space-x-3">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          disabled={updating || (quantities[item.id] || 1) <= 1}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${"bg-gray-200 hover:bg-gray-300"}`}
                        >
                          -
                        </button>

                        <p className="w-8 text-center font-semibold">
                          {quantities[item.id] || item.quantity}
                        </p>

                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          disabled={updating}
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            updating
                              ? "bg-gray-200 cursor-not-allowed"
                              : "bg-gray-200 hover:bg-gray-300"
                          }`}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-center">
                      {calculateTotalPrice(item).toLocaleString("vi-VN")} ₫
                    </td>
                    <td className="px-4 py-4 text-center">
                      <button
                        onClick={() => handleDeleteClick(item)}
                        disabled={updating}
                        className="text-red-500 hover:text-red-700 p-1 disabled:opacity-50"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <hr className="my-6" />
            <div className="flex justify-end">
              <div className="w-full md:w-1/3 bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between mb-4 text-xl font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-blue-600">
                    {calculateGrandTotal().toLocaleString("vi-VN")} ₫
                  </span>
                </div>
                <button
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  disabled={updating}
                >
                  {updating ? "Đang cập nhật..." : "THANH TOÁN"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Giỏ hàng trống</p>
          </div>
        )}
      </div>

      {/* Modal Xóa */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80">
            <h2 className="text-lg mb-4 text-center">Xóa sản phẩm?</h2>
            <p className="text-center text-gray-600 mb-6">
              {selectedItem?.productName}
            </p>
            <div className="flex space-x-3 justify-center">
              <button
                onClick={confirmDelete}
                disabled={loading}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
              >
                Xóa
              </button>
              <button
                onClick={cancelDelete}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
