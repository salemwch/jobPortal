import HTTP from "./context-service"
const getDashboardStats  = () =>{
    return HTTP.get("/dashboard/stats");
}
export default{getDashboardStats};