import { useState } from "react";

/**
 * Custom hook để quản lý form state trong checkout
 * Bao gồm: address options, payment method, shipping method, new address
 */
export const useCheckoutForm = () => {
  const [selectedAddressOption, setSelectedAddressOption] = useState("default");
  const [selectedPaymentMethodState, setSelectedPaymentMethodState] =
    useState("");
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState("standard");
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
  const [formErrors, setFormErrors] = useState({});

  // Wrap setSelectedPaymentMethod để tự clear lỗi khi chọn
  const setSelectedPaymentMethod = (value) => {
    setSelectedPaymentMethodState(value);
    if (value) {
      setFormErrors((prev) => ({ ...prev, paymentMethod: "" }));
    }
  };

  // Update single field in new address
  const updateNewAddressField = (field, value) => {
    setNewAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear lỗi của field khi người dùng bắt đầu nhập
    setFormErrors((prev) => ({ ...prev, [field]: "" }));
  };

  // Update multiple fields in new address
  const updateNewAddressFields = (fields) => {
    setNewAddress((prev) => ({
      ...prev,
      ...fields,
    }));
  };

  // Reset new address form
  const resetNewAddress = () => {
    setNewAddress({
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      district: "",
      ward: "",
      phoneNumber: "",
      saveAddress: false,
    });
  };

  // Validate new address - trả về object lỗi từng field
  const validateNewAddress = () => {
    const fieldErrors = {};

    if (!newAddress.firstName.trim())
      fieldErrors.firstName = "Vui lòng nhập họ";
    if (!newAddress.lastName.trim()) fieldErrors.lastName = "Vui lòng nhập tên";
    if (!newAddress.address.trim())
      fieldErrors.address = "Vui lòng nhập địa chỉ";
    if (!newAddress.city.trim())
      fieldErrors.city = "Vui lòng chọn tỉnh/thành phố";
    if (!newAddress.district.trim())
      fieldErrors.district = "Vui lòng chọn quận/huyện";
    if (!newAddress.ward.trim()) fieldErrors.ward = "Vui lòng chọn phường/xã";
    if (!newAddress.phoneNumber.trim()) {
      fieldErrors.phoneNumber = "Vui lòng nhập số điện thoại";
    } else if (!/^[0-9]{10,11}$/.test(newAddress.phoneNumber.trim())) {
      fieldErrors.phoneNumber = "Số điện thoại không hợp lệ (10-11 chữ số)";
    }

    return {
      isValid: Object.keys(fieldErrors).length === 0,
      fieldErrors,
    };
  };

  // Validate payment method
  const validatePaymentMethod = () => {
    if (!selectedPaymentMethodState) {
      return { isValid: false, error: "Vui lòng chọn phương thức thanh toán" };
    }
    return { isValid: true, error: "" };
  };

  // Validate entire checkout form - cập nhật formErrors state để hiển thị inline
  const validateCheckoutForm = () => {
    let newErrors = {};

    // Validate payment method
    const paymentValidation = validatePaymentMethod();
    if (!paymentValidation.isValid) {
      newErrors.paymentMethod = paymentValidation.error;
    }

    // Validate address nếu chọn địa chỉ mới
    if (selectedAddressOption === "new") {
      const addressValidation = validateNewAddress();
      if (!addressValidation.isValid) {
        newErrors = { ...newErrors, ...addressValidation.fieldErrors };
      }
    }

    setFormErrors(newErrors);

    return {
      isValid: Object.keys(newErrors).length === 0,
    };
  };

  return {
    // State
    selectedAddressOption,
    selectedPaymentMethod: selectedPaymentMethodState,
    selectedShippingMethod,
    newAddress,
    formErrors,

    // Setters
    setSelectedAddressOption,
    setSelectedPaymentMethod,
    setSelectedShippingMethod,
    setNewAddress,

    // Helpers
    updateNewAddressField,
    updateNewAddressFields,
    resetNewAddress,

    // Validation
    validateNewAddress,
    validatePaymentMethod,
    validateCheckoutForm,
  };
};
