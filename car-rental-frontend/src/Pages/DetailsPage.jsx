import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCarById } from '../services/carService'; 

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
    <div>
      <h1>{car.name}</h1>
      <p>Type: {car.type}</p>
      <p>Price: ${car.price} per day</p>
      <p>{car.description}</p>
      {car.pictures && car.pictures.length > 0 && (
        <div>
          {car.pictures.map((picture, index) => (
            <img
              key={index}
              src={picture}
              alt={`${car.name} - ${index + 1}`}
              style={{ width: '200px', height: '150px', margin: '10px' }}
            />
          ))}
        </div>
      )}
      <button onClick={() => window.history.back()}>Back</button>
    </div>
  );
};

export default DetailsPage;
