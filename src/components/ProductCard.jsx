import React from "react";
import "../style/ProductCard.css";
import { FaPlus, FaMinus, FaShoppingBag } from "react-icons/fa";

const ProductCard = ({ product, cartData, setCartData }) => {
  const updateCart = (productDetails, change) => {
    setCartData((prev) => {
      const existingProduct = prev.find(
        (item) => item.ProductID === productDetails.ProductID
      );

      if (existingProduct) {
        const updatedCart = prev.map((item) =>
          item.ProductID === productDetails.ProductID
            ? { ...item, Quantity: Math.max(0, item.Quantity + change) }
            : item
        );
        return updatedCart.filter((item) => item.Quantity > 0); // Remove items with Quantity 0
      } else if (change > 0) {
        return [...prev, { ...productDetails, Quantity: 1 }];
      }
      return prev;
    });
  };

  const cartQuantity = React.useMemo(() => {
    const productInCart = cartData.find(
      (item) => item.ProductID === product.ProductID
    );
    return productInCart ? productInCart.Quantity : 0;
  }, [cartData, product.ProductID]);

  return (
    <div className="product-card">
      <div className="product-details">
        <img
          className="product-image"
          src={product.ImageURL}
          alt={product.ProductName}
        />
        <div className="product-info">
          <h4 className="product-name">{product.ProductName}</h4>
          <p className="product-category">{product.Category}</p>
          <p className="product-price">₹{product.Price}</p>
        </div>
      </div>

        {cartQuantity === 0 && (
          <div className="cart-actions">
          <button onClick={() => updateCart(product, 1)} className="add-button" style={{backgroundColor:"#0056b3",color:"#fff"}}>
            {/* <FaPlus /><FaShoppingBag />*/}<FaShoppingBag /> {" "} Add To Cart
          </button>
          </div>
        )}

        {cartQuantity > 0 && (
          <div className="cart-actions">
            <button
              onClick={() => updateCart(product, 1)}
              className="add-button"
            >
              <FaPlus /> {/* Add To Cart */}
            </button>
            <div className="cart-summary">
              {/*<FaShoppingBag />*/} <span>{cartQuantity}</span>
            </div>
            <button
              onClick={() => updateCart(product, -1)}
              className="remove-button"
            >
              <FaMinus /> {/* Remove */}
            </button>
          </div>
        )}
    </div>
  );
};

export default ProductCard;
