import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../services/auth";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams(); 

  const handleChange = (e) => {
    if (e.target.name === "password") {
      setPassword(e.target.value);
    } else {
      setConfirmPassword(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alert("Please fill in both password fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    auth
      .resetPassword(token, { password }) 
      .then((res) => {
        alert(res.data.message || "Password has been reset successfully.");
        navigate("/login"); 
      })
      .catch((error) => {
        console.error("Reset password error:", error);
        alert(error?.response?.data?.message || "Failed to reset password. Try again.");
      });
  };

  return (
    <div className="page-wrapper" id="main-wrapper">
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-6 col-xxl-3">
              <div className="card mb-0">
                <div className="card-body">
                  <h3 className="text-center">Reset Password</h3>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">New Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Confirm Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="confirmPassword"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                      Reset Password
                    </button>
                  </form>
                  <div className="text-center mt-3">
                    <a href="/login" className="text-primary">Back to Login</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
