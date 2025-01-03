import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/HomePage'
import DetailsPage from './Pages/DetailsPage';
import SignupPage  from './Pages/SignupPage';
import LoginPage from './Pages/LoginPage';
import AddListing from './Pages/AddListingPage';
import CartPage from './Pages/CartPage';
import ComplainPage from './Pages/ComplainPage';
import ReviewForm from './Pages/ReviewPage'
import ProfilePage from './Pages/ProfilePage';


const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/addComplain" element={<ComplainPage />} />
          <Route path="/addReview" element={<ReviewForm />} />
          <Route path="/addListing" element={<AddListing />} />
          <Route path="/Signup" element={<SignupPage  />} />
          <Route path="/Login" element={<LoginPage  />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/Profile" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
