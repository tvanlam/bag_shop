import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
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
import { selectIsAuthenticated } from "../../redux/slices/AuthSlice";
import { ADD_TO_CART, FETCH_CARTS } from "../../redux/slices/CartSlice";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductLoading);
  const error = useSelector(selectProductError);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const { accountId } = useSelector((state) => state.auth);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentProduct, setCurrentProduct] = useState(null);

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

    const cartRequest = {
      items: [
        {
          productId: currentProduct.id,
          quantity: quantity,
        },
      ],
    };

    dispatch(ADD_TO_CART({ accountId, cartRequest }))
      .unwrap()
      .then(() => {
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
      .catch(() => {
        toast.error("Thêm vào giỏ hàng thất bại!", {
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
              {formatVND(currentProduct.price)}
            </p>

            {/* Số lượng tồn kho */}
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Tồn kho: </span>
              <span
                className={`${
                  (currentProduct.stockQuantity || 0) > 0
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {(currentProduct.stockQuantity || 0) > 0
                  ? `${currentProduct.stockQuantity || 0} sản phẩm`
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
                    5 - Math.floor(currentProduct.averageRating || 0)
                  )}
                </span>
                <span className="text-gray-600 ml-2">
                  ({(currentProduct.averageRating || 0).toFixed(1)}/5 -{" "}
                  {currentProduct.totalReviews || 0} đánh giá)
                </span>
              </div>
            )}

            {/* Quantity selector - chỉ hiển thị nếu còn hàng */}
            {(currentProduct.stockQuantity || 0) > 0 && (
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
                disabled={(currentProduct.stockQuantity || 0) === 0}
                className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
                  (currentProduct.stockQuantity || 0) > 0
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {(currentProduct.stockQuantity || 0) > 0
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
