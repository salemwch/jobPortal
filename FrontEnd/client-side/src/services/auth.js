import HTTP from "./context-service"




const buildFormData = (data, file) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      formData.append(key, JSON.stringify(value)); 
    } else {
      formData.append(key, value);
    }
  });

  if (file) {
    formData.append("file", file);
  }

  return formData;
};





const signIN = (data) => {
    return HTTP.post("/auth/login", data);
};

const logout = (id) => {
    return HTTP.post(`/auth/logout/${id}`, id);
};

const forgetPassword = (data) => {
    return HTTP.post("/auth/forgetpassword", data);
};

const resetPassword = (token, data) => {
    return HTTP.post(`/auth/reset-password/${token}`, data);
};

const registerCondidate = (data, file) => {
  const formData = buildFormData(data, file);
  return HTTP.post("/condidates", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


const registerCompany = (data, file) => {
  const formData = buildFormData(data, file);
  return HTTP.post("/company", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
const updateProfile = (id, data) => {
    return HTTP.put(`/auth/update/${id}`, data);
};

const deleteAccount = (id) => {
    return HTTP.delete(`/auth/delete/${id}`);
};



export default {
    signIN,
    logout,
    forgetPassword,
    resetPassword,
    registerCondidate,
    registerCompany,
    updateProfile,
    deleteAccount,
    buildFormData
};