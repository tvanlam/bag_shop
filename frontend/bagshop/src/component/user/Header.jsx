import React, { useState, useEffect, useRef } from "react";
import menuItems from "../../data/menuItems";
import logoBag from "../../assets/logoBag.png";
import { GrFavorite } from "react-icons/gr";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { SlUser } from "react-icons/sl";
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT } from "../../redux/slices/AuthSlice";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "../modal/AuthModal";
import { FETCH_CARTS } from "../../redux/slices/CartSlice";
import UserAvatar from "./UserAvatar";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [openAuth, setOpenAuth] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const dispatch = useDispatch();
  const { accountId } = useSelector((state) => state.auth);
  const { carts } = useSelector((state) => state.cart);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (accountId) {
      dispatch(FETCH_CARTS());
    }
  }, [dispatch, accountId]);

  const handleLogout = (myId) => {
    dispatch(LOGOUT(myId))
      .unwrap()
      .then(() => setOpenDropdown(false));
  };

  // Tính tổng số lượng sản phẩm trong giỏ hàng
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
          isScrolled ? "bg-gray-500 shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container px-8 py-6 mx-auto flex items-center justify-center relative">
          {/* Logo */}
          <div className="flex items-center absolute left-8">
            <img
              src={logoBag}
              alt="Logo"
              className="h-16 w-auto object-contain"
            />
          </div>

          <nav className="flex space-x-12">
            {menuItems.map((item) =>
              item.href.startsWith("#") ? (
                <a
                  key={item.label}
                  href={item.href}
                  className={`transition-colors duration-200 ${
                    isScrolled
                      ? "text-gray-600 hover:text-blue-600"
                      : "text-white hover:text-pink-300"
                  }`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`transition-colors duration-200 ${
                    isScrolled
                      ? "text-gray-600 hover:text-blue-600"
                      : "text-white hover:text-pink-300"
                  }`}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center absolute right-12 space-x-6">
            <div
              className={`cursor-pointer transition-colors duration-200 ${
                isScrolled
                  ? "text-gray-600 hover:text-blue-600"
                  : "text-white hover:text-pink-300"
              }`}
            >
              <GrFavorite size={22} />
            </div>

            <div
              className={`cursor-pointer transition-colors duration-200 relative ${
                isScrolled
                  ? "text-gray-600 hover:text-blue-600"
                  : "text-white hover:text-pink-300"
              }`}
            >
              <Link to="/cart" className="relative">
                <HiOutlineShoppingCart size={22} />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {totalQuantity}
                </span>
              </Link>
            </div>

            {!accountId ? (
              // ✅ Chưa login → hiện icon
              <div
                onClick={() => setOpenAuth(true)}
                className={`cursor-pointer transition-colors duration-200 ${
                  isScrolled
                    ? "text-gray-600 hover:text-blue-600"
                    : "text-white hover:text-pink-300"
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
                <UserAvatar accountId={accountId} isScrolled={isScrolled} />

                {openDropdown && (
                  <div
                    className="absolute right-0 mt-2 w-56 rounded-xl
                    backdrop-blur-md bg-gray-800/40 shadow-xl border border-gray-200/30"
                  >
                    <ul className="py-2 text-gray-100">
                      <Link to={"/profile"}>
                        <li className="px-4 py-2 hover:bg-gray-700/40 cursor-pointer">
                          Hồ sơ cá nhân
                        </li>
                      </Link>
                      <li className="px-4 py-2 hover:bg-gray-700/40 cursor-pointer">
                        Lịch sử mua hàng
                      </li>
                      <li
                        onClick={() => handleLogout(accountId)}
                        className="px-4 py-2 hover:bg-gray-700/40 cursor-pointer text-red-400"
                      >
                        Đăng xuất
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <AuthModal open={openAuth} onClose={() => setOpenAuth(false)} />
    </>
  );
};

export default Header;
