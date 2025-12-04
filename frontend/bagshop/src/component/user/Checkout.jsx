import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import logoBag from "../../assets/logoBag.png";
import vnpayLogo from "../../assets/vnpayLogo.png";
import momoLogo from "../../assets/momoLogo.png";
import creditCardLogo from "../../assets/creditCardLogo.png";
import {
  CREATE_ORDER,
  clearCheckoutState,
  clearErrorState,
} from "../../redux/slices/CheckoutSlice";
import { FETCH_ACCOUNT } from "../../redux/slices/AccountSlice";
import { FETCH_CARTS } from "../../redux/slices/CartSlice";
import CheckoutService from "../../service/CheckoutService";
import ProvinceService from "../../service/ProvinceService";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shippingRef = useRef(null);

  // Redux state
  const accountId = useSelector((state) => state.auth.accountId);
  const account = useSelector((state) => state.account.account);
  const cartItems = useSelector((state) => state.cart.carts);
  const { loading, error, createdOrder } = useSelector(
    (state) => state.checkout
  );

  // Local state
  const [selectedAddressOption, setSelectedAddressOption] = useState("default");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState("standard");
  const [promoCode, setPromoCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    district: "",
    ward: "",
    phoneNumber: "",
    saveAddress: false,
  });

  // State cho địa giới hành chính
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvinceCode, setSelectedProvinceCode] = useState("");
  const [selectedDistrictCode, setSelectedDistrictCode] = useState("");

  // Fetch data on mount
  useEffect(() => {
    if (accountId) {
      dispatch(FETCH_ACCOUNT(accountId));
      dispatch(FETCH_CARTS(accountId));
    }
  }, [dispatch, accountId]);

  // Fetch danh sách 34 tỉnh thành mới (Nghị quyết 202/2025/QH15)
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await ProvinceService.getMajorProvinces();
        setProvinces(response.data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách tỉnh thành:", error);
        toast.error("Không thể tải danh sách tỉnh thành");
      }
    };
    fetchProvinces();
  }, []);

  // Fetch danh sách quận/huyện khi chọn tỉnh
  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedProvinceCode) {
        try {
          const response = await ProvinceService.getDistrictsByProvinceCode(
            selectedProvinceCode
          );
          setDistricts(response.data.districts || []);
          setWards([]); // Reset wards khi đổi tỉnh
          setNewAddress((prev) => ({ ...prev, district: "", ward: "" }));
        } catch (error) {
          console.error("Lỗi khi tải danh sách quận/huyện:", error);
        }
      } else {
        setDistricts([]);
        setWards([]);
      }
    };
    fetchDistricts();
  }, [selectedProvinceCode]);

  // Fetch danh sách phường/xã khi chọn quận
  useEffect(() => {
    const fetchWards = async () => {
      if (selectedDistrictCode) {
        try {
          const response = await ProvinceService.getWardsByDistrictCode(
            selectedDistrictCode
          );
          setWards(response.data.wards || []);
          setNewAddress((prev) => ({ ...prev, ward: "" }));
        } catch (error) {
          console.error("Lỗi khi tải danh sách phường/xã:", error);
        }
      } else {
        setWards([]);
      }
    };
    fetchWards();
  }, [selectedDistrictCode]);

  // Handle errors
  useEffect(() => {
    if (error) {
      toast.error(error || "Đặt hàng thất bại");
      dispatch(clearErrorState());
    }
  }, [error, dispatch]);

  // Handle successful order creation
  useEffect(() => {
    if (createdOrder) {
      toast.success("Đặt hàng thành công!");
      dispatch(clearCheckoutState());
      navigate(`/order/${createdOrder.id}`);
    }
  }, [createdOrder, dispatch, navigate]);

  // Calculate prices
  const parsePrice = (priceString) => {
    if (!priceString) return 0;
    return parseFloat(priceString.toString().replace(/,/g, "")) || 0;
  };

  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => {
        const price = parsePrice(item.priceAtAdd || item.price);
        const quantity = item.quantity || 1;
        return sum + price * quantity;
      }, 0)
    : 0;

  const shippingFee = 30000;

  const discount = appliedVoucher ? calculateDiscountAmount(appliedVoucher) : 0;

  const total = subtotal + shippingFee - discount;

  // Calculate discount based on voucher
  function calculateDiscountAmount(voucher) {
    if (!voucher) return 0;

    if (voucher.discountType === "PERCENTAGE") {
      const discountAmount = (subtotal * voucher.discountValue) / 100;
      return Math.min(discountAmount, voucher.maxDiscount || discountAmount);
    } else if (voucher.discountType === "FIXED_AMOUNT") {
      return voucher.discountValue;
    } else if (voucher.discountType === "FREE_SHIPPING") {
      return shippingFee;
    }
    return 0;
  }

  // Handlers
  const handleContinueToShipping = () => {
    shippingRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) {
      toast.warning("Vui lòng nhập mã khuyến mãi");
      return;
    }

    try {
      // Call API to validate voucher by code
      const response = await CheckoutService.getVouchers();
      const vouchers = response.data;

      const voucher = vouchers.find(
        (v) => v.code === promoCode.toUpperCase() && v.isActive
      );

      if (voucher) {
        const now = new Date();
        const startDate = new Date(voucher.startDate);
        const endDate = new Date(voucher.endDate);

        if (now < startDate) {
          toast.error("Mã khuyến mãi chưa có hiệu lực");
          return;
        }

        if (now > endDate) {
          toast.error("Mã khuyến mãi đã hết hạn");
          return;
        }

        if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit) {
          toast.error("Mã khuyến mãi đã hết lượt sử dụng");
          return;
        }

        setAppliedVoucher(voucher);
        toast.success(`Áp dụng mã "${voucher.code}" thành công!`);
      } else {
        toast.error("Mã khuyến mãi không hợp lệ!");
      }
    } catch (error) {
      console.error("Error applying voucher:", error);
      toast.error("Không thể áp dụng mã khuyến mãi");
    }
  };

  const handleRemovePromo = () => {
    setPromoCode("");
    setAppliedVoucher(null);
    toast.info("Đã xóa mã khuyến mãi");
  };

  const handleNewAddressChange = (field, value) => {
    setNewAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePlaceOrder = async () => {
    // Validation
    if (!cartItems || cartItems.length === 0) {
      toast.error("Giỏ hàng trống!");
      return;
    }

    if (!selectedPaymentMethod) {
      toast.error("Vui lòng chọn phương thức thanh toán!");
      return;
    }

    if (selectedAddressOption === "new") {
      // Validate new address
      if (
        !newAddress.firstName ||
        !newAddress.lastName ||
        !newAddress.address ||
        !newAddress.city ||
        !newAddress.phoneNumber
      ) {
        toast.error("Vui lòng điền đầy đủ thông tin địa chỉ!");
        return;
      }
    }

    try {
      // Dispatch create order action
      await dispatch(
        CREATE_ORDER({
          accountId,
          voucherId: appliedVoucher?.id || null,
        })
      ).unwrap();
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error(error || "Đặt hàng thất bại!");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Logo ở giữa */}
          <div className="flex justify-center mb-8">
            <img
              src={logoBag}
              alt="Logo"
              className="h-20 w-auto object-contain cursor-pointer"
              onClick={() => navigate("/")}
            />
          </div>

          {/* Layout 2 cột */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cột trái - Form thanh toán */}
            <div className="lg:col-span-2">
              <div className="deliveryStep">
                <h3 className="text-lg text-gray-700 font-bold bg-gray-200 p-3 rounded-md">
                  1. Giao hàng
                </h3>
                <p className="font-bold text-md pb-1 pt-2">Địa chỉ giao hàng</p>
                <div className="flex flex-row gap-4">
                  <div className="w-80 min-h-40 border-2 border-gray-500 rounded-md p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="default-address"
                          className="accent-black w-4 h-4"
                          value="default"
                          checked={selectedAddressOption === "default"}
                          onChange={(e) =>
                            setSelectedAddressOption(e.target.value)
                          }
                        />
                      </label>
                      <div className="flex flex-col w-64">
                        <p className="font-semibold">Địa chỉ mặc định</p>
                      </div>
                    </div>
                    {account ? (
                      <ul className="text-sm">
                        <li>
                          Tên: {account.firstName} {account.lastName}
                        </li>
                        <li>Email: {account.email}</li>
                        <li>Số điện thoại: {account.phoneNumber || "N/A"}</li>
                        <li>Địa chỉ: {account.address || "Chưa cập nhật"}</li>
                      </ul>
                    ) : (
                      <p className="text-sm text-gray-500">Đang tải...</p>
                    )}
                  </div>
                  <div className="w-80 h-50 border-2 border-gray-500 rounded-md p-4 flex flex-col gap-3">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="default-address"
                        className="accent-black w-4 h-4"
                        value="new"
                        checked={selectedAddressOption === "new"}
                        onChange={(e) =>
                          setSelectedAddressOption(e.target.value)
                        }
                      />
                      <div className="flex flex-col w-64">
                        <p>Thêm 1 địa chỉ giao hàng</p>
                      </div>
                    </label>
                  </div>
                </div>

                {selectedAddressOption === "new" && (
                  <form
                    className="flex flex-col gap-2 mt-2 text-sm pb-1 pt-2"
                    onSubmit={(e) => e.preventDefault()}
                  >
                    <h4 className="font-bold ">
                      THÊM MỘT ĐỊA CHỈ GIAO HÀNG MỚI
                    </h4>
                    <p className="opacity-50">*Các trường bắt buộc</p>
                    <div className="flex flex-row gap-4">
                      <input
                        type="text"
                        placeholder="Họ*"
                        value={newAddress.firstName}
                        onChange={(e) =>
                          handleNewAddressChange("firstName", e.target.value)
                        }
                        className="border border-gray-300 rounded-md p-2 w-1/2"
                      />
                      <input
                        type="text"
                        placeholder="Tên*"
                        value={newAddress.lastName}
                        onChange={(e) =>
                          handleNewAddressChange("lastName", e.target.value)
                        }
                        className="border border-gray-300 rounded-md p-2 w-1/2"
                      />
                    </div>
                    <div className="flex flex-col pt-2">
                      <p className="font-bold">Địa điểm: </p>
                      <input
                        type="text"
                        placeholder="Địa chỉ*"
                        value={newAddress.address}
                        onChange={(e) =>
                          handleNewAddressChange("address", e.target.value)
                        }
                        className="border border-gray-300 rounded-md p-2 "
                      />
                    </div>
                    <div className="flex flex-row gap-4 pt-2">
                      <p className="text-center">Tỉnh/TP*</p>
                      <select
                        className="w-40 rounded-md border border-gray-300 p-1"
                        value={selectedProvinceCode}
                        onChange={(e) => {
                          const selectedProvince = provinces.find(
                            (p) => p.code.toString() === e.target.value
                          );
                          setSelectedProvinceCode(e.target.value);
                          setSelectedDistrictCode("");
                          handleNewAddressChange(
                            "city",
                            selectedProvince?.name || ""
                          );
                        }}
                      >
                        <option value="">Chọn Tỉnh/TP</option>
                        {provinces.map((province) => (
                          <option key={province.code} value={province.code}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                      <p className="text-center">Quận/Huyện*</p>
                      <select
                        className="w-40 rounded-md border border-gray-300 p-1"
                        value={selectedDistrictCode}
                        onChange={(e) => {
                          const selectedDistrict = districts.find(
                            (d) => d.code.toString() === e.target.value
                          );
                          setSelectedDistrictCode(e.target.value);
                          handleNewAddressChange(
                            "district",
                            selectedDistrict?.name || ""
                          );
                        }}
                        disabled={!selectedProvinceCode}
                      >
                        <option value="">Chọn Quận/Huyện</option>
                        {districts.map((district) => (
                          <option key={district.code} value={district.code}>
                            {district.name}
                          </option>
                        ))}
                      </select>
                      <p className="text-center">Phường/Xã*</p>
                      <select
                        className="w-40 rounded-md border border-gray-300 p-1"
                        value={newAddress.ward}
                        onChange={(e) => {
                          handleNewAddressChange("ward", e.target.value);
                        }}
                        disabled={!selectedDistrictCode}
                      >
                        <option value="">Chọn Phường/Xã</option>
                        {wards.map((ward) => (
                          <option key={ward.code} value={ward.name}>
                            {ward.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-row gap-4 pt-4">
                      <p>Số liên lạc*</p>
                      <input
                        type="text"
                        placeholder="Số điện thoại liên hệ"
                        value={newAddress.phoneNumber}
                        onChange={(e) =>
                          handleNewAddressChange("phoneNumber", e.target.value)
                        }
                        className="border border-gray-300 rounded-md p-2 w-1/2"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-4">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-black"
                        checked={newAddress.saveAddress}
                        onChange={(e) =>
                          handleNewAddressChange(
                            "saveAddress",
                            e.target.checked
                          )
                        }
                      />
                      <label>Lưu địa chỉ cho những lần mua sau</label>
                    </div>
                  </form>
                )}

                <div className="mt-6 pt-4 border-t border-gray-300">
                  <h4 className="font-bold text-md mb-3">Thông tin liên hệ</h4>
                  <div className="flex flex-row gap-4 items-center">
                    <p>Email*</p>
                    <input
                      type="email"
                      value={account?.email || ""}
                      readOnly
                      className="border border-gray-300 rounded-md p-2 w-1/2 bg-gray-100 cursor-not-allowed"
                    />
                  </div>
                  <p className="text-sm text-gray-600 mt-2 ml-16">
                    Email này sẽ được sử dụng để gửi thông tin đơn hàng
                  </p>
                </div>

                {/* Nút tiếp tục - Áp dụng cho cả 2 trường hợp */}
                <div className="flex justify-center mt-6">
                  <button
                    onClick={handleContinueToShipping}
                    className="border border-black bg-gray-600 rounded-md px-4 py-2 text-white hover:bg-gray-700"
                  >
                    TIẾP TỤC ĐẾN PHƯƠNG THỨC GIAO HÀNG
                  </button>
                </div>
              </div>

              <div
                ref={shippingRef}
                className="shippingMethodStep max-w-screen-md mt-12"
              >
                <h3 className="text-lg text-gray-700 font-bold bg-gray-200 p-3 rounded-md">
                  2. Phương thức vận chuyển
                </h3>
                <p className="font-bold mb-3">PHƯƠNG THỨC GIAO HÀNG</p>
                <div className="border-2 border-gray-500 rounded-md p-4">
                  <label className="flex items-center gap-3">
                    <input
                      onChange={(e) =>
                        setSelectedShippingMethod(e.target.value)
                      }
                      type="radio"
                      name="shipping-method"
                      value="standard"
                      checked={selectedShippingMethod === "standard"}
                      className="accent-black w-4 h-4"
                    />
                    <div className="flex-1">
                      <p className="font-semibold">Giao hàng tiêu chuẩn</p>
                      <p className="text-sm text-gray-600">
                        Thời gian giao hàng: 3-5 ngày làm việc
                      </p>
                      <p className="text-sm font-semibold text-gray-700">
                        Phí vận chuyển: {shippingFee.toLocaleString("vi-VN")}đ
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="paymentStep max-w-screen-md mt-12">
                <h3 className="text-lg text-gray-700 font-bold bg-gray-200 p-3 rounded-md">
                  3. Thanh toán
                </h3>
                <p className="font-bold mb-3">Chọn phương thức thanh toán</p>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {/* item 1 */}
                  <div
                    className={`border-2 rounded-md p-4 cursor-pointer ${
                      selectedPaymentMethod === "COD"
                        ? "border-black bg-gray-50"
                        : "border-gray-500"
                    }`}
                    onClick={() => setSelectedPaymentMethod("COD")}
                  >
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        value="COD"
                        checked={selectedPaymentMethod === "COD"}
                        onChange={(e) =>
                          setSelectedPaymentMethod(e.target.value)
                        }
                        className="accent-black w-4 h-4"
                      />
                      <span className="text-sm leading-none">
                        Thanh toán khi nhận hàng
                      </span>
                    </label>
                  </div>

                  {/* item 2 */}
                  <div
                    className={`border-2 rounded-md p-4 cursor-pointer ${
                      selectedPaymentMethod === "VNPAY"
                        ? "border-black bg-gray-50"
                        : "border-gray-500"
                    }`}
                    onClick={() => setSelectedPaymentMethod("VNPAY")}
                  >
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-3 flex-1 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="VNPAY"
                          checked={selectedPaymentMethod === "VNPAY"}
                          onChange={(e) =>
                            setSelectedPaymentMethod(e.target.value)
                          }
                          className="accent-black w-4 h-4"
                        />
                        <span className="text-sm leading-none">
                          Thanh toán VnPay
                        </span>
                      </label>
                      <img src={vnpayLogo} alt="VNPay" className="w-6 h-auto" />
                    </div>
                  </div>

                  {/* item 3 */}
                  <div
                    className={`border-2 rounded-md p-4 cursor-pointer ${
                      selectedPaymentMethod === "MOMO"
                        ? "border-black bg-gray-50"
                        : "border-gray-500"
                    }`}
                    onClick={() => setSelectedPaymentMethod("MOMO")}
                  >
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="MOMO"
                          checked={selectedPaymentMethod === "MOMO"}
                          onChange={(e) =>
                            setSelectedPaymentMethod(e.target.value)
                          }
                          className="accent-black w-4 h-4"
                        />
                        <span className="text-sm leading-none">MoMo Pay</span>
                      </label>
                      <img src={momoLogo} alt="MoMo" className="w-6 h-auto" />
                    </div>
                  </div>

                  {/* item 4 */}
                  <div
                    className={`border-2 rounded-md p-4 cursor-pointer ${
                      selectedPaymentMethod === "CREDIT_CARD"
                        ? "border-black bg-gray-50"
                        : "border-gray-500"
                    }`}
                    onClick={() => setSelectedPaymentMethod("CREDIT_CARD")}
                  >
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="payment"
                          value="CREDIT_CARD"
                          checked={selectedPaymentMethod === "CREDIT_CARD"}
                          onChange={(e) =>
                            setSelectedPaymentMethod(e.target.value)
                          }
                          className="accent-black w-4 h-4"
                        />
                        <span className="text-sm leading-none">
                          Thẻ tín dụng / ghi nợ
                        </span>
                      </label>
                      <img
                        src={creditCardLogo}
                        alt="Credit Card"
                        className="w-6 h-auto"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="mt-8 border border-green-600 px-32 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
                  >
                    {loading ? "Đang xử lý..." : "Đặt hàng"}
                  </button>
                </div>
              </div>
            </div>

            {/* Cột phải - Thông tin đơn hàng */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-4">Thông tin đơn hàng</h3>

                {/* Danh sách sản phẩm */}
                <div className="mb-4 max-h-60 overflow-y-auto">
                  {Array.isArray(cartItems) && cartItems.length > 0 ? (
                    cartItems.map((item) => {
                      const itemKey = item.itemId || item.id || item.productId;
                      const price = parsePrice(item.priceAtAdd || item.price);
                      const quantity = item.quantity || 1;

                      return (
                        <div
                          key={itemKey}
                          className="flex gap-3 mb-3 pb-3 border-b"
                        >
                          <div className="w-16 h-16 bg-gray-200 rounded flex-shrink-0">
                            {item.productImage && (
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-full h-full object-cover rounded"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">
                              {item.productName}
                            </p>
                            <p className="text-xs text-gray-500">
                              Số lượng: {quantity}
                            </p>
                            <p className="text-sm font-semibold text-gray-700">
                              {(price * quantity).toLocaleString("vi-VN")}đ
                            </p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Giỏ hàng trống
                    </p>
                  )}
                </div>

                {/* Mã khuyến mãi */}
                <div className="mb-4 pb-4 border-b">
                  <label className="block text-sm font-medium mb-2">
                    Mã khuyến mãi
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) =>
                        setPromoCode(e.target.value.toUpperCase())
                      }
                      placeholder="Nhập mã khuyến mãi"
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                      disabled={appliedVoucher !== null}
                    />
                    {appliedVoucher ? (
                      <button
                        onClick={handleRemovePromo}
                        className="px-4 py-2 bg-red-500 text-white text-sm rounded-md hover:bg-red-600"
                      >
                        Xóa
                      </button>
                    ) : (
                      <button
                        onClick={handleApplyPromo}
                        className="px-4 py-2 bg-black text-white text-sm rounded-md hover:bg-gray-800"
                      >
                        Áp dụng
                      </button>
                    )}
                  </div>
                  {appliedVoucher && (
                    <p className="text-xs text-green-600 mt-2">
                      Đã áp dụng mã "{appliedVoucher.code}" - Giảm{" "}
                      {appliedVoucher.discountType === "PERCENTAGE"
                        ? `${appliedVoucher.discountValue}%`
                        : appliedVoucher.discountType === "FIXED_AMOUNT"
                        ? `${appliedVoucher.discountValue.toLocaleString(
                            "vi-VN"
                          )}đ`
                        : "phí ship"}
                    </p>
                  )}
                </div>

                {/* Tổng tiền */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tạm tính:</span>
                    <span className="font-medium">
                      {subtotal.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Phí vận chuyển:</span>
                    <span className="font-medium">
                      {shippingFee.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Giảm giá:</span>
                      <span className="font-medium">
                        -{discount.toLocaleString("vi-VN")}đ
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-2 border-t">
                    <span>Tổng cộng:</span>
                    <span className="text-red-600">
                      {total.toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </div>

                {/* Ghi chú */}
                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Giá đã bao gồm VAT</p>
                  <p>• Miễn phí đổi trả trong 7 ngày</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
