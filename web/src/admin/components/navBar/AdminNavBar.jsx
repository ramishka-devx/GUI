import React, { useState } from 'react';
import './AdminNavBar.css';
import ProfileDropdown from '../ProfileDropDown/ProfileDropDown';
import Sidebar from '../sidebar/SideBar';

const AdminNavBar = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="menu-toggle" aria-label="Toggle sidebar" onClick={toggleSidebar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="icon"
            >
              <path
                fillRule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <a href="/" className="brand-logo">
            <img src="https://flowbite.com/docs/images/logo.svg" alt="Logo" className="logo" />
            <span className="brand-name">Kalderama</span>
          </a>
        </div>
        <div className="navbar-right">
        </div>
        <ProfileDropdown />
      </nav>
      {isSidebarVisible && <Sidebar />}
    </>
  );
};

export default AdminNavBar;
