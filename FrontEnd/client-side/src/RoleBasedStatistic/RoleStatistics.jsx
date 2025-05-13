import { useEffect, useState } from "react";
import CompaniesStatistics from "../Companies/statistics/statistics";
import Statistic from "../pages/Statistic";

const RoleBasedStatistics = () => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    setUserRole(storedUser?.user?.role || "guest");
  }, []);

  if (userRole === "condidate") {
    return <Statistic />;
  } else if (userRole === "company") {
    return <CompaniesStatistics />;
  }
   else {
    return null;
  }
};

export default RoleBasedStatistics;
