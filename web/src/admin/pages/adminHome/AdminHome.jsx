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
import Navbar from '../../../comp/navBar/NavBar'

const AdminHome = () => {

  const [isbannerLoading , setIsbannerLoading] = useState(false);

  return (
    <div>
    {isbannerLoading && <LoadingBanner />}

        {/* <AdminNavBar /> */}
        {/* <Navbar/> */}
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/orders" element={<SeeOrders setIsbannerLoading = {setIsbannerLoading} />} />
          <Route path="/foods/" element={<DisplayFoods />} />
          <Route path="/foods/add" element={<AddFood />} />
          <Route path="/foods/edit/:foodId" element={<UpdateFood />} />
        </Routes>
   
    </div>
  )
}

export default AdminHome