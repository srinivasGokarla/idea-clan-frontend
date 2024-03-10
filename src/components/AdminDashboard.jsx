import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigation = useNavigate();

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('https://idea-clan-backend.onrender.com/analytics');
        setAnalytics(response.data);
      } catch (error) {
        console.error('Error fetching analytics:', error.message);
      }
    };

    fetchAnalytics();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://idea-clan-backend.onrender.com/courses');
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error.message);
      }
    };

    fetchCourses();
  }, []);



  return (
    <div>
        <Navbar />
      <h1>Admin Dashboard</h1>
      <input
        type="text"
        placeholder="Search Courses"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {courses
          .filter((course) =>
            course.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((course) => (
            <li key={course._id}>{course.name}</li>
          ))}
      </ul>
      <div>
        <h3>Analytics:</h3>
        {analytics && (
          <div>
            <p>Total Students: {analytics.totalStudents}</p>
            <p>Total Courses: {analytics.totalCourses}</p>
            <p>Total Lectures: {analytics.totalLectures}</p>
          </div>
        )}
      </div>
     
    </div>
  );
};

export default AdminDashboard;
