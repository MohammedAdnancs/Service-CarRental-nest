import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCars } from '../services/carService';
import './HomePage.css'; // Import the CSS file
import axios from 'axios';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchType, setSearchType] = useState('');
  const [searchPriceMin, setSearchPriceMin] = useState('');
  const [searchPriceMax, setSearchPriceMax] = useState('');
  const [loading, setLoading] = useState(false);  // State to manage loading indicator
  const [error, setError] = useState('');  // State to handle error messages
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true); // Start loading
        const data = await getAllCars();
        setCars(data);
        setLoading(false); // Stop loading
      } catch (error) {
        console.error('Error fetching cars:', error);
        setError('Error fetching cars');
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const handleSearch = async () => {
    const filters = {
      name: searchName,
      type: searchType,
      priceMin: searchPriceMin,
      priceMax: searchPriceMax,
    };

    try {
      const response = await axios.get(`http://localhost:3007/cars/search`, {
        params: filters
      });
      setCars(response.data.data);
    } catch (error) {
      setError('Error fetching cars with filters');
      console.error(error);
    }
  };

  const handleClear = async () => {
    setSearchName('');
    setSearchType('');
    setSearchPriceMin('');
    setSearchPriceMax('');
    
    try {
      const data = await getAllCars();
      setCars(data);  // Reset to show all cars
    } catch (error) {
      console.error('Error fetching all cars:', error);
      setError('Error fetching all cars');
    }
  };

  const handleDetailsClick = (id) => {
    navigate(`/details/${id}`);
  };

  // Function to prevent negative numbers in price fields
  const handlePriceMinChange = (e) => {
    const value = Math.max(0, e.target.value); // Ensure no negative value
    setSearchPriceMin(value);
  };

  const handlePriceMaxChange = (e) => {
    const value = Math.max(0, e.target.value); // Ensure no negative value
    setSearchPriceMax(value);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Available Cars</h1>

      {/* Error Message */}
      {error && <div className="error-message">{error}</div>}

      {/* Search Form */}
      <div className="search-form">
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by type"
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
        />
        <input
          type="number"
          placeholder="Min price"
          value={searchPriceMin}
          onChange={(e) => setSearchPriceMin(e.target.value)}
          min="0"
        />
        <input
          type="number"
          placeholder="Max price"
          value={searchPriceMax}
          onChange={(e) => setSearchPriceMax(e.target.value)}
          min="0"
        />
        </div>
        <div className="search-container">
        <button onClick={handleSearch} disabled={loading}className='search-button'>
          {loading ? 'Searching...' : 'Search'}
        </button>
        <button onClick={handleClear}className='clear-button'>Clear</button> {/* Clear Button */}
      </div>

      {/* Loading Indicator */}
      {loading && <div className="loading-spinner">Loading...</div>}

      {/* Display Cars */}
      <div className="home-cars-grid">
        {cars.length === 0 && !loading && <div>No cars found</div>}
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
