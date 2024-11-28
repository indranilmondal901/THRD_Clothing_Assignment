import React, { useEffect, useState } from "react";
import "../style/Header.css";
import {
  FaHome,
  FaShoppingBag,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ user, setUser, cartData, setCartData }) => {
  const [totalCartItems, setTotalCartItems] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = () => {
    setUser(null);
    setCartData([]);
    navigate("/login");
  };

  useEffect(() => {
    const totalItems = cartData.reduce((sum, item) => sum + item.Quantity, 0);
    setTotalCartItems(totalItems);
  }, [cartData]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark custom-navbar">
      <div className="container-fluid">
        {/* Logo */}
        <span className="navbar-brand" onClick={() => navigate("/")}>
          Shopping Store
        </span>

        {/* Toggle Button for Mobile View */}
        <button
          className="navbar-toggler"
          type="button"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div
          className={`collapse navbar-collapse ${
            isMenuOpen ? "show" : ""
          }`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            {/* Home */}
            <li className="nav-item">
              <span className="nav-link" onClick={() => { navigate("/"); closeMenu(); }}>
                <FaHome className="me-1" />
                Home
              </span>
            </li>

            {/* Product */}
            {user && user.UserID && (
              <li className="nav-item">
                <span
                  className="nav-link"
                  onClick={() => { navigate("/products"); closeMenu(); }}
                >
                  <FaShoppingBag className="me-1" />
                  Product
                </span>
              </li>
            )}

            {/* Cart */}
            {user && user.UserID && (
              <li className="nav-item">
                <span
                  className="nav-link"
                  onClick={() => { navigate("/cart"); closeMenu(); }}
                >
                  <FaShoppingBag className="me-1" />
                  Cart{" "}
                  {totalCartItems > 0 && (
                    <span className="round-span">{totalCartItems || 0}</span>
                  )}
                </span>
              </li>
            )}

            {/* User */}
            {user && (
              <li className="nav-item">
                <span className="nav-link">
                  <FaUser className="me-1" />
                  {user.Username ? (
                    <span className="userName" style={{ color: "red" }}>
                      {user.Username}
                    </span>
                  ) : (
                    "User"
                  )}
                </span>
              </li>
            )}

            {/* Logout */}
            {user ? (
              <li className="nav-item">
                <span
                  className="nav-link"
                  onClick={() => { logoutHandler(); closeMenu(); }}
                >
                  <FaSignOutAlt className="me-1" />
                  Logout
                </span>
              </li>
            ) : (
              <li className="nav-item">
                <span
                  className="nav-link"
                  onClick={() => { navigate("/login"); closeMenu(); }}
                >
                  <FaSignInAlt className="me-1" />
                  LogIn
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;