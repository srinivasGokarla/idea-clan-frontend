import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const CourseSelection = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const navigation = useNavigate();

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

  const handleCourseSelection = (courseId) => {
    if (selectedCourses.length < 3) {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://idea-clan-backend.onrender.com/select-courses', {
        courses: selectedCourses,
      });
      console.log(response.data.message);
      navigation('/lectures');
    } catch (error) {
      console.error('Error selecting courses:', error.message);
    }
  };

  return (
    <div className="container">
        <Navbar />
      <h1>Course Selection</h1>
      <h3>Select Three Courses:</h3>
      <ul>
        {courses.map((course) => (
          <li key={course._id} onClick={() => handleCourseSelection(course._id)}>
            {course.name}
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Submit Selection</button>
    </div>
  );
};

export default CourseSelection;
