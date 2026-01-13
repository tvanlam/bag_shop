import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import logoBag from "../../assets/logoBag.png";
import {
  CREATE_ORDER,
  clearCheckoutState,
  clearErrorState,
} from "../../redux/slices/CheckoutSlice";
import { FETCH_ACCOUNT } from "../../redux/slices/AccountSlice";
import { FETCH_CARTS } from "../../redux/slices/CartSlice";

// Import custom hooks
import { useCheckoutForm } from "./checkout/hooks/useCheckoutForm";
import { useProvinceData } from "./checkout/hooks/useProvinceData";
import { useOrderCalculation } from "./checkout/hooks/useOrderCalculation";
import { useVoucherManagement } from "./checkout/hooks/useVoucherManagement";

// Import components
import DeliverySection from "./checkout/DeliverySection";
import ShippingSection from "./checkout/ShippingSection";
import PaymentSection from "./checkout/PaymentSection";
import OrderSummary from "./checkout/OrderSummary";

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

  // Custom hooks
  const checkoutForm = useCheckoutForm();
  const provinceData = useProvinceData();
  const voucherManagement = useVoucherManagement();
  const orderCalculation = useOrderCalculation(
    cartItems,
    voucherManagement.appliedVoucher
  );

  // Fetch data on mount
  useEffect(() => {
    if (accountId) {
      dispatch(FETCH_ACCOUNT(accountId));
      dispatch(FETCH_CARTS(accountId));
    }
  }, [dispatch, accountId]);

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
      // Nếu có paymentUrl (VNPay, MoMo), redirect đến trang thanh toán
      if (createdOrder.paymentUrl) {
        toast.success("Đang chuyển đến trang thanh toán...");
        window.location.href = createdOrder.paymentUrl;
      } else {
        // COD hoặc thanh toán khác
        toast.success("Đặt hàng thành công!");
        dispatch(clearCheckoutState());
        navigate("/");
      }
    }
  }, [createdOrder, dispatch, navigate]);

  // Handlers
  const handleContinueToShipping = () => {
    shippingRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleProvinceSelect = (code, name) => {
    provinceData.setSelectedProvinceCode(code);
    provinceData.setSelectedDistrictCode("");
    checkoutForm.updateNewAddressFields({
      city: name,
      district: "",
      ward: "",
    });
  };

  const handleDistrictSelect = (code, name) => {
    provinceData.setSelectedDistrictCode(code);
    checkoutForm.updateNewAddressFields({
      district: name,
      ward: "",
    });
  };

  const handleWardSelect = (name) => {
    checkoutForm.updateNewAddressField("ward", name);
  };

  const handlePlaceOrder = async () => {
    // Validation
    if (!cartItems || cartItems.length === 0) {
      toast.error("Giỏ hàng trống!");
      return;
    }

    // Validate form
    const validation = checkoutForm.validateCheckoutForm();
    if (!validation.isValid) {
      validation.errors.forEach((error) => toast.error(error));
      return;
    }

    try {
      // Dispatch create order action
      await dispatch(
        CREATE_ORDER({
          accountId,
          voucherId: voucherManagement.appliedVoucher?.id || null,
          paymentMethod: checkoutForm.selectedPaymentMethod,
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
              {/* 1. Delivery Section */}
              <DeliverySection
                account={account}
                selectedAddressOption={checkoutForm.selectedAddressOption}
                onAddressOptionChange={checkoutForm.setSelectedAddressOption}
                newAddress={checkoutForm.newAddress}
                onNewAddressFieldChange={checkoutForm.updateNewAddressField}
                provinceData={provinceData}
                onProvinceSelect={handleProvinceSelect}
                onDistrictSelect={handleDistrictSelect}
                onWardSelect={handleWardSelect}
                onContinue={handleContinueToShipping}
              />

              {/* 2. Shipping Section */}
              <ShippingSection
                ref={shippingRef}
                selectedShippingMethod={checkoutForm.selectedShippingMethod}
                onShippingMethodChange={checkoutForm.setSelectedShippingMethod}
                shippingFee={orderCalculation.shippingFee}
              />

              {/* 3. Payment Section */}
              <PaymentSection
                selectedPaymentMethod={checkoutForm.selectedPaymentMethod}
                onPaymentMethodChange={checkoutForm.setSelectedPaymentMethod}
                onPlaceOrder={handlePlaceOrder}
                loading={loading}
              />
            </div>

            {/* Cột phải - Order Summary */}
            <OrderSummary
              cartItems={cartItems}
              promoCode={voucherManagement.promoCode}
              onPromoCodeChange={voucherManagement.setPromoCode}
              appliedVoucher={voucherManagement.appliedVoucher}
              onApplyPromo={voucherManagement.handleApplyPromo}
              onRemovePromo={voucherManagement.handleRemovePromo}
              orderCalculation={orderCalculation}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
