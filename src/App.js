import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";

import Papa from "papaparse";
import productsCSV from "./data/products.csv";
import purchasesCSV from "./data/purchase_history.csv";

const App = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [purchasedProducts, setPurchasedProducts] = useState([]);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (user && user.UserID) {
      // Load products
      Papa.parse(productsCSV, {
        header: true,
        download: true,
        complete: (result) => {
          setProducts(result.data);
        },
      });

      // Load purchase history
      Papa.parse(purchasesCSV, {
        header: true,
        download: true,
        complete: (result) => {
          const userPurchases = result.data.filter(
            (p) => p.UserID === user.UserID
          );
          const purchasedIDs = userPurchases.map((p) => p.ProductID);
          setPurchasedProducts(purchasedIDs);
        },
      });
    }
  }, [user]);

  // Filter products
  const categorizedProducts = () => {
    const purchased = [];
    const notPurchased = [];

    products.forEach((product) => {
      if (purchasedProducts.includes(product.ProductID)) {
        purchased.push(product);
      } else {
        notPurchased.push(product);
      }
    });

    let purchasedCategory = products
      .filter((sp) => purchased.some((se) => sp.ProductID === se.ProductID))
      .map((sp) => sp.Category);
    purchasedCategory = [...new Set(purchasedCategory)];
    // console.log(purchasedCategory);

    return {
      notPurchased: notPurchased.sort((a, b) => {
        const nameA = a.ProductName || "";
        const nameB = b.ProductName || "";
        return nameA.localeCompare(nameB);
      }),
      purchased: purchased.sort((a, b) => {
        const nameA = a.ProductName || "";
        const nameB = b.ProductName || "";
        return nameA.localeCompare(nameB);
      }),
      recomandedProducts: notPurchased.filter((sp) =>
        purchasedCategory.includes(sp.Category)
      ),
    };
  };
  const { notPurchased, purchased, recomandedProducts } = categorizedProducts();
  

  return (
    <Router>
      <div className="app-container">
        <Header user={user} setUser={setUser} cartData={cartData}/>
        <div className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/login"
              element={
                !user ? (
                  <LoginPage onLoginSuccess={setUser} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            {/* Protected Routes */}
            {user ? (
              <>
                <Route
                  path="/"
                  element={
                    <HomePage
                      user={user}
                      notPurchased={notPurchased}
                      purchased={purchased}
                      recomandedProducts={recomandedProducts}
                      cartData={cartData}
                      setCartData={setCartData}
                    />
                  }
                />
                <Route path="/products" element={<ProductPage user={user} products={products} cartData={cartData} setCartData={setCartData}/>} />
                <Route path="/cart" element={<CartPage user={user} cartData={cartData} setCartData={setCartData}/>} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" />} />
            )}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
