import HTTP from "./contexte_service";

const createAdmin = (data) =>{
    return HTTP.post("/admin", data);
}

const getAdminById = (token,id) =>{
    return HTTP.get(`/admin/${id}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
const getAllUsers = (token) => {
  return HTTP.get("/admin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const updateAdminProfile = (token, id, updateData) => {
  const formData = new FormData();

  for (const key in updateData) {
    if (updateData[key]) {
      formData.append(key, updateData[key]);
    }
  }

  return HTTP.put(`/auth/update/${id}`, formData, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  },
});
};
const deleteAdmin = (token, id) => {
  return HTTP.delete(`/admin/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getAllAdmins = (token) => {
  return HTTP.get('/admin/all', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default {createAdmin,getAdminById,getAllUsers,updateAdminProfile,deleteAdmin,getAllAdmins};