import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const SignUpConfirmation = () => {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate('/login');
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ maxWidth: '500px', width: '100%' }}>
        <div className="text-center">
          <i className="fa fa-check-circle fa-4x text-success mb-3"></i>
          <h2 className="mb-3">Sign Up Successful!</h2>
          <p className="mb-4">
            Thank you for creating an account with us. Please check your email for verification instructions,
            or click the button below to proceed to login.
          </p>
          <Button variant="primary" size="lg" onClick={handleProceed}>
            Proceed to Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUpConfirmation;
