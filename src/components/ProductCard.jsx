import React from "react";
import { FaPlus, FaMinus, FaShoppingBag } from "react-icons/fa";

const ProductCard = ({ product, cartData, setCartData }) => {
/* Add to cart */
const AddToCart = (productDetails) => {
  setCartData((prev) => {
    const existingProduct = prev.find(item => item.ProductID === productDetails.ProductID);
    
    if (existingProduct) {
      return prev.map(item => 
        item.ProductID === productDetails.ProductID 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
    } else {
      return [...prev, { ...productDetails, quantity: 1 }];
    }
  });
};
/* remove from cart */
const RemoveFromCart = (productDetails) => {
  setCartData((prev) => {
    return prev.map(item => {
      if (item.ProductID === productDetails.ProductID) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return null;
        }
      }
      return item;
    }).filter(item => item !== null);
  });
};

let cartQuantity =(productId)=>{
  console.log(38)
  if(cartData.length === 0) {return 0;}
  console.log(cartData);
  let data = cartData.find((item)=> item.ProductId === productId);
  console.log(data);
  return data.quantity || 0;
}

console.log(cartData);

  return (
    <div key={product.ProductID} className="product-card">
      <div className="product-details">
        <img className="product-image" src={product.ImageURL} alt={product.ProductName} />
        <div className="product-info">
          <h4 className="product-name">{product.ProductName}</h4>
          <p className="product-category">{product.Category}</p>
          <p className="product-price">₹{product.Price}</p>
        </div>
      </div>

      <div className="cart-actions">
        <button onClick={() => AddToCart(product)} className="add-button">
          <FaPlus /> Add To Cart
        </button>
        {cartQuantity(product.ProductId) > 0 && (
          <div className="cart-summary">
            <FaShoppingBag /> <span>{cartQuantity(product.ProductId)||""}</span> in Cart
            <button onClick={() => RemoveFromCart(product)} className="remove-button">
              <FaMinus /> Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;