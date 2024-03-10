import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
   
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('https://idea-clan-backend.onrender.com/profile');
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async () => {
    try {
      await axios.put('https://idea-clan-backend.onrender.com/profile', formData);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error.message);
      alert('Failed to update profile');
    }
  };

  return (
    <div className="container">
      <Navbar />
      <h1>Profile Management</h1>
      {user && (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <form onSubmit={handleUpdateProfile}>
            <label>
              Name:
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </label>
            <br />
            <label>
              Email:
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </label>
           
            <br />
            <button type="submit">Update Profile</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;

