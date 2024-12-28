import React, { useState } from 'react';
import './AddListingPage.css'; // Import CSS for styling
import { useNavigate } from 'react-router-dom';

const AddListingPage = () => {
  const navigate = useNavigate();

  // Retrieve user data from session storage
  const user = JSON.parse(sessionStorage.getItem('userProfile'));

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    description: '',
    seller: user ? user.username : '', // Seller is fetched from session storage
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to the backend
      const response = await fetch('http://localhost:3004/Car', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Listing added successfully!');
        navigate('/'); // Redirect to home page after successful submission
      } else {
        alert('Failed to add listing. Please try again.');
      }
    } catch (error) {
      console.error('Error adding listing:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="add-listing-container">
      <h1>Add New Listing</h1>
      <form onSubmit={handleSubmit} className="add-listing-form">
        <div className="form-group">
          <label htmlFor="name">Car Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Car Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price (per day):</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Seller:</label>
          <input
            type="text"
            value={formData.seller}
            readOnly
            className="readonly-input"
          />
        </div>
        <button type="submit" className="submit-btn">
          Add Listing
        </button>
      </form>
    </div>
  );
};

export default AddListingPage;
