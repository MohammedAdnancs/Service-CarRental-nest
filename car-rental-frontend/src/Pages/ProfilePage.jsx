import React, { useEffect, useState } from "react";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userProfile = sessionStorage.getItem("userProfile");
    if (userProfile) {
      setUser(JSON.parse(userProfile));
    }
  }, []);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="profile-container">
      <h1 className="profile-title">{user.username} Profile Page</h1>
      <div className="profile-card">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Birthday:</strong> {new Date(user.birthdate).toLocaleDateString()}</p>
        <p>
          <strong>Phone Numbers:</strong> {user.phonenumbers?.length ? user.phonenumbers.join(", ") : "No phone numbers available"}
        </p>
        <p><strong>National ID:</strong> {user.nationalId}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
