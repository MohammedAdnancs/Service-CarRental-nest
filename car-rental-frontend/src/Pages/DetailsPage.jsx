import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCarById } from '../services/carService';
import axios from 'axios'; // Axios for API calls
import './DetailsPage.css';

const DetailsPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  // Retrieve user data from session storage
  const user = JSON.parse(sessionStorage.getItem('userProfile'));

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const data = await getCarById(id);
        setCar(data);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleRentCar = async () => {
    console.log(user.email)
    if (!user) {
      alert('Please log in to rent a car!');
      return;
    }

    try {
      await axios.post('http://localhost:3005/cart/add', {
        userEmail: user.email, // Extract userId from userProfile
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

  if (!car) {
    return <p>Loading...</p>;
  }

  return (
    <div className="details-container">
      <h1 className="details-title">{car.name}</h1>
      <p className="details-info"><strong>Type:</strong> {car.type}</p>
      <p className="details-info"><strong>Price:</strong> ${car.price} per day</p>
      <p className="details-info"><strong>Description:</strong> {car.description}</p>
      <p className="details-info"><strong>Seller:</strong> {car.seller}</p>

      {car.pictures && car.pictures.length > 0 && (
        <div className="details-images">
          {car.pictures.map((picture, index) => (
            <img
              key={index}
              src={picture}
              alt={`${car.name} - ${index + 1}`}
              className="details-image"
            />
          ))}
        </div>
      )}

      <button className="details-button" onClick={() => window.history.back()}>
        Back
      </button>
      <button
        className="details-button details-rent-button"
        onClick={handleRentCar}
      >
        Rent
      </button>
    </div>
  );
};

export default DetailsPage;
