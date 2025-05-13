import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../services/auth';

const Login = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.removeItem('user');
  }, []);

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const [loading, setLoading] = useState(false)
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (!data || !data.email) {
      alert('Please enter your email and password.');
      return;
    }

    auth.signIN(data)
      .then((res) => {
        const user = res.data?.user;
        const role = user?.role;
        sessionStorage.setItem('user', JSON.stringify(res.data));
        if(role === 'condidate'){
          navigate('/condidateDashboard');
        }else if(role === 'company'){
          navigate('/DashboardCompanie');
        }else if(role ==='admin'){
          alert('only condidate and company can log here ');
        }
        else{
          navigate('/');
        }
        
      })
      .catch((error) => {
        console.error('Login error:', error);
        const errorMessage = 
          error?.response?.data?.message || 
          error?.message || 
          'Login failed. Please try again.';
        alert(errorMessage);
        setLoading(false)
      });
  };

  return (
    <div>
      <section className="site-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 mb-5">
              <h2 className="mb-4">Sign In to JobBoard</h2>
              <form onSubmit={onSubmitHandler} className="p-4 border rounded">
                <div className="row form-group">
                  <div className="col-md-12 mb-3">
                    <label className="text-black" htmlFor="email">Email</label>
                    <input 
                      type="email" 
                      name="email" 
                      onChange={changeHandler} 
                      className="form-control" 
                      placeholder="Email address" 
                      required 
                    />
                  </div>
                </div>

                <div className="row form-group">
                  <div className="col-md-12 mb-3">
                    <label className="text-black" htmlFor="password">Password</label>
                    <input 
                      type="password" 
                      name="password" 
                      onChange={changeHandler} 
                      className="form-control" 
                      placeholder="Password" 
                      required 
                    />
                  </div>
                </div>

                <div className="form-check mb-3">
                  <input className="form-check-input" type="checkbox" id="rememberMe" />
                  <label className="form-check-label text-dark" htmlFor="rememberMe">
                    Remember this Device
                  </label>
                </div>

                <div className="row form-group">
                  <div className="col-md-12 d-flex gap-3">
                    <button type="submit" className="btn btn-primary w-100">
                      Sign In
                    </button> 
                    <Link to="/register" className="btn btn-secondary w-100">
                      Create Account
                    </Link>
                  </div>
                </div>

                <div className="text-center mt-3">
                  <Link to="/ForgetPassword" className="text-primary fw-bold">
                    Forgot Password?
                  </Link>
                </div>

              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
