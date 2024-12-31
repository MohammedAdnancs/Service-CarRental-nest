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
        const response = await axios.get('http://localhost:3008/complain');
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

  const handleEditComplaint = async (id, updatedText) => {
    try {
      const updatedComplaint = { complaint: updatedText };
      const response = await axios.put(`http://localhost:3008/complain/${id}`, updatedComplaint);
      setComplaints(complaints.map((c) => (c._id === id ? response.data : c)));
      alert('Complaint updated successfully!');
    } catch (error) {
      console.error('Error updating complaint:', error);
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
        <ul>
          {complaints.map((complaint) => (
            <li key={complaint._id}>
              <div className="complaint-header">
                <h2>{complaint.username}</h2>
                {complaint.useremail === user.email && (
                  <button
                    className="edit-icon"
                    onClick={() => {
                      const newText = prompt('Edit your complaint:', complaint.complaint);
                      if (newText) handleEditComplaint(complaint._id, newText);
                    }}
                  >
                    ✏️
                  </button>
                )}
              </div>
              <h3>Email: {complaint.useremail}</h3>
              <p className="complaint">Complaint: {complaint.complaint}</p>
              {complaint.useremail === user.email && (
                <button onClick={() => handleRemoveComplaint(complaint._id)}>Remove Complaint</button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ComplainPage;
