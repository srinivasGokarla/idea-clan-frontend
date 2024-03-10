
import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link">Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/course-selection" className="nav-link">Courses</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/lectures" className="nav-link">Lectures</Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">Profile</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link">Admin Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/users" className="nav-link">User Management</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/courses" className="nav-link">Course Management</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

