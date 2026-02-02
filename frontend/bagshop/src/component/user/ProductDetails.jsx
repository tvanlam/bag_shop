import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MdFavoriteBorder } from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  FETCH_PRODUCT,
  FETCH_PRODUCTS,
  selectProduct,
  selectProducts,
  selectProductLoading,
  selectProductError,
} from "../../redux/slices/ProductSlice";
import { ADD_TO_CART, FETCH_CARTS } from "../../redux/slices/CartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductLoading);
  const error = useSelector(selectProductError);
  const { accountId } = useSelector((state) => state.auth);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    // Thử fetch product từ API trước
    dispatch(FETCH_PRODUCT(parseInt(id)));

    // Nếu không có products list, fetch products list
    if (!products || products.length === 0) {
      dispatch(FETCH_PRODUCTS());
    }
  }, [dispatch, id, products]);

  useEffect(() => {
    // Nếu có lỗi auth và có products list, tìm product từ list
    if (error && products && products.length > 0) {
      const errorMessage =
        typeof error === "string" ? error : error.message || "";
      const isAuthError =
        errorMessage.includes("Access token") ||
        errorMessage.includes("authentication") ||
        errorMessage.includes("401");

      if (isAuthError) {
        const foundProduct = products.find((p) => p.id === parseInt(id));
        if (foundProduct) {
          setCurrentProduct(foundProduct);
        }
      }
    } else if (product) {
      setCurrentProduct(product);
    }
  }, [error, products, product, id]);

  useEffect(() => {
    // Set main image khi currentProduct được load
    if (
      currentProduct &&
      currentProduct.images &&
      currentProduct.images.length > 0
    ) {
      const mainImg =
        currentProduct.images.find((img) => img.main) ||
        currentProduct.images[0];
      if (mainImg) {
        setMainImage(mainImg.imageUrl);
      }
    }
  }, [currentProduct]);

  // Auto-select first variant when product loads
  useEffect(() => {
    if (currentProduct?.productVariants?.length > 0) {
      const firstVariant = currentProduct.productVariants[0];
      setSelectedVariant(firstVariant);
      setSelectedColor(firstVariant.color);
      setSelectedSize(firstVariant.size);
    }
  }, [currentProduct]);

  const handleThumbnailClick = (imageUrl) => {
    setMainImage(imageUrl);
  };

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handleAddToCart = () => {
    if (!currentProduct) return;

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

    // Kiểm tra variant đã được chọn chưa
    if (!selectedVariant) {
      toast.error("Vui lòng chọn màu sắc và kích thước!", {
        position: "top-center",
        autoClose: 3000,
        theme: "light",
      });
      return;
    }

    // Kiểm tra variant còn hàng không
    if (selectedVariant.stockQuantity === 0) {
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
          productId: currentProduct.id,
          productVariantId: selectedVariant.id,
          quantity: quantity,
        },
      ],
    };

    console.log("🛒 ADD TO CART REQUEST:", cartRequest);
    console.log("📦 Selected Variant:", selectedVariant);

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

  // Hiển thị loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  // Hiển thị khi không có product
  if (!currentProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Product not found</div>
      </div>
    );
  }

  const formatVND = (price) => {
    if (typeof price !== "number") return "N/A";
    return new Intl.NumberFormat("vi-VN").format(price) + " VNĐ";
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Phần ảnh bên trái */}
          <div className="image-section">
            {/* Ảnh lớn chính */}
            <div className="main-image mb-4">
              <img
                src={mainImage}
                alt={currentProduct.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg"
              />
            </div>

            {/* Các ảnh nhỏ thumbnail */}
            <div className="thumbnail-images flex gap-2 overflow-x-auto">
              {currentProduct.images &&
                currentProduct.images.map((image, index) => (
                  <img
                    key={image.id || index}
                    src={image.imageUrl}
                    alt={
                      image.alt || `${currentProduct.name} view ${index + 1}`
                    }
                    className={`w-20 h-20 object-cover rounded cursor-pointer border-2 transition-all duration-200 ${
                      mainImage === image.imageUrl
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                    onClick={() => handleThumbnailClick(image.imageUrl)}
                  />
                ))}
            </div>
          </div>

          {/* Phần thông tin bên phải */}
          <div className="product-info">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {currentProduct.name}
            </h1>

            {/* Mô tả sản phẩm */}
            <p className="text-gray-600 mb-4 leading-relaxed">
              {currentProduct.description || "Không có mô tả"}
            </p>

            <p className="text-2xl text-gray-800 font-bold mb-4">
              {selectedVariant
                ? formatVND(selectedVariant.price)
                : formatVND(currentProduct.basePrice || currentProduct.price)}
            </p>

            {/* Số lượng tồn kho */}
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Tồn kho: </span>
              <span
                className={`${
                  (currentProduct.totalStockQuantity ||
                    currentProduct.stockQuantity ||
                    0) > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {(currentProduct.totalStockQuantity ||
                  currentProduct.stockQuantity ||
                  0) > 0
                  ? `${currentProduct.totalStockQuantity || currentProduct.stockQuantity || 0} sản phẩm`
                  : "Hết hàng"}
              </span>
            </div>

            {/* Đánh giá */}
            {(currentProduct.totalReviews || 0) > 0 && (
              <div className="mb-4">
                <span className="font-semibold text-gray-700">Đánh giá: </span>
                <span className="text-yellow-500">
                  {"★".repeat(Math.floor(currentProduct.averageRating || 0))}
                  {"☆".repeat(
                    5 - Math.floor(currentProduct.averageRating || 0),
                  )}
                </span>
                <span className="text-gray-600 ml-2">
                  ({(currentProduct.averageRating || 0).toFixed(1)}/5 -{" "}
                  {currentProduct.totalReviews || 0} đánh giá)
                </span>
              </div>
            )}

            {/* Variant Selection - Color & Size */}
            {currentProduct.productVariants &&
              currentProduct.productVariants.length > 0 && (
                <div className="mb-6">
                  {/* Color Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Màu sắc:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        ...new Set(
                          currentProduct.productVariants.map((v) => v.color),
                        ),
                      ].map((color) => {
                        const variant = currentProduct.productVariants.find(
                          (v) => v.color === color,
                        );
                        return (
                          <button
                            key={color}
                            onClick={() => {
                              setSelectedColor(color);
                              // Tìm variant phù hợp với color và size hiện tại
                              const matchingVariant =
                                currentProduct.productVariants.find(
                                  (v) =>
                                    v.color === color &&
                                    v.size === selectedSize,
                                ) ||
                                currentProduct.productVariants.find(
                                  (v) => v.color === color,
                                );
                              setSelectedVariant(matchingVariant);
                              if (matchingVariant)
                                setSelectedSize(matchingVariant.size);
                            }}
                            className={`px-4 py-2 rounded-lg border-2 transition-all ${
                              selectedColor === color
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-300 hover:border-blue-300"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              {variant?.colorCode && (
                                <div
                                  className="w-4 h-4 rounded-full border border-gray-300"
                                  style={{ backgroundColor: variant.colorCode }}
                                />
                              )}
                              <span>{color}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Size Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kích thước:
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        ...new Set(
                          currentProduct.productVariants
                            .filter(
                              (v) =>
                                !selectedColor || v.color === selectedColor,
                            )
                            .map((v) => v.size),
                        ),
                      ].map((size) => (
                        <button
                          key={size}
                          onClick={() => {
                            setSelectedSize(size);
                            // Tìm variant phù hợp với color và size
                            const matchingVariant =
                              currentProduct.productVariants.find(
                                (v) =>
                                  v.color === selectedColor && v.size === size,
                              );
                            if (matchingVariant)
                              setSelectedVariant(matchingVariant);
                          }}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            selectedSize === size
                              ? "border-blue-500 bg-blue-50 text-blue-700"
                              : "border-gray-300 hover:border-blue-300"
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Variant Info */}
                  {selectedVariant && (
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Đã chọn:</span>{" "}
                        {selectedVariant.color} - {selectedVariant.size}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Giá:</span>{" "}
                        {formatVND(selectedVariant.price)}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-semibold">Tồn kho:</span>{" "}
                        <span
                          className={
                            selectedVariant.stockQuantity > 0
                              ? "text-green-600"
                              : "text-red-600"
                          }
                        >
                          {selectedVariant.stockQuantity > 0
                            ? `${selectedVariant.stockQuantity} sản phẩm`
                            : "Hết hàng"}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              )}

            {/* Quantity selector - chỉ hiển thị nếu còn hàng */}
            {(currentProduct.totalStockQuantity ||
              currentProduct.stockQuantity ||
              0) > 0 && (
              <div className="quantity-section mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số lượng:
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-12 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="action-buttons space-y-3">
              <button
                onClick={handleAddToCart}
                disabled={
                  !selectedVariant ||
                  (selectedVariant && selectedVariant.stockQuantity === 0)
                }
                className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
                  selectedVariant && selectedVariant.stockQuantity > 0
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {!selectedVariant
                  ? "Vui lòng chọn màu sắc và kích thước"
                  : selectedVariant.stockQuantity > 0
                    ? "Thêm vào giỏ hàng"
                    : "Hết hàng"}
              </button>
              <button className="flex gap-2 items-center justify-center py-2 bg-transparent text-gray-800 hover:text-red-500 transition-colors">
                <MdFavoriteBorder className="text-3xl" />
                Thêm vào yêu thích
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
