import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFacebookF, FaTwitter, FaInstagram, FaRegHeart, FaHeart } from "react-icons/fa";
import { IoLogOutOutline, IoPersonSharp } from 'react-icons/io5';
import { LuShoppingCart } from 'react-icons/lu';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link as ScrollLink } from 'react-scroll';
import auth from '../FirebaseConfig';
import { signOut } from 'firebase/auth';
import { FaTimes } from "react-icons/fa";

const LogoutConfirmation = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <h3 className="text-lg font-medium text-gray-900 mb-4">Logout</h3>
        <p className="text-sm text-gray-600 mb-6">Are you sure you want to logout?</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#4F46E5] rounded-md text-sm font-medium text-white hover:bg-[#4338CA]"
          >
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
};

const Header = () => {
  const [searchText, setSearchText] = useState("");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [user, setUser] = useState(null);
  const cart = useSelector((state) => state.cart || []);
  const navigate = useNavigate();
  const wishlist = useSelector((state) => state.wishlist || []);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // في دالة handleSearch
  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchText.trim();

    // الانتقال إلى أعلى الصفحة أولاً
    window.scrollTo(0, 0);

    if (query) {
      navigate(`/?search=${query}#products-section`);
    } else {
      navigate('/#products-section');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowLogoutConfirm(false);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.account-dropdown')) {
        closeDropdown();
      }
    };

    if (dropdownOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [dropdownOpen]);

const renderAccountSection = () => {
  if (user) {
    return (
      <div className="relative account-dropdown">
        <div
          onClick={toggleDropdown}
          className="flex items-center gap-2 cursor-pointer hover:text-[#4F46E5]"
        >
          <span className="hidden md:block text-sm font-semibold text-[#423c86]">
            {user.displayName || user.email.split('@')[0]}
          </span>
          <div className="w-8 h-8 rounded-full bg-[#4F46E5] flex items-center justify-center text-white">
            {(user.displayName || user.email).charAt(0).toUpperCase()}
          </div>
        </div>
        {dropdownOpen && (
          <motion.div
            className="absolute top-12 right-0 bg-white border shadow-md rounded-md w-40 text-sm z-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <button
              onClick={() => {
                closeDropdown();
                setShowLogoutConfirm(true);
              }}
              className="w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-gray-100"
            >
              Logout <IoLogOutOutline />
            </button>
          </motion.div>
        )}
      </div>
    );
  } else {
    return (
      <Link to="/register" className="hover:text-[#4F46E5] transition duration-300">
        <IoPersonSharp />
      </Link>
    );
  }
};

  return (
    <>
      {showLogoutConfirm && (
        <LogoutConfirmation
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}

      <motion.header
        className="border-b text-sm sticky top-0 z-40 bg-white shadow-sm"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="bg-[#0F172A] text-white px-4 md:px-16 py-2 flex justify-between items-center text-xs">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Free shipping on orders over $50
          </motion.p>
          <div className="flex gap-4 text-white text-sm">
            <motion.a
              href="https://www.facebook.com/husseinabdalla010"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: "#9CA3AF" }}
              whileTap={{ scale: 0.9 }}
            >
              <FaFacebookF className="cursor-pointer" />
            </motion.a>
            <motion.a
              href="https://x.com/Hussein99432152"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: "#9CA3AF" }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTwitter className="cursor-pointer" />
            </motion.a>
            <motion.a
              href="https://www.instagram.com/husseinabdalla010/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2, color: "#9CA3AF" }}
              whileTap={{ scale: 0.9 }}
            >
              <FaInstagram className="cursor-pointer" />
            </motion.a>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center px-4 md:px-24 py-4 gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-2xl font-bold text-[#4F46E5]">
              <motion.span
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Shop<span className="text-black">Ease</span>
              </motion.span>
            </Link>

            <div className="flex gap-4 md:hidden text-xl text-gray-800">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                {renderAccountSection()}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
              >
                <Link to="/wishlist" className="relative hover:text-[#4F46E5] transition duration-300">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {wishlist.length > 0 ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 500 }}
                      >
                        <FaHeart className="text-[#ff4081]" />
                      </motion.div>
                    ) : (
                      <FaRegHeart />
                    )}
                  </motion.div>
                  <motion.span
                    className="absolute -top-2 -right-2 text-xs bg-[#4F46E5] text-white w-5 h-5 rounded-full flex items-center justify-center"
                    key={`mobile-wishlist-${wishlist.length}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 10 }}
                  >
                    {wishlist.length}
                  </motion.span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.1 }}
              >
                <Link to="/cart" className="relative hover:text-[#4F46E5] transition duration-300">
                  <LuShoppingCart />
                  <motion.span
                    className="absolute -top-2 -right-2 text-xs bg-[#4F46E5] text-white w-5 h-5 rounded-full flex items-center justify-center"
                    key={`mobile-cart-${cart.length}`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500 }}
                  >
                    {cart.length}
                  </motion.span>
                </Link>
              </motion.div>
            </div>
          </div>

          <motion.form
            onSubmit={handleSearch}
            className="relative w-full md:w-1/3 min-w-[250px] order-last md:order-none"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search products or categories..."
              className="w-full border rounded-full px-4 py-2 md:py-3 pr-12 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-[#4F46E5]"
            />
            <motion.button
              type="submit"
              className="absolute right-0 top-0 h-full px-4 bg-[#4F46E5] text-white rounded-r-full flex items-center justify-center"
              whileHover={{ backgroundColor: "#4338CA" }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSearch />
            </motion.button>

            {searchText && (
              <motion.button
                type="button"
                onClick={() => {
                  setSearchText("");
                  navigate("/#products-section");
                }}
                className="absolute right-12 top-0 h-full px-4 text-gray-400"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </motion.button>
            )}
          </motion.form>


          <nav className="hidden md:flex gap-6 text-gray-800 text-[16px] font-medium">
            <div>
              <Link to="/" className="block hover:text-[#4F46E5] transition duration-300">
                Home
              </Link>
            </div>
            <div>
              <Link to="/shop" className="block hover:text-[#4F46E5] transition duration-300">
                Shop
              </Link>
            </div>
            <div>
              <Link to="/categories" className="block hover:text-[#4F46E5] transition duration-300">
                Categories
              </Link>
            </div>
            <div>
              <ScrollLink
                to="about"
                smooth={true}
                duration={500}
                offset={-100}
                className="block hover:text-[#4F46E5] transition duration-300 cursor-pointer"
              >
                About
              </ScrollLink>
            </div>
          </nav>

          <div className="hidden md:flex gap-6 text-xl text-gray-800 items-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              {renderAccountSection()}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <Link to="/wishlist" className="relative hover:text-[#4F46E5] transition duration-300">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  {wishlist.length > 0 ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500 }}
                    >
                      <FaHeart className="text-[#ff4081]" />
                    </motion.div>
                  ) : (
                    <FaRegHeart />
                  )}
                </motion.div>
                <motion.span
                  className="absolute -top-2 -right-2 text-xs bg-[#4F46E5] text-white w-5 h-5 rounded-full flex items-center justify-center"
                  key={`desktop-wishlist-${wishlist.length}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 10 }}
                >
                  {wishlist.length}
                </motion.span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.1 }}
            >
              <Link to="/cart" className="relative hover:text-[#4F46E5] transition duration-300">
                <LuShoppingCart />
                <motion.span
                  className="absolute -top-2 -right-2 text-xs bg-[#4F46E5] text-white w-5 h-5 rounded-full flex items-center justify-center"
                  key={`desktop-cart-${cart.length}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  {cart.length}
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>
    </>
  );
};

export default Header;
