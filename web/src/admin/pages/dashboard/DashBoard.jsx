import React, { useState } from "react";
import DailyOrdersGraph from "../../components/DailyOrdersGraph/DailyOrdersGraph";
import SummaryCards from "../../components/summeryCard/SummeryCard";
import LoadingBanner from "../../../comp/LoadingBanner/LoadingBanner";
import "./Dashboard.css"

const DashBoard = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      {isLoading && <LoadingBanner />}

      <div className="sum-container">
        <SummaryCards setIsLoading={setIsLoading} />
      </div>

      <div className="MainGraph-container">
        <DailyOrdersGraph setIsLoading={setIsLoading} />
      </div>
    </div>
  );
};

export default DashBoard;
