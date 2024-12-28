import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCars } from '../services/carService';
import './HomePage.css'; // Import the CSS file

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAllCars();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };

    fetchCars();
  }, []);

  const handleDetailsClick = (id) => {
    navigate(`/details/${id}`); 
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Available Cars</h1>
      <div className="home-cars-grid">
        {cars.map((car) => (
          <div key={car._id} className="home-car-card">
            <h2 className="home-car-name">{car.name}</h2>
            <p className="home-car-info"><strong>Type:</strong> {car.type}</p>
            <p className="home-car-info"><strong>Price:</strong> ${car.price} per day</p>
            <p className="home-car-description">{car.description}</p>
            {car.pictures && car.pictures.length > 0 && (
              <img
                src={car.pictures[0]}
                alt={car.name}
                className="home-car-image"
              />
            )}
            <button
              className="home-details-button"
              onClick={() => handleDetailsClick(car._id)}
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
