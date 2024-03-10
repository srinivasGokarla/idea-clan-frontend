import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../App.css';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import Navbar from './Navbar';

const Dashboard = () => {
  const [token, setToken] = useState('');
  const navigation = useNavigate();


  const handleCourseSelection = () => {
    navigation('/course-selection');
  };

  const handleProfileView = () => {
    navigation('/profile');
  };

  const handleLogout = async () => {
    if (localStorage.getItem('authToken') !== null) {
      try {
        const response = await fetch('https://idea-clan-backend.onrender.com/logout', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          localStorage.removeItem('authToken');
          localStorage.clear();
          console.log('Successfully logged out');
          navigation('/');
        } else {
          console.error('Logout failed');
        }
      } catch (error) {
        console.error('Error during logout:', error.message);
      }
    }
  };

  useEffect(() => {

    const checkToken = () => {
        let homeCheck = window.location.href.split("/");
        console.log("Auth token:", localStorage.getItem('authToken'));
        console.log("Home check:", homeCheck[3]);
      
        const storedToken = localStorage.getItem("authToken");
      
        if (!storedToken) {
          console.log('Token not found');
          navigation('/');
          return;
        }
      
        try {
          const decodedToken = jwtDecode(storedToken);
          console.log("Decoded token:", decodedToken);
      
          const expirationTime = decodedToken.exp * 1000;
          const currentTime = Date.now();
      
          if (currentTime >= expirationTime) {
            console.log('Token has expired');
            localStorage.removeItem('authToken');
            navigation('/');
          } else {
            setToken(storedToken);
          }
        } catch (error) {
          console.error('Error decoding token:', error);
          localStorage.removeItem('authToken');
          navigation('/');
        }
      };
  
    checkToken();
  }, [navigation]);


  return (
    <div className="container" >
        <Navbar />
      <h1>Welcome to DashBoard</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleCourseSelection}>Select Courses</button>
      <button onClick={handleProfileView}>View Profile</button>
    </div>
  );
};

export default Dashboard;



