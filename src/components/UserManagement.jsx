import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://idea-clan-backend.onrender.com/profile');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);


  return (
    <div className="container"> 
    <Navbar />
    <h2>User Management</h2>
    <h3>Students:</h3>
    <ul>
      {users.map(student => (
        <li key={student._id}>{student.name} - {student.email}</li>
      ))}
    </ul>
  </div>
  );
};

export default UserManagement;
