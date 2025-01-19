import React from 'react'
import AdminNavBar from '../../components/navBar/AdminNavBar'
import Sidebar from '../../components/sidebar/SideBar'
import { Route, Routes } from 'react-router-dom'
import SeeOrders from '../orders/SeeOrders'
import AddFood from '../newFood/NewFood'
import DisplayFoods from '../displayFoods/DisplayFoods'

const AdminHome = () => {
  return (
    <div>
        <AdminNavBar />
      
        <Routes>
          <Route path="/admin/orders" element={<SeeOrders />} />
          <Route path="/admin/foods/" element={<DisplayFoods />} />
          <Route path="/admin/foods/add" element={<AddFood />} />
        </Routes>
   
    </div>
  )
}

export default AdminHome