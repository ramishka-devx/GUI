import React from 'react'
import DailyOrdersGraph from '../../components/DailyOrdersGraph/DailyOrdersGraph'
import SummaryCards from '../../components/summeryCard/SummeryCard'

const DashBoard = () => {
  return (
    <div>
        <DailyOrdersGraph/>
        <SummaryCards/>
    </div>
  )
}


export default DashBoard
