import HTTP from "./context-service";

const createNotification = (token, notificationData) => {
  return HTTP.post("/notification", notificationData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const getNotificationsByUser = (token, userId) => {
  return HTTP.get(`/notification/user/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const markNotificationAsRead = (token, notificationId) => {
  return HTTP.patch(`/notification/${notificationId}/read`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const deleteNotification = (token, notificationId) => {
  return HTTP.delete(`/notification/${notificationId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export default {
  createNotification,
  getNotificationsByUser,
  markNotificationAsRead,
  deleteNotification,
};
