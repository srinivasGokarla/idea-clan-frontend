import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';


const LectureManagement = () => {
  const [lectures, setLectures] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLectures, setFilteredLectures] = useState([]);
  const [formData, setFormData] = useState({
    courseId: '',
    title: '',
    startTime: '',
    endTime: '',
    description: '',
    meetingLink: '',
  });

  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axios.get('https://idea-clan-backend.onrender.com/lectures');
        setLectures(response.data.lectures);
      } catch (error) {
        console.error('Error fetching lectures:', error.message);
      }
    };

    fetchLectures();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const filtered = lectures.filter((lecture) =>
      lecture.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredLectures(filtered);
  }, [searchTerm, lectures]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`https://idea-clan-backend.onrender.com/courses/${formData.courseId}/lectures`, formData);
      alert('Lecture scheduled successfully');
      setFormData({
        courseId: '',
        title: '',
        startTime: '',
        endTime: '',
        description: '',
        meetingLink: '',
      });
    } catch (error) {
      console.error('Error scheduling lecture:', error.message);
      alert('Failed to schedule lecture');
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Lecture Management</h2>
      <input
        type="text"
        placeholder="Search Lectures"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredLectures.map((lecture) => (
          <li key={lecture._id}>{lecture.title}</li>
        ))}
      </ul>
      <div className="container">
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label>
              Course ID:
              <input type="text" name="courseId" value={formData.courseId} onChange={handleChange} />
            </label>
            <label>
              Title:
              <input type="text" name="title" value={formData.title} onChange={handleChange} />
            </label>
            <label>
              Start Time:
              <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} />
            </label>
            <label>
              End Time:
              <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} />
            </label>
            <label>
              Description:
              <textarea name="description" value={formData.description} onChange={handleChange} />
            </label>
            <label>
              Meeting Link:
              <input type="text" name="meetingLink" value={formData.meetingLink} onChange={handleChange} />
            </label>
            <button type="submit">Schedule Lecture</button>
          </form>
        </div>
      </div>
      <div className="container">
        <h1>Lectures</h1>
        <ul>
          {lectures.map((lecture) => (
            <li key={lecture._id}>
              <h3>{lecture.title}</h3>
              <p>Start Time: {lecture.startTime}</p>
              <p>End Time: {lecture.endTime}</p>
              <a href={lecture.meetingLink}>Join Lecture</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LectureManagement;

