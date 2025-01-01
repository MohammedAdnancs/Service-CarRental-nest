import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCarById } from '../services/carService';
import axios from 'axios'; // Axios for API calls
import './DetailsPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const DetailsPage = () => {

  const { id } = useParams(); // Get the car ID from the URL
  const [car, setCar] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State to toggle popup visibility
  const [review, setReview] = useState(''); // State to store review text
  const [reviews, setReviews] = useState([]); // State to store reviews
  const [hoveredStar, setHoveredStar] = useState(0); // Hovered star for preview
  const [selectedStar, setSelectedStar] = useState(0); // Selected star rating
  const [isEditing, setIsEditing] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [editCar, setEditCar] = useState({
      name: "",
      type: "",
      price: "",
      description: "",
      seller: "",
      pictures: "",
  }); // State to hold updated car data
  
  const CancelEditing = () => {
    setIsEditing(false);
    setImagePreview(null);
  };


  const handleEditCarClick = () => {
    setIsEditing(true);
    setEditCar({
      name: car.name || "",
      type: car.type || "",
      price: car.price || "",
      description: car.description || "",
      seller: car.seller || "",
      pictures: car.pictures || "",
      files: File,
    });
  };
  
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCar((prev) => ({
      ...prev,
      [name]: value || prev[name], // If value is empty, retain the old value
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first file
    if (file) {
      setEditCar((prev) => ({
        ...prev,
        pictures: file, // Store the file in the state
      }));
      
      // Create a preview URL and set it
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl); // Set the preview URL
    }
  };
  // Retrieve user data from session storage
  const user = JSON.parse(sessionStorage.getItem('userProfile'));

  //const UploadPath = "C:/User/LENOVO/Desktop/Service-CarRental-nest/car-service";

  // Fetch car details and reviews on component load
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const data = await getCarById(id);
        setCar(data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:3006/reviews/getallreviews', {
          params: { productId: id },
        });
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchCarDetails();
    fetchReviews();
  }, [id]);

  // Handle car rental
  const handleRentCar = async () => {
    if (!user) {
      alert('Please log in to rent a car!');
      return;
    }

    try {
      await axios.post('http://localhost:3005/cart/add', {
        userEmail: user.email,
        carId: car._id,
        name: car.name,
        type: car.type,
        price: car.price,
        description: car.description,
        seller: car.seller,
        pictures: car.pictures,
      });

      alert('Car added to your cart successfully!');
    } catch (error) {
      console.error('Error adding car to cart:', error);
      alert('Failed to add car to cart.');
    }
  };

  // Handle deleting a car listing
  const handleDeleteCar = async () => {

    if (!user) {
      alert('You must be logged in to delete this listing.');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this listing?');
    if (!confirmDelete) return;

    try {
      console.log(car._id)
      console.log('Deleting car with ID:', car._id);

      const response = await axios.delete(`http://localhost:3004/car/${car._id}`, {
        
      });

      console.log('Response from server:', response.data);
      alert('Car listing deleted successfully!');
      window.history.back(); // Redirect user to previous page
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(`Failed to delete: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('No response from server:', error.request);
        alert('Failed to delete: No response from the server.');
      } else {
        console.error('Error:', error.message);
        alert(`Failed to delete: ${error.message}`);
      }
    }
  };

  // Render star rating for reviews
  const renderStars = () => {
    const stars = [];
    const totalStars = 5;
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <i
          key={i}
          className={`fas fa-star ${i <= (hoveredStar || selectedStar) ? 'filled-star' : ''}`}
          onMouseEnter={() => setHoveredStar(i)}
          onMouseLeave={() => setHoveredStar(0)}
          onClick={() => setSelectedStar(i)}
        ></i>
      );
    }
    return stars;
  };

  // Add a review
  const handleAddReview = async () => {
    if (!user) {
      alert('Please log in to add a review!');
      return;
    }

    try {
      await axios.post('http://localhost:3006/reviews/add', {
        productId: car._id,
        useremail: user.email,
        Review: review,
        rating: selectedStar,
        productName: car.name,
        sellerName: car.seller,
      });

      alert('Review added successfully!');
      setShowPopup(false);
      setReview('');
      setSelectedStar(0);

      const response = await axios.get('http://localhost:3006/reviews/getallreviews', {
        params: { productId: id },
      });
      setReviews(response.data);
    } catch (error) {
      console.error('Error adding review:', error);
      alert('Failed to add review.');
    }
  };

  if (!car) {
    return <p>Loading...</p>;
  }


// Submit the updated car details
const handleSubmitEdit = async () => {
  try {
    const formDataToSend = new FormData();
    formDataToSend.append('name', editCar.name);
    formDataToSend.append('type', editCar.type);
    formDataToSend.append('price', editCar.price);
    formDataToSend.append('description', editCar.description);
    formDataToSend.append('seller', editCar.seller);

    if ( editCar.pictures.length > 0) {
        formDataToSend.append('files', editCar.pictures); // Use 'files' as the field name
    }
    
    editCar.files = editCar.pictures;
    const response = await axios.put(`http://localhost:3004/car/${car._id}`, formDataToSend);
    console.log('Car updated:', response.data);
    alert('Car updated successfully!');

    // Refetch car details after update
    const updatedCarData = await getCarById(car._id);
    setCar(updatedCarData); // Update the state with the latest car data
    setIsEditing(false); // Hide the form after submission
  } catch (error) {
    console.error('Error updating car:', error);
    alert('Failed to update the car.');
  }
};

  return (
    <div className="details-container">
      <h1 className="details-title">{car.name}</h1>
      <p className="details-info"><strong>Type:</strong> {car.type}</p>
      <p className="details-info"><strong>Price:</strong> ${car.price} per day</p>
      <p className="details-info"><strong>Description:</strong> {car.description}</p>
      <p className="details-info"><strong>Seller:</strong> {car.seller}</p>

      {imagePreview ? (
    
  <div className="details-images">
    <img src={imagePreview} alt="Image Preview" className="details-image" />
  </div>
) :car.pictures && car.pictures.length > 0  ?(
        <div className="details-images">
          {car.pictures.map((picture, index) => (
            <img
              key={index}
              src={`${picture}`}
              alt={`${picture}`}
              className="details-image"
            />
          ))}
        </div>
      ) : null}
    
      <button
        className="details-button details-rent-button"
        onClick={handleRentCar}
      >
        Rent
      </button>
  
    {(user && (user.username === car.seller || user.username === "admin")) && (
      <button
      className="details-button details-delete-button"
      style={{
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer',
      marginTop: '10px',
    }}
    onClick={handleDeleteCar}
  >
    Delete Listing
  </button>
  )}
  
      {(user && user.username === car.seller) && !isEditing && (
        <button
          className="details-button details-edit-button"
          style={{
            backgroundColor: 'gray',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
          onClick={handleEditCarClick}
        >
          Edit Car
        </button>
      )}
  
      {isEditing && (
        <div className="edit-form">
          <h2>Edit Car</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label>
              Name:
              
              <input
                type="text"
                name="name"
                value={editCar.name}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Type:
              <input
                type="text"
                name="type"
                value={editCar.type}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={editCar.price}
                onChange={handleEditChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={editCar.description}
                onChange={handleEditChange}
              />
            </label>
         <label>
  Pictures (Upload Image):
  <input
    type="file"
    name="pictures"
    accept="image/*"
    onChange={handleFileChange}
  />
</label>
            <button
              type="button"
              className="details-button details-save-button"
              onClick={handleSubmitEdit}
            >
              Save Changes
            </button>
            <button
              type="button"
              className="details-button details-cancel-button"
              onClick={() => CancelEditing()}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
  
      <button
        className="details-button details-rent-button"
        style={{
          backgroundColor: '#1d1238',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => setShowPopup(true)}
      >
        Add Review
      </button>
  
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Add Your Review</h2>
            <div className="stars-container">{renderStars()}</div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Write your review here..."
              rows="5"
              cols="40"
              className="popup-textarea"
            />
            <div className="popup-buttons">
              <button
                className="popup-button submit"
                onClick={handleAddReview}
              >
                Submit
              </button>
              <button
                className="popup-button cancel"
                onClick={() => setShowPopup(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
  
      <div className="reviews-section">
        <h2>Reviews</h2>
        {reviews.length > 0 ? (
          reviews
            .filter((review) => review.productId === car._id) // Filter reviews by carId
            .map((review, index) => (
              <div key={index} className="review-card">
                <p><strong>User:</strong> {review.useremail}</p>
                <p><strong>Review:</strong> {review.Review}</p>
                <p><strong>Rating:</strong> {'⭐'.repeat(review.rating)}</p>
              </div>
            ))
        ) : (
          <p>No reviews yet. Be the first to add one!</p>
        )}
      </div>
    </div>
  );
}
export default DetailsPage;