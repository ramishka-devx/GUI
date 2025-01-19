import React from 'react';
import './SideBar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul className="menu">
        <li className="menu-item">
          <Link to="/admin" className="menu-link">Dashboard</Link>
        </li>
        <li className="menu-item">
          <Link to="/admin/orders" className="menu-link">Orders</Link>
        </li>
        <li className="menu-item">
          <Link to="/admin/foods" className="menu-link">Foods</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
