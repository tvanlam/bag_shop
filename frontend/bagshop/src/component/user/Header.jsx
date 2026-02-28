import React, { useState, useEffect, useRef } from "react";
import menuItems from "../../data/menuItems";
import logoBag from "../../assets/logoBag.png";
import { GrFavorite } from "react-icons/gr";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { SlUser } from "react-icons/sl";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../redux/slices/AuthSlice";
import { Link, useLocation } from "react-router-dom";
import AuthModal from "../modal/AuthModal";
import { FETCH_CARTS } from "../../redux/slices/CartSlice";
import { Avatar } from "antd";
import {
  UserOutlined,
  ShoppingOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const timeoutRef = useRef(null);
  const location = useLocation();

  const dispatch = useDispatch();
  const { accountId } = useSelector((state) => state.auth);
  const { carts } = useSelector((state) => state.cart);
  const { account } = useSelector((state) => state.account); // nếu có thông tin người dùng

  // Kiểm tra xem có phải HomePage không
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (accountId) {
      dispatch(FETCH_CARTS(accountId));
    }
  }, [dispatch, accountId]);

  const handleLogout = (myId) => {
    dispatch(LOGOUT(myId))
      .unwrap()
      .then(() => setOpenDropdown(false));
  };

  const totalCartItems = Array.isArray(carts)
    ? carts.reduce((total, item) => total + (item.quantity || 0), 0)
    : 0;

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(false);
    }, 300);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHomePage
            ? isScrolled
              ? "bg-gray-500 shadow-lg"
              : "bg-transparent"
            : "bg-gray-500 shadow-lg"
        }`}
      >
        <div className="container px-4 py-2 md:px-8 md:py-3 lg:py-4 mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="inline-flex items-center cursor-pointer">
              <img
                src={logoBag}
                alt="BagShop logo"
                className="h-12 w-auto object-contain md:h-16 lg:h-20"
              />
            </Link>
          </div>

          {/* Menu desktop */}
          <nav className="hidden md:flex space-x-8 lg:space-x-12 flex-1 justify-center">
            {menuItems.map((item) =>
              item.href.startsWith("#") ? (
                <a
                  key={item.label}
                  href={item.href}
                  className={`whitespace-nowrap text-sm lg:text-base transition-colors duration-200 ${
                    isHomePage
                      ? isScrolled
                        ? "text-gray-600 hover:text-blue-600"
                        : "text-white hover:text-pink-300"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`whitespace-nowrap text-sm lg:text-base transition-colors duration-200 ${
                    isHomePage
                      ? isScrolled
                        ? "text-gray-600 hover:text-blue-600"
                        : "text-white hover:text-pink-300"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          {/* Icon + user */}
          <div className="flex items-center space-x-4 md:space-x-6">
            <div
              className={`cursor-pointer transition-colors duration-200 ${
                isHomePage
                  ? isScrolled
                    ? "text-gray-600 hover:text-blue-600"
                    : "text-white hover:text-pink-300"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <Link to="/wishlist">
                <GrFavorite size={22} />
              </Link>
            </div>

            <div
              className={`cursor-pointer transition-colors duration-200 relative ${
                isHomePage
                  ? isScrolled
                    ? "text-gray-600 hover:text-blue-600"
                    : "text-white hover:text-pink-300"
                  : "text-gray-600 hover:text-blue-600"
              }`}
            >
              <Link to="/cart" className="relative">
                <HiOutlineShoppingCart size={22} />
                {accountId && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalCartItems}
                  </span>
                )}
              </Link>
            </div>

            {!accountId ? (
              <div
                onClick={() => setOpenAuth(true)}
                className={`cursor-pointer transition-colors duration-200 ${
                  isHomePage
                    ? isScrolled
                      ? "text-gray-600 hover:text-blue-600"
                      : "text-white hover:text-pink-300"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <SlUser size={20} />
              </div>
            ) : (
              <div
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <Avatar
                  size={32}
                  icon={<UserOutlined />}
                  src={account?.avatarUrl || undefined}
                  style={{
                    backgroundColor: isHomePage
                      ? isScrolled
                        ? "#f0f0f0"
                        : "#ffffff"
                      : "#f0f0f0",
                    color: "#555",
                    cursor: "pointer",
                  }}
                />

                {openDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-64 rounded-xl
                    backdrop-blur-md bg-gray-800/40 shadow-xl border border-gray-200/30"
                  >
                    <div className="py-2">
                      {/* Thông tin người dùng */}
                      <div className="px-4 py-3 border-b border-gray-600/50">
                        <p className="text-white font-semibold text-sm">
                          {account?.fullName || "Người dùng"}
                        </p>
                        <p className="text-gray-300 text-xs mt-1">
                          {account?.email || ""}
                        </p>
                      </div>

                      {/* Menu items */}
                      <ul className="py-2 text-gray-100">
                        <Link to="/profile">
                          <li className="px-4 py-2.5 hover:bg-gray-700/40 cursor-pointer flex items-center gap-3 transition-colors">
                            <FaUserCircle size={18} className="text-blue-400" />
                            <span>Hồ sơ cá nhân</span>
                          </li>
                        </Link>

                        <Link to="/order">
                          <li className="px-4 py-2.5 hover:bg-gray-700/40 cursor-pointer flex items-center gap-3 transition-colors">
                            <ShoppingOutlined
                              className="text-green-400"
                              style={{ fontSize: "18px" }}
                            />
                            <span>Đơn hàng của tôi</span>
                          </li>
                        </Link>

                        <Link to="/settings">
                          <li className="px-4 py-2.5 hover:bg-gray-700/40 cursor-pointer flex items-center gap-3 transition-colors">
                            <SettingOutlined
                              className="text-purple-400"
                              style={{ fontSize: "18px" }}
                            />
                            <span>Cài đặt</span>
                          </li>
                        </Link>

                        {/* Divider */}
                        <div className="border-t border-gray-600/50 my-2"></div>

                        <li
                          onClick={() => handleLogout(accountId)}
                          className="px-4 py-2.5 hover:bg-red-500/20 cursor-pointer flex items-center gap-3 text-red-400 transition-colors"
                        >
                          <LogoutOutlined style={{ fontSize: "18px" }} />
                          <span>Đăng xuất</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Nút menu mobile */}
            <button
              className={`md:hidden inline-flex items-center justify-center p-1.5 rounded-md border border-transparent transition-colors duration-200 ${
                isHomePage
                  ? isScrolled
                    ? "text-gray-800 hover:text-blue-600 hover:border-blue-200 bg-white/80"
                    : "text-white hover:text-pink-300 hover:border-pink-200 bg-white/10"
                  : "text-gray-800 hover:text-blue-600 hover:border-blue-200 bg-white"
              }`}
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <nav className="container mx-auto px-4 py-3 flex flex-col space-y-2">
              {menuItems.map((item) =>
                item.href.startsWith("#") ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="py-2 text-sm text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>
          </div>
        )}
      </header>

      <AuthModal open={openAuth} onClose={() => setOpenAuth(false)} />
    </>
  );
};

export default Header;
