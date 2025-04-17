import React, { useState, useEffect } from "react";
import axios from "../../services/contexte_service";  

const MyProfile = () => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.user.role !== "admin") {
      alert("Only admins can view this page.");
      return;
    }

    axios.get(`/admin/${user.user._id}`)
      .then((res) => setAdmin(res.data))
      .catch((err) => {
        console.error("Error fetching admin profile:", err);
        alert("Failed to load profile.");
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>My Profile</h2>
      {admin ? (
        <div className="card p-3">
          <p><strong>Name:</strong> {admin.name}</p>
          <p><strong>Email:</strong> {admin.email}</p>
          <p><strong>Phone:</strong> {admin.phone || "N/A"}</p>
          <p><strong>Role:</strong> {admin.role}</p>
          <p><strong>CV:</strong> {admin.cv || "Not uploaded"}</p>
          <p><strong>Profile Image:</strong> {admin.image || "No image uploaded"}</p>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default MyProfile;
