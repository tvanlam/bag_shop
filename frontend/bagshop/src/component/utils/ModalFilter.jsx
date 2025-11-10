import React, { useState } from "react";
import { MdClose } from "react-icons/md";

const ModalFilter = ({ isOpen, onClose, onApplyFilter }) => {
  const [priceRange, setPriceRange] = useState({
    min: "",
    max: "",
  });

  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);

  // Các khoảng giá được định nghĩa sẵn
  const predefinedRanges = [
    { label: "Dưới 500.000đ", min: 0, max: 500000 },
    { label: "500.000đ - 1.000.000đ", min: 500000, max: 1000000 },
    { label: "1.000.000đ - 2.000.000đ", min: 1000000, max: 2000000 },
    { label: "2.000.000đ - 5.000.000đ", min: 2000000, max: 5000000 },
    { label: "Trên 5.000.000đ", min: 5000000, max: Infinity },
  ];

  const handlePredefinedRangeToggle = (range) => {
    const isSelected = selectedPriceRanges.some(
      (r) => r.min === range.min && r.max === range.max
    );

    if (isSelected) {
      setSelectedPriceRanges(
        selectedPriceRanges.filter(
          (r) => !(r.min === range.min && r.max === range.max)
        )
      );
    } else {
      setSelectedPriceRanges([...selectedPriceRanges, range]);
    }
  };

  const handleCustomPriceChange = (type, value) => {
    setPriceRange((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleApplyFilter = () => {
    const filters = {
      priceRanges: selectedPriceRanges,
      customRange:
        priceRange.min || priceRange.max
          ? {
              min: priceRange.min ? parseInt(priceRange.min) : 0,
              max: priceRange.max ? parseInt(priceRange.max) : Infinity,
            }
          : null,
    };

    onApplyFilter?.(filters);
  };

  const handleReset = () => {
    setPriceRange({ min: "", max: "" });
    setSelectedPriceRanges([]);
    onApplyFilter?.({ priceRanges: [], customRange: null });
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? "opacity-50" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Modal Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: "320px" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">BỘ LỌC</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <MdClose size={24} />
          </button>
        </div>

        {/* Filter Content */}
        <div
          className="p-6 overflow-y-auto"
          style={{ height: "calc(100% - 140px)" }}
        >
          {/* Price Range Section */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Khoảng giá
            </h3>

            {/* Predefined Price Ranges */}
            <div className="space-y-2 mb-4">
              {predefinedRanges.map((range, index) => (
                <label
                  key={index}
                  className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedPriceRanges.some(
                      (r) => r.min === range.min && r.max === range.max
                    )}
                    onChange={() => handlePredefinedRangeToggle(range)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="ml-3 text-gray-700">{range.label}</span>
                </label>
              ))}
            </div>

            {/* Custom Price Range */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-700 mb-3">
                Hoặc nhập khoảng giá tùy chỉnh:
              </h4>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  placeholder="Từ"
                  value={priceRange.min}
                  onChange={(e) =>
                    handleCustomPriceChange("min", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="number"
                  placeholder="Đến"
                  value={priceRange.max}
                  onChange={(e) =>
                    handleCustomPriceChange("max", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 bg-white">
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Đặt lại
            </button>
            <button
              onClick={handleApplyFilter}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Áp dụng
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalFilter;
