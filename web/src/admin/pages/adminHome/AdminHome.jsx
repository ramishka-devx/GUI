import React from 'react'
import AdminNavBar from '../../components/navBar/AdminNavBar'
import Sidebar from '../../components/sidebar/SideBar'

const AdminHome = () => {
  return (
    <div>
        <AdminNavBar />
      
        <div className="container">
            <h1>Admin Dashboard</h1>
        </div>
    </div>
  )
}

export default AdminHome