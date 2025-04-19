import { useState } from "react";
import { Link } from "react-router-dom";
import HTTP from "../services/context-service";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await HTTP.post("/auth/forgetpassword", { email }); 
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="page-wrapper" id="main-wrapper" data-layout="vertical">
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-6 col-xxl-3">
              <div className="card mb-0">
                <div className="card-body">
                  <Link to="/" className="text-nowrap logo-img text-center d-block py-3 w-100">
                    <img src="../assets/images/logos/dark-logo.svg" width="180" alt="Logo" />
                  </Link>
                  <p className="text-center">Enter your email to reset your password</p>
                  
                  {message && <p className="alert alert-success">{message}</p>}
                  {error && <p className="alert alert-danger">{error}</p>}

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 py-2">
                      Reset Password
                    </button>
                    <div className="d-flex align-items-center justify-content-center mt-3">
                      <Link to="/login" className="text-primary fw-bold">Back to Login</Link>
                    </div>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
