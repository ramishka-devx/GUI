import React, { useState } from 'react'
import AdminNavBar from '../../components/navBar/AdminNavBar'
import Sidebar from '../../components/sidebar/SideBar'
import { Route, Routes, useSearchParams } from 'react-router-dom'
import SeeOrders from '../orders/SeeOrders'
import AddFood from '../newFood/NewFood'
import DisplayFoods from '../displayFoods/DisplayFoods'
import DashBoard from '../dashboard/DashBoard'
import UpdateFood from '../Update/UpdateFood'
import LoadingBanner from '../../../comp/LoadingBanner/LoadingBanner'

const AdminHome = () => {

  const [isbannerLoading , setIsbannerLoading] = useState(false);

  return (
    <div>
    {isbannerLoading && <LoadingBanner />}

        <AdminNavBar />
        <Routes>
          <Route path="/admin/" element={<DashBoard />} />
          <Route path="/admin/orders" element={<SeeOrders setIsbannerLoading = {setIsbannerLoading} />} />
          <Route path="/admin/foods/" element={<DisplayFoods />} />
          <Route path="/admin/foods/add" element={<AddFood />} />
          <Route path="/admin/foods/edit/:foodId" element={<UpdateFood />} />
        </Routes>
   
    </div>
  )
}

export default AdminHome