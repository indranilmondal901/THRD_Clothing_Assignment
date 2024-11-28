import React from "react";
import "../style/HomePage.css";
import ProductCard from "../components/ProductCard";

/* ----------------------------- swipper --------------------------------------------- */
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Autoplay, Pagination, Navigation } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const HomePage = ({ user, notPurchased, purchased, recomandedProducts, cartData, setCartData }) => {
  const navigate = useNavigate();

  return (
    <>
      <section className="banner"></section>
      {/* <h2>Welcome, {user.Username}</h2> */}
      <div className="recomandation-section">
        <div className="product-block-heading">
          <h5>Hand-picked recomandation based on your purchased history</h5>
          <span onClick={() => navigate("/products")}>
            Show All
          </span>
        </div>

        {/* Recomandation section */}
        <div>
          <div className="grid-container">
            {recomandedProducts.map((product) => (
              <ProductCard key={product.ProductID} product={product} cartData={cartData} setCartData={setCartData}/>
            ))}
          </div>
        </div>
      </div>

      {/* not Purchased Products (Carousel) */}
      <div className="explore-section">
        <div className="product-block-heading">
          <h5> Explore Our Store</h5>
          <span onClick={() => navigate("/products")}>
            Show All
          </span>
        </div>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          freeMode={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination,Autoplay]}
          className="mySwiper"
        >
          {notPurchased.map((product) => (
            <SwiperSlide key={product.ProductID}>
              <ProductCard product={product} cartData={cartData} setCartData={setCartData}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default HomePage;
