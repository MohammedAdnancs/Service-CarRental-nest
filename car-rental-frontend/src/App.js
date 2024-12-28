import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/HomePage'
import DetailsPage from './Pages/DetailsPage';


const AddReview = () => <h1>Add Review</h1>;
const Login = () => <h1>Login Page</h1>;

const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/:id" element={<DetailsPage />} />
          <Route path="/addReview" element={<AddReview />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
