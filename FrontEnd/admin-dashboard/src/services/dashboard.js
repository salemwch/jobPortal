import HTTP from "./contexte_service"

const getDashboardStats = () =>{
    return HTTP.get("/dashboard/stats");
}

export default {getDashboardStats};