import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/admin" className="active">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/orders">Orders</Link>
        </li>
        <li>
          <Link to="/admin/foods">Foods</Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminMenu;
