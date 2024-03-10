import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const CourseManagement = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    prerequisites: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://idea-clan-backend.onrender.com/courses', formData);
      if (response.status === 201) {
        alert('Course created successfully');
        setFormData({
          name: '',
          description: '',
          prerequisites: '',
        });
      }
    } catch (error) {
      console.error('Error creating course:', error.message);
      alert('Failed to create course');
    }
  };

  return (
    <div className="container"> 
      <Navbar />
      <h2>Course Management</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />
        <label>
          Description:
          <textarea name="description" value={formData.description} onChange={handleChange} />
        </label>
        <br />
        <label>
          Prerequisites:
          <input type="text" name="prerequisites" value={formData.prerequisites} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CourseManagement;
