import React, { useState } from 'react'
import DailyOrdersGraph from '../../components/DailyOrdersGraph/DailyOrdersGraph'
import SummaryCards from '../../components/summeryCard/SummeryCard'
import LoadingBanner from '../../../comp/LoadingBanner/LoadingBanner';


const DashBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
          {isLoading && <LoadingBanner />}

        <SummaryCards setIsLoading = {setIsLoading}/>
        <DailyOrdersGraph setIsLoading = {setIsLoading}/>
    </div>
  )
}


export default DashBoard
