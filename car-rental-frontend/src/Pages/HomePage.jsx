import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getAllCars } from '../services/carService';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

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
    navigate(`/details/${id}`); // Navigate to the Details page
  };

  return (
    <div>
      <h1>Available Cars</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cars.map((car) => (
          <div key={car._id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h2>{car.name}</h2>
            <p>Type: {car.type}</p>
            <p>Price: ${car.price} per day</p>
            <p>{car.description}</p>
            {car.pictures && car.pictures.length > 0 && (
              <img src={car.pictures[0]} alt={car.name} style={{ width: '200px', height: '150px' }} />
            )}
            <button onClick={() => handleDetailsClick(car._id)}>Details</button> {/* Add Details Button */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;