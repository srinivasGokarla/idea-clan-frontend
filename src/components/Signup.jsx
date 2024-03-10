import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    role: 'admin', 
  });

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      navigation('/');
    }
  }, [navigation]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('https://idea-clan-backend.onrender.com/register', formData);
  
      console.log(response.data);
      alert('Registration successful');
      navigation('/');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Email already registered');
      } else {
        console.error('Registration failed:', error.response ? error.response.data : error.message);
        alert('Failed to register. Please try again later.');
      }
    }
  };

  return (
    <>
      <h2>User Register form</h2>
      <div className='login'>
        <form className="container" onSubmit={handleSubmit}>
        
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder='Enter the Name' required />
          
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder='Enter the Email' required />
       

        
            <select name="role" value={formData.role} onChange={handleChange}>
              <option value="admin">Admin</option>
              <option value="student">Student</option>
            </select>
         
            <input type="text" name="username" value={formData.username} onChange={handleChange}  placeholder='Enter the UserName'required />
         
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder='Enter the password' required />
         

          <button type="submit">Register</button>
          <p>
            If you have an account? <a href="/">Login here</a>.
          </p>
        </form>
      </div>
    </>
  );
};

export default Signup;
