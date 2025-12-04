import { useState } from "react";

/**
 * Custom hook để quản lý form state trong checkout
 * Bao gồm: address options, payment method, shipping method, new address
 */
export const useCheckoutForm = () => {
  const [selectedAddressOption, setSelectedAddressOption] = useState("default");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("standard");
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

  // Update single field in new address
  const updateNewAddressField = (field, value) => {
    setNewAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
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

  // Validate new address
  const validateNewAddress = () => {
    const errors = [];
    
    if (!newAddress.firstName.trim()) {
      errors.push("Vui lòng nhập họ");
    }
    if (!newAddress.lastName.trim()) {
      errors.push("Vui lòng nhập tên");
    }
    if (!newAddress.address.trim()) {
      errors.push("Vui lòng nhập địa chỉ");
    }
    if (!newAddress.city.trim()) {
      errors.push("Vui lòng chọn tỉnh/thành phố");
    }
    if (!newAddress.district.trim()) {
      errors.push("Vui lòng chọn quận/huyện");
    }
    if (!newAddress.ward.trim()) {
      errors.push("Vui lòng chọn phường/xã");
    }
    if (!newAddress.phoneNumber.trim()) {
      errors.push("Vui lòng nhập số điện thoại");
    } else if (!/^[0-9]{10,11}$/.test(newAddress.phoneNumber.trim())) {
      errors.push("Số điện thoại không hợp lệ (10-11 chữ số)");
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  // Validate payment method
  const validatePaymentMethod = () => {
    if (!selectedPaymentMethod) {
      return {
        isValid: false,
        errors: ["Vui lòng chọn phương thức thanh toán"],
      };
    }
    return {
      isValid: true,
      errors: [],
    };
  };

  // Validate entire checkout form
  const validateCheckoutForm = () => {
    const errors = [];

    // Validate payment method
    const paymentValidation = validatePaymentMethod();
    if (!paymentValidation.isValid) {
      errors.push(...paymentValidation.errors);
    }

    // Validate address if new address is selected
    if (selectedAddressOption === "new") {
      const addressValidation = validateNewAddress();
      if (!addressValidation.isValid) {
        errors.push(...addressValidation.errors);
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  };

  return {
    // State
    selectedAddressOption,
    selectedPaymentMethod,
    selectedShippingMethod,
    newAddress,
    
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

