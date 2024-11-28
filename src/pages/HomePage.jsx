import React from "react";
import "../style/HomePage.css";
import ProductCard from "../components/ProductCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode, Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const HomePage = ({
  user,
  notPurchased,
  recomandedProducts,
  products,
  cartData,
  setCartData,
}) => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome, {user?.Username || "Guest"}!</h1>
          <p>Discover exclusive products tailored just for you.</p>
          <div className="hero-buttons">
            <button
              onClick={() => navigate("/products")}
              className="shop-now-btn"
            >
              Shop Now
            </button>
            <button onClick={() => navigate("/cart")} className="view-cart-btn">
              View Cart
            </button>
          </div>
        </div>
      </section>
      {user && user.UserID ? (
        <>
          {/* Recommendation Section */}
          <section className="recommendations">
            <div className="section-header">
              <h2>Hand-picked Recommendations</h2>
              <span onClick={() => navigate("/products")}>View All</span>
            </div>
            <div className="grid-container">
              {recomandedProducts.map((product) => (
                <ProductCard
                  key={product.ProductID}
                  product={product}
                  cartData={cartData}
                  setCartData={setCartData}
                />
              ))}
            </div>
          </section>

          {/* Explore Section */}
          <section className="explore">
            <div className="section-header">
              <h2>Explore Our Store</h2>
              <span onClick={() => navigate("/products")}>View All</span>
            </div>
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              freeMode={true}
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              modules={[FreeMode, Autoplay, Pagination]}
              className="explore-swiper"
            >
              {notPurchased.map((product) => (
                <SwiperSlide key={product.ProductID}>
                  <ProductCard
                    product={product}
                    cartData={cartData}
                    setCartData={setCartData}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
        </>
      ) : (
        <>
          {/* Welcome Section for Guests */}
          <section className="welcome-guest">
            <div className="guest-content">
              <h2>Welcome to Our Store!</h2>
              <p>
                Explore our exclusive collection of products curated just for
                you.
              </p>
              <button
                onClick={() => navigate("/signup")}
                className="create-account-btn"
              >
                Create an Account
              </button>
            </div>
          </section>

          {/* Featured Products Section */}
          {/* <section className="featured-products">
            <div className="section-header">
              <h2>Login To See Our featured Products</h2>
              <span onClick={() => navigate("/products")}>Explore All</span>
            </div>
            <div className="grid-container">
              {products.slice(0, 6).map((product) => (
                <ProductCard
                  key={product.ProductID}
                  product={product}
                  cartData={cartData}
                  setCartData={setCartData}
                />
              ))}
            </div>
          </section> */}

          {/* Call to Action Section */}
          <section className="call-to-action">
            <h2>Join Us Today!</h2>
            <p>
              Sign up to unlock personalized recommendations, exclusive
              discounts, and more.
            </p>
            <button
              onClick={() => navigate("/signup")}
              className="join-now-btn"
            >
              Join Now
            </button>
          </section>
        </>
      )}
    </div>
  );
};

export default HomePage;
