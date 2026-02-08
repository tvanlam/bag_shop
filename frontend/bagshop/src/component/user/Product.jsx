import React, { useEffect, useState } from "react";
import { RiFilterLine } from "react-icons/ri";
import {
  MdKeyboardArrowDown,
  MdFavorite,
  MdFavoriteBorder,
} from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_PRODUCT,
  FETCH_PRODUCTS,
  selectProducts,
  selectProductLoading,
  selectProductError,
  selectProductPagination,
} from "../../redux/slices/ProductSlice";
import { ADD_TO_CART, FETCH_CARTS } from "../../redux/slices/CartSlice";
import ProductPage from "./ProductPage";
import { Button } from "antd";
import ModalFilter from "../utils/ModalFilter";

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductLoading);
  const error = useSelector(selectProductError);
  const pagination = useSelector(selectProductPagination);
  const { accountId } = useSelector((state) => state.auth);
  const [sortBy, setSortBy] = useState("default");
  const [favorites, setFavorites] = useState([]);
  const [selectOption, setSelectOption] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalFilter, setModalFilter] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(null);

  useEffect(() => {
    dispatch(FETCH_PRODUCTS({ pageNumber: currentPage - 1, pageSize: 12 }));
  }, [dispatch, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleSelection = (productId, type, value) => {
    setSelectOption((prev) => {
      const newOptions = {
        ...prev,
        [productId]: {
          ...prev[productId],
          [type]: value,
        },
      };

      // Nếu đổi màu, reset size nếu size không tồn tại cho màu mới
      if (type === "color") {
        const product = products.find((p) => p.id === productId);
        if (product && product.productVariants) {
          const sizesForColor = product.productVariants
            .filter((v) => v.color === value)
            .map((v) => v.size);

          // Nếu size hiện tại không có trong màu mới → reset
          if (
            newOptions[productId]?.size &&
            !sizesForColor.includes(newOptions[productId].size)
          ) {
            newOptions[productId].size = null;
          }
        }
      }

      return newOptions;
    });
  };

  const handleAddToCart = (product) => {
    if (!accountId) {
      toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });
      return;
    }

    // Kiểm tra xem sản phẩm có variants không
    if (!product.productVariants || product.productVariants.length === 0) {
      toast.error("Sản phẩm này chưa có biến thể!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
      return;
    }

    // Lấy màu và size đã chọn từ selectOption
    const selectedColor = selectOption[product.id]?.color;
    const selectedSize = selectOption[product.id]?.size;

    // Tìm variant theo màu và size đã chọn
    let selectedVariant = null;

    if (selectedColor && selectedSize) {
      selectedVariant = product.productVariants.find(
        (v) =>
          v.color === selectedColor &&
          v.size === selectedSize &&
          v.stockQuantity > 0,
      );
    }

    // Nếu không tìm thấy, lấy variant đầu tiên có stock
    if (!selectedVariant) {
      selectedVariant = product.productVariants.find(
        (v) => v.stockQuantity > 0,
      );
    }

    if (!selectedVariant) {
      toast.error("Sản phẩm này hiện đã hết hàng!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
      return;
    }

    const cartRequest = {
      items: [
        {
          productId: product.id,
          productVariantId: selectedVariant.id,
          quantity: 1,
        },
      ],
    };

    dispatch(ADD_TO_CART({ accountId, cartRequest }))
      .unwrap()
      .then((response) => {
        console.log("✅ ADD TO CART RESPONSE:", response);
        // Fetch lại danh sách giỏ hàng sau khi add to cart thành công
        dispatch(FETCH_CARTS(accountId));
        toast.success("Thêm vào giỏ hàng thành công!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      })
      .catch((error) => {
        console.error("❌ ADD TO CART ERROR:", error);
        toast.error(error || "Thêm vào giỏ hàng thất bại!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
        });
      });
  };

  const getUniqueColors = (productVariants) => {
    if (!productVariants || !Array.isArray(productVariants)) return [];
    const colorMap = new Map();
    productVariants.forEach((variant) => {
      if (variant.color && !colorMap.has(variant.color)) {
        colorMap.set(variant.color, variant.colorCode || null);
      }
    });
    return Array.from(colorMap.entries()).map(([color, colorCode]) => ({
      color,
      colorCode,
    }));
  };

  const getUniqueSizes = (productVariants, productId) => {
    if (!productVariants || !Array.isArray(productVariants)) return [];

    const selectedColor = selectOption[productId]?.color;

    // Nếu đã chọn màu, chỉ lấy sizes của màu đó
    const filteredVariants = selectedColor
      ? productVariants.filter((v) => v.color === selectedColor)
      : productVariants;

    const sizes = new Set();
    filteredVariants.forEach((variant) => {
      if (variant.size) {
        sizes.add(variant.size);
      }
    });
    return Array.from(sizes);
  };

  // Helper function to get display price
  const getDisplayPrice = (product) => {
    if (product.basePrice) return product.basePrice;
    if (
      product.productVariants &&
      product.productVariants.length > 0 &&
      product.productVariants[0].price
    ) {
      return product.productVariants[0].price;
    }
    return 0;
  };

  // Function to get color style (use colorCode from backend if available)
  const getColorStyle = (colorCode, colorName) => {
    if (colorCode) {
      return { backgroundColor: colorCode };
    }
    // Fallback to predefined colors if no colorCode
    const colorMap = {
      black: "#000000",
      brown: "#92400e",
      white: "#ffffff",
      green: "#059669",
      beige: "#fde68a",
      red: "#dc2626",
      navy: "#1e3a8a",
      pink: "#f472b6",
      blue: "#3b82f6",
      yellow: "#facc15",
      purple: "#a855f7",
      gray: "#6b7280",
      orange: "#f97316",
    };
    return {
      backgroundColor: colorMap[colorName?.toLowerCase()] || "#d1d5db",
    };
  };

  // Handle filter apply
  const handleApplyFilter = (filters) => {
    setAppliedFilters(filters);
    setModalFilter(false);
  };

  // Filter products based on applied filters
  const getFilteredProducts = () => {
    if (!products || !Array.isArray(products)) return [];

    if (!appliedFilters) return products;

    return products.filter((product) => {
      const productPrice = getDisplayPrice(product);

      // Check predefined price ranges
      if (appliedFilters.priceRanges && appliedFilters.priceRanges.length > 0) {
        const matchesRange = appliedFilters.priceRanges.some(
          (range) => productPrice >= range.min && productPrice <= range.max,
        );
        if (!matchesRange) return false;
      }

      // Check custom price range
      if (appliedFilters.customRange) {
        const { min, max } = appliedFilters.customRange;
        if (productPrice < min || productPrice > max) return false;
      }

      //most popular
      if (sortBy === "most-popular") return product.popularity;
      // check product price from high to low
      if (sortBy === "price-high")
        return getDisplayPrice(product) > productPrice;
      // check product price from low to high
      if (sortBy === "price-low")
        return getDisplayPrice(product) < productPrice;
      // check product name from a to z
      if (sortBy === "name-az") return product.name > productPrice;
      // check product name from z to a
      if (sortBy === "name-za") return product.name < productPrice;
      return true;
    });
  };

  const filteredProducts = getFilteredProducts();

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-100">
      {/* Modal Filter */}
      <ModalFilter
        isOpen={modalFilter}
        onClose={() => setModalFilter(false)}
        onApplyFilter={handleApplyFilter}
      />

      <div
        className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          modalFilter ? "ml-80" : ""
        }`}
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            TẤT CẢ TÚI XÁCH
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Khám phá những chiếc túi xa hoa từ các thương hiệu hàng đầu thế giới
          </p>
        </div>

        {/* Filter and Sort Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 pb-4 border-b border-gray-300">
          <button
            onClick={() => setModalFilter(true)}
            className="flex items-center font-bold gap-2 text-gray-700 mb-4 sm:mb-0"
          >
            <RiFilterLine size={20} />
            <span>LỌC</span>
          </button>
          <div className="flex items-center gap-3">
            <span className="font-medium text-gray-700">Sắp xếp theo:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
              >
                <option value="most-popular">Phổ Biến Nhất</option>
                <option value="price-low">Giá: Thấp đến Cao</option>
                <option value="price-high">Giá: Cao đến Thấp</option>
                <option value="name-az">Tên: A-Z</option>
                <option value="name-za">Tên: Z-A</option>
                <option value="newest">Mới nhất</option>
              </select>
              <MdKeyboardArrowDown
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                size={20}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="text-center py-12">
            <div className="text-lg text-red-600">
              Lỗi:{" "}
              {typeof error === "string"
                ? error
                : error.message || "Đã xảy ra lỗi khi tải sản phẩm"}
            </div>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts &&
            Array.isArray(filteredProducts) &&
            filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl group relative"
                >
                  <div className="relative">
                    <Link to={`/product/${product.id}`}>
                      <div className="relative w-full h-64">
                        {product.images &&
                        product.images.length > 0 &&
                        product.images[0].imageUrl ? (
                          <img
                            src={product.images[0].imageUrl}
                            alt={product.name || "Product"}
                            className="w-full h-64 object-cover cursor-pointer"
                            onError={(e) => {
                              e.target.style.display = "none";
                              const placeholder =
                                e.target.parentElement.querySelector(
                                  ".placeholder-div",
                                );
                              if (placeholder) {
                                placeholder.style.display = "flex";
                              }
                            }}
                          />
                        ) : null}

                        <div
                          className="placeholder-div absolute inset-0 w-full h-64 bg-gray-200 flex items-center justify-center cursor-pointer"
                          style={{
                            display:
                              product.images &&
                              product.images.length > 0 &&
                              product.images[0].imageUrl
                                ? "none"
                                : "flex",
                          }}
                        >
                          <span className="text-gray-500 text-sm">
                            Không có hình ảnh
                          </span>
                        </div>
                      </div>
                    </Link>
                    {/* Favorite Icon */}
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
                    >
                      {favorites.includes(product.id) ? (
                        <MdFavorite size={24} className="text-red-500" />
                      ) : (
                        <MdFavoriteBorder size={24} />
                      )}
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {product.name || "Unnamed Product"}
                    </h3>
                    {/* Sizes - only show if sizes exist from productVariants */}
                    {(() => {
                      const sizes = getUniqueSizes(
                        product.productVariants,
                        product.id,
                      );
                      return (
                        sizes.length > 0 && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-600">
                              Kích thước:
                            </span>
                            <div className="flex gap-2">
                              {sizes.map((size) => (
                                <button
                                  key={size}
                                  onClick={() =>
                                    handleSelection(product.id, "size", size)
                                  }
                                  className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                                    selectOption[product.id]?.size === size
                                      ? "border-purple-600 bg-purple-100 text-purple-600"
                                      : "border-gray-300 text-gray-600"
                                  } text-sm font-medium hover:border-purple-600 hover:text-purple-600 transition-colors`}
                                >
                                  {size}
                                </button>
                              ))}
                            </div>
                          </div>
                        )
                      );
                    })()}

                    {/* Colors - only show if colors exist from productVariants */}
                    {(() => {
                      const colors = getUniqueColors(product.productVariants);
                      return (
                        colors.length > 0 && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-sm text-gray-600">
                              Màu sắc:
                            </span>
                            <div className="flex gap-2">
                              {colors.map(({ color, colorCode }) => (
                                <button
                                  key={color}
                                  onClick={() =>
                                    handleSelection(product.id, "color", color)
                                  }
                                  style={getColorStyle(colorCode, color)}
                                  className={`w-6 h-6 rounded-full border ${
                                    selectOption[product.id]?.color === color
                                      ? "ring-2 ring-purple-600 ring-offset-2"
                                      : "border-gray-300"
                                  } hover:ring-2 hover:ring-purple-600 hover:ring-offset-2 transition-all`}
                                  title={color}
                                />
                              ))}
                            </div>
                          </div>
                        )
                      );
                    })()}
                    <p className="text-lg  text-gray-800 mt-2">
                      {getDisplayPrice(product)
                        ? `${getDisplayPrice(product).toLocaleString("vi-VN")} VNĐ`
                        : "Liên hệ"}
                    </p>
                  </div>
                  {/* Add to Cart Button - Appears on Hover */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white py-2 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity "
                  >
                    <HiOutlineShoppingCart size={20} />
                    Thêm vào giỏ
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-lg text-gray-600">
                  {products === null || products === undefined
                    ? "Đang tải dữ liệu sản phẩm..."
                    : "Không có sản phẩm nào"}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {pagination && pagination.totalPages > 0 && (
        <ProductPage
          currentPage={currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default Product;
