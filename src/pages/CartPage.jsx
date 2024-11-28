import React, { useEffect, useState } from "react";
import "../style/CartPage.css";
import { useNavigate } from "react-router-dom";

const CartPage = ({ cartData, setCartData }) => {
  const [totalCartItems, setTotalCartItems] = useState(0);

  const navigate = useNavigate();

  const incrementQuantity = (productID) => {
    setCartData((prev) =>
      prev.map((item) =>
        item.ProductID === productID
          ? { ...item, Quantity: item.Quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = (productID) => {
    setCartData((prevCart) =>
      prevCart
        .map((item) => {
          if (item.ProductID === productID) {
            return item.Quantity > 1 
              ? { ...item, Quantity: item.Quantity - 1 } 
              : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };
  

  const removeProduct =(productID)=>{
    setCartData((prev) =>prev.filter((item) => item.ProductID !== productID));
  }

  const totalCost = cartData.reduce(
    (total, item) => total + item.Price * item.Quantity,
    0
  );

  useEffect(()=>{
    const totalItems = cartData.reduce((sum, item) => sum + item.Quantity, 0);
    setTotalCartItems(totalItems);
  },[cartData]);

  return (
    <div className="shopping-cart">
      <div className="cart-items">
        <h2>Shopping Cart</h2>
        <p>{totalCartItems} Items</p>

        <table className="cart-table">
          <thead>
            <tr>
              <th>Product Details</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {cartData.map((item) => (
              <tr key={item.ProductID}>
                <td>
                  <div className="product-details">
                    <img src={item.ImageURL} alt={item.ProductName} />
                    <div>
                      <h4>{item.ProductName}</h4>
                      <p>{item.Category}</p>
                      <button onClick={() => removeProduct(item.ProductID)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="Quantity-controls">
                    <button onClick={() => decrementQuantity(item.ProductID)}>
                      -
                    </button>
                    <span>{item.Quantity}</span>
                    <button onClick={() => incrementQuantity(item.ProductID)}>
                      +
                    </button>
                  </div>
                </td>
                <td>Rs. {item.Price/* .toFixed(2) */}</td>
                <td>Rs.{(item.Price * item.Quantity)/* .toFixed(2) */}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="continue-shopping" onClick={()=>{navigate("/products")}}>← Continue Shopping</button>
      </div>

      <div className="order-summary">
        <h2>Order Summary</h2>
        <p>Items: {totalCartItems}</p>
        <p>Cart Value - Rs. {totalCost}</p>
        <p>Shipping: Standard Delivery - Rs. 5.00</p>
        {/* <p>Promo Code:</p>
        <input type="text" placeholder="Enter your code" />
        <button>Apply</button> */}
        <h3>Total Cost: Rs.{(totalCost + 5).toFixed(2)}</h3>
        <button className="checkout-button">Checkout</button>
      </div>
    </div>
  );
};

export default CartPage;
