import HTTP from "./contexte_service"

const signIN = (data) => {
    return HTTP.post("/auth/login", data)
}
const logout = (id) =>{
    return HTTP.post(`/auth/logout/${id}`, id)
}
const forgetPassword = (data) =>{
    return HTTP.post("/auth/forgetpassword", data);
}
const resetPassword = (token, data) =>{
    return HTTP.post(`/auth/reset-password/${token}`, data);
}
const createAdmin = (data) =>{
    return HTTP.post("/admin", data);
}
const updateProfile = (id, data)=>{
    return HTTP.put(`/auth/update/${id}`, data);
}
const deleteAccount = (id) =>{
    return HTTP.delete(`/auth/delete/${id}`);
}
const getAllUsers = () =>{
    return HTTP.get("/auth");
}


export default{signIN,logout,forgetPassword,resetPassword,createAdmin,updateProfile,deleteAccount,getAllUsers};