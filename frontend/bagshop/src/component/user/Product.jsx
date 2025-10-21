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
} from "../../redux/slices/ProductSlice";
import { ADD_TO_CART, FETCH_CARTS } from "../../redux/slices/CartSlice";

const Product = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectProductLoading);
  const error = useSelector(selectProductError);
  const { accountId } = useSelector((state) => state.auth);
  const [sortBy, setSortBy] = useState("default");
  const [favorites, setFavorites] = useState([]);
  const [selectOption, setSelectOption] = useState([]);

  useEffect(() => {
    dispatch(FETCH_PRODUCTS());
  }, [dispatch]);

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelection = (productId, type, value) => {
    setSelectOption((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [type]: value,
      },
    }));
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

    const cartRequest = {
      items: [
        {
          productId: product.id,
          quantity: 1,
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

  const colorMap = {
    black: "bg-black",
    brown: "bg-amber-800",
    white: "bg-white border border-gray-300",
    green: "bg-green-600",
    beige: "bg-amber-200",
    red: "bg-red-600",
    navy: "bg-blue-900",
    pink: "bg-pink-400",
    blue: "bg-blue-500",
    yellow: "bg-yellow-400",
    purple: "bg-purple-500",
    gray: "bg-gray-500",
    orange: "bg-orange-500",
  };

  // Function to get color class with fallback
  const getColorClass = (color) => {
    return (
      colorMap[color?.toLowerCase()] || "bg-gray-300 border border-gray-400"
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="flex items-center font-bold gap-2 text-gray-700 mb-4 sm:mb-0">
            <RiFilterLine size={20} />
            <span>LỌC</span>
          </div>
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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600">Đang tải sản phẩm...</div>
          </div>
        )}

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
            {products && Array.isArray(products) && products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl group relative"
                >
                  <div className="relative">
                    <Link to={`/product/${product.id}`}>
                      <div className="relative w-full h-64">
                        {product.image ? (
                          <img
                            src={product.image[0]}
                            alt={product.name || "Product"}
                            className="w-full h-64 object-cover cursor-pointer"
                            onError={(e) => {
                              // Hide the broken image and show placeholder div
                              e.target.style.display = "none";
                              const placeholder =
                                e.target.parentElement.querySelector(
                                  ".placeholder-div"
                                );
                              if (placeholder) {
                                placeholder.style.display = "flex";
                              }
                            }}
                          />
                        ) : null}
                        {/* Placeholder div - shown when no image or image fails to load */}
                        <div
                          className="placeholder-div absolute inset-0 w-full h-64 bg-gray-200 flex items-center justify-center cursor-pointer"
                          style={{ display: product.image ? "none" : "flex" }}
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
                    {/* Sizes - only show if sizes exist */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-600">
                          Kích thước:
                        </span>
                        <div className="flex gap-2">
                          {product.sizes.map((size) => (
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
                    )}

                    {/* Colors - only show if colors exist */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm text-gray-600">Màu sắc:</span>
                        <div className="flex gap-2">
                          {product.colors.map((color) => (
                            <button
                              key={color}
                              onClick={() =>
                                handleSelection(product.id, "color", color)
                              }
                              className={`w-6 h-6 rounded-full ${getColorClass(
                                color
                              )} ${
                                selectOption[product.id]?.color === color
                                  ? "ring-2 ring-purple-600 ring-offset-2"
                                  : ""
                              } hover:ring-2 hover:ring-purple-600 hover:ring-offset-2 transition-all`}
                              title={color}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                    <p className="text-lg font-bold text-gray-800 mt-2">
                      {product.price ? `${product.price} VNĐ` : "Liên hệ"}
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
    </div>
  );
};

export default Product;
