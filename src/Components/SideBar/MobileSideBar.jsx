import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCog, FaQuestionCircle, FaPlusCircle, FaComments } from 'react-icons/fa';
import './MobileSideBar.css';

const MobileSideBar = () => {
  return (
    <nav className="mobile-sidebar">
      <Link to="/profile" className="sidebar-icon">
        <FaUser />
      </Link>
      <Link to="/settings" className="sidebar-icon">
        <FaCog />
      </Link>
      <Link to="/help" className="sidebar-icon">
        <FaQuestionCircle />
      </Link>
      <Link to="/create" className="sidebar-icon">
        <FaPlusCircle />
      </Link>
      <Link to="/chat" className="sidebar-icon">
        <FaComments />
      </Link>
    </nav>
  );
};

export default MobileSideBar;
