import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCarById } from '../services/carService'; 
import './DetailsPage.css';

const DetailsPage = () => {
  const { id } = useParams(); 
  const [car, setCar] = useState(null);

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
      <button className="details-button details-rent-button">
        Rent
      </button>
    </div>
  );
};

export default DetailsPage;
