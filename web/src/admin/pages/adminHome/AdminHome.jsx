import React from 'react'
import AdminNavBar from '../../components/navBar/AdminNavBar'
import Sidebar from '../../components/sidebar/SideBar'
import { Route, Routes } from 'react-router-dom'
import SeeOrders from '../orders/SeeOrders'

const AdminHome = () => {
  return (
    <div>
        <AdminNavBar />
      
        <Routes>
          <Route path="/admin/orders" element={<SeeOrders />} />
        </Routes>
   
    </div>
  )
}

export default AdminHome