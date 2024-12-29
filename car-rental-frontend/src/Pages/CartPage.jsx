import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CartPage.css';


const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      // Retrieve user data from session storage
  const user = JSON.parse(sessionStorage.getItem('userProfile'));
      if (!user) return;

      try {
        const response = await axios.get(` http://localhost:3005/cart/${user.email}`);
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/cart/${id}`);
      setCartItems(cartItems.filter((item) => item._id !== id));
      alert('Item removed from cart.');
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const handleClearCart = async () => {
    const user = JSON.parse(sessionStorage.getItem('userProfile'));
  
    if (!user || !user.email) {
      alert('User not found. Please log in again.');
      return;
    }
  
    try {
      // Loop through all items in the cart and delete each by its id
      for (let item of cartItems) {
        await axios.delete(`http://localhost:3005/cart/${item._id}`);
      }
  
      // Clear the cart items in the frontend state after successful deletion
      setCartItems([]);
      alert('Cart cleared successfully!');
    } catch (error) {
      console.error('Error clearing cart:', error);
      alert('Error clearing cart. Please try again later.');
    }
  };
  
  
  

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item._id}>
                <h2>{item.name}</h2>
                <p>Type: {item.type}</p>
                <p>Price: ${item.price}</p>
                <button onClick={() => handleRemoveItem(item._id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={handleClearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default Cart;
