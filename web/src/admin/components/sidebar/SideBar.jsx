import React from 'react';
import './SideBar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="menu">
        <li className="menu-item">
          <a href="/admin" className="menu-link">Dashboard</a>
        </li>
        <li className="menu-item">
          <a href="orders" className="menu-link">Orders</a>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
