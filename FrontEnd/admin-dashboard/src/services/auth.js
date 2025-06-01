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

const updateProfile = (id, updateData, token) => {
  const formData = new FormData();

  if (updateData.file) {
    formData.append('file', updateData.file);
  }

  for (const key in updateData) {
    if (key !== 'file' && updateData[key]) {
      formData.append(key, updateData[key]);
    }
  }

  return HTTP.put(`/auth/update/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteAccount = (id) =>{
    return HTTP.delete(`/auth/delete/${id}`);
}
const getAllUsers = () =>{
    return HTTP.get("/auth");
}


export default{signIN,logout,forgetPassword,resetPassword,updateProfile,deleteAccount,getAllUsers};