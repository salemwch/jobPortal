import React, { useEffect, useState } from "react";
import companyService from "../../services/companyservice";  

const TopCompanies = () => {
  const [topCompany, setTopCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("user") 
    ? JSON.parse(localStorage.getItem("user")).tokens.refreshToken 
    : null;

  useEffect(() => {
    const fetchTopCompany = async () => {
      if (!token) {
        console.error("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        const response = await companyService.getMostVisitedCompany(token);
        setTopCompany(response.data.mostVisited); 
        console.log("API Response:", response.data);
      } catch (error) {
        console.error("Error fetching most visited company:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopCompany();
  }, [token]);

  return (
    <div className="col-lg-12">
      <div className="card overflow-hidden">
        <div className="card-body p-4">
          <h5 className="card-title mb-9 fw-semibold">Top Visited Company</h5>
          <div className="row align-items-center">
            <div className="col-8">
              <h4 className="fw-semibold mb-3">Most Visited Company</h4>

              {loading ? (
                <p>Loading...</p>
              ) : topCompany ? (
                <div className="list-group">
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <span>
                      <strong>{topCompany.name}</strong>
                    </span>
                    <span className="badge bg-primary rounded-pill">
                      {topCompany.viewCount} Views
                    </span>
                  </div>
                </div>
              ) : (
                <p>No company found.</p>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCompanies;
