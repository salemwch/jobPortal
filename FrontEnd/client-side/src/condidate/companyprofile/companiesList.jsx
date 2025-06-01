import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import companyService from "../../services/companyservice";
import { motion } from "framer-motion";
import Header from "../../componenets/header";
import "./../../condidate/companyprofile/companyListStyle.css"; 


const CompaniesList = ({ token, condidateId }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const IMAGE_BASE_URL = "http://localhost:3000/uploads";

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = JSON.parse(sessionStorage.getItem("user"))?.refreshToken;
        const response = await companyService.getAllCompanies(token);
        setCompanies(response.data.companies);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch companies:", error);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [token]);

  const handleCompanyClick = async (companyId) => {
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const condidateId = userData?.user?._id;
  const token = userData?.refreshToken;

  const key = `viewed_${condidateId}_${companyId}`;
  const alreadyViewed = localStorage.getItem(key);

  if (!alreadyViewed) {
    try {
      await companyService.incrementViewCount(token, companyId);
      localStorage.setItem(key, "true");  // not sessionStorage
    } catch (error) {
      console.error("Failed to increment view count:", error);
    }
  }
};
  if (loading) {
    return (
      <div className="container">
        <h2>Loading companies...</h2>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="containerr">
        <h1 className="titlee">🌟 Discover Top Companies</h1>
        <div className="cardd-grid">
          {companies.map((company, index) => (
            <motion.div
              key={company._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="motionn-card"
            >
              <Link
                to={`/view-company/${company._id}`}
                onClick={() => handleCompanyClick(company._id)}
              >
                <div className="companyy-card">
                  <div className="cardd-header">
                    <div className="letterr-logo">
                      {company.name.charAt(0).toUpperCase()}
                    </div>
                    <h2>{company.name}</h2>
                    <img
                      src={`${IMAGE_BASE_URL}/${company.image}`}
                      alt="Company Logo"
                      className="cardd-logo"
                    />
                  </div>
                  <div className="cardd-content">
                    <p>📍 Location: {company.location}</p>
                    <div className="badgee">👁️ Views: {company.viewCount}</div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompaniesList;
