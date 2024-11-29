import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Papa from "papaparse";
import productsCSV from "./data/products.csv";
import purchasesCSV from "./data/purchase_history.csv";

// Lazy-loaded components
const LoginPage = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductPage = lazy(() => import("./pages/ProductPage"));
const CartPage = lazy(() => import("./pages/CartPage"));

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
        <Header
          user={user}
          setUser={setUser}
          cartData={cartData}
          setCartData={setCartData}
        />
        <div className="main-content">
          {/* Suspense for Lazy Loading */}
          <Suspense fallback={<div>Loading...</div>}>
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
              {/* Home */}
              <Route
                path="/"
                element={
                  <HomePage
                    user={user}
                    notPurchased={notPurchased}
                    purchased={purchased}
                    products={products}
                    recomandedProducts={recomandedProducts}
                    cartData={cartData}
                    setCartData={setCartData}
                  />
                }
              />

              {/* Protected Routes */}
              {user ? (
                <>
                  <Route
                    path="/products"
                    element={
                      <ProductPage
                        user={user}
                        products={[...notPurchased, ...purchased]}
                        cartData={cartData}
                        setCartData={setCartData}
                      />
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <CartPage
                        user={user}
                        cartData={cartData}
                        setCartData={setCartData}
                      />
                    }
                  />
                </>
              ) : (
                <Route path="*" element={<Navigate to="/login" />} />
              )}
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;