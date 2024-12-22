import React from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaCog,
  FaQuestionCircle,
  FaPlusCircle,
  FaComments,
} from "react-icons/fa";
import "./MobileSideBar.css";

const MobileSideBar = () => {
  return (
    <nav className="mobile-sidebar">
      <Link to="/profile" className="sidebar-icon" data-tooltip="Profile">
        <FaUser />
        <span>Profile</span>
      </Link>
      <Link to="/settings" className="sidebar-icon" data-tooltip="Settings">
        <FaCog />
        <span>Settings</span>
      </Link>
      <Link to="/help" className="sidebar-icon" data-tooltip="Help">
        <FaQuestionCircle />
        <span>Help</span>
      </Link>
      <Link to="/create" className="sidebar-icon" data-tooltip="Create">
        <FaPlusCircle />
        <span>Create</span>
      </Link>
      <Link to="/chat" className="sidebar-icon" data-tooltip="Chat">
        <FaComments />
        <span>Chat</span>
      </Link>
    </nav>
  );
};

export default MobileSideBar;
