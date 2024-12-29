import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ComplainPage.css';

const ComplainPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [newComplaint, setNewComplaint] = useState('');
  const user = JSON.parse(sessionStorage.getItem('userProfile')) || {};

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = user.email
          ? await axios.get(`http://localhost:3008/complain?useremail=${user.email}`)
          : await axios.get('http://localhost:3008/complain');
        setComplaints(response.data);
      } catch (error) {
        console.error('Error fetching complaints:', error);
      }
    };

    fetchComplaints();
  }, [user.email]);

  const handleAddComplaint = async () => {
    if (!newComplaint.trim()) {
      alert('Complaint cannot be empty.');
      return;
    }

    try {
      const complaintData = {
        username: user.username || 'Anonymous User',
        useremail: user.email,
        complaint: newComplaint,
      };

      const response = await axios.post('http://localhost:3008/complain', complaintData);
      setComplaints([...complaints, response.data]);
      setNewComplaint('');
      alert('Complaint added successfully!');
    } catch (error) {
      console.error('Error adding complaint:', error);
      alert('Error adding complaint. Please try again later.');
    }
  };

  const handleRemoveComplaint = async (id) => {
    try {
      await axios.delete(`http://localhost:3008/complain/${id}`);
      setComplaints(complaints.filter((complaint) => complaint._id !== id));
      alert('Complaint removed.');
    } catch (error) {
      console.error('Error removing complaint:', error);
    }
  };

  const handleClearComplaints = async () => {
    if (!user.email) {
      alert('User not found. Please log in again.');
      return;
    }

    try {
      for (let complaint of complaints) {
        await axios.delete(`http://localhost:3008/complain/${complaint._id}`);
      }
      setComplaints([]);
      alert('All complaints cleared successfully!');
    } catch (error) {
      console.error('Error clearing complaints:', error);
      alert('Error clearing complaints. Please try again later.');
    }
  };

  return (
    <div className="complain-container">
      <h1>Your Complaints</h1>
      <div className="add-complaint">
        <textarea
          placeholder="Write your complaint here..."
          value={newComplaint}
          onChange={(e) => setNewComplaint(e.target.value)}
        />
        <button onClick={handleAddComplaint}>Add Complaint</button>
      </div>
      {complaints.length === 0 ? (
        <p>You have no complaints.</p>
      ) : (
        <div>
          <ul>
            {complaints.map((complaint) => (
              <li key={complaint._id}>
                <h2>{complaint.username}</h2>
                <h3>Email: {complaint.useremail}</h3>
                <p className="complaint">Complaint: {complaint.complaint}</p>
                <button onClick={() => handleRemoveComplaint(complaint._id)}>Remove Complaint</button>
              </li>
            ))}
          </ul>
          <button onClick={handleClearComplaints}>Clear All Complaints</button>
        </div>
      )}
    </div>
  );
};

export default ComplainPage;
