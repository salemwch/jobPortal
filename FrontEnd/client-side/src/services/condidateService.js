import HTTP from "./context-service"

const registerCondidate = (token, data, file) => {
    const formData = new FormData();
    if (file) {
        formData.append('file', file);
    }

    Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
    });

    return HTTP.post("/condidates", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
};

const getAllCondidates = (token) => {
    return HTTP.get("/condidates", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
const getCondidateById = (token, id) => {
    return HTTP.get(`/condidates/by-id/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
const getCondidateByEmail = (token, email) => {
    return HTTP.get(`/condidates/${email}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const updateProfile = (token, id, data, file) => {
  const formData = new FormData();
  
  if (file) formData.append('file', file);
  
  Object.keys(data).forEach(key => {
    if (Array.isArray(data[key])) {
      formData.append(key, JSON.stringify(data[key]));
    } else if (data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });

  return HTTP.put(`/condidates/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};
  

const deleteCondidate = (token, id) => {
    return HTTP.delete(`/condidates/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const updateDesiredFields = (token, id, data) => {
    return HTTP.patch(`/condidates/${id}/desiredFields`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

const getMostVisitedCondidates = (token) => {
    return HTTP.get("/condidates/mostvisited", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
const searchCandidates = (token, { name, skills, email, location }) => {
  const params = {};

  if (name) params.name = name;
  if (skills) params.skills = skills;
  if (email) params.email = email;
  if (location) params.location = location;

  return HTTP.get('/condidates/search', {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const incrementViewCount = (token, profileId, viewerId) => {
    return HTTP.patch(
      `/condidates/${profileId}/viewCount`,
      { viewerId }, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  


export default {
    registerCondidate, getAllCondidates, getCondidateByEmail, updateProfile, deleteCondidate, updateDesiredFields, getMostVisitedCondidates, incrementViewCount, getCondidateById,searchCandidates
};