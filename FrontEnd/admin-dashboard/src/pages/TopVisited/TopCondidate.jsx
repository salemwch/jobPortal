import React, { useEffect, useState } from "react";
import condidateService from "../../services/condidateservice";

const TopCondidate = () => {
  const [topCondidate, setTopCondidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("user") 
    ? JSON.parse(localStorage.getItem("user")).tokens.refreshToken 
    : null;

  useEffect(() => {
    const fetchTopCondidate = async () => {
      if (!token) {
        console.error("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        const response = await condidateService.getMostVisitedCondidates(token);
        setTopCondidate(response.data.mostVisited);
      } catch (error) {
        console.error("Error fetching most visited condidate:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopCondidate();
  }, [token]);

  return (
    <div className="col-lg-12">
      <div className="card overflow-hidden">
        <div className="card-body p-4">
          <h5 className="card-title mb-9 fw-semibold">Top Visited Condidate</h5>
          <div className="row align-items-center">
            <div className="col-8">
              <h4 className="fw-semibold mb-3">Most Visited Condidate</h4>

              {loading ? (
                <p>Loading...</p>
              ) : topCondidate ? (
                <div className="list-group">
                  <div className="list-group-item d-flex justify-content-between align-items-center">
                    <span>
                      <strong>{topCondidate.name}</strong>
                    </span>
                    <span className="badge bg-primary rounded-pill">
                      {topCondidate.viewCount} Views
                    </span>
                  </div>
                </div>
              ) : (
                <p>No condidate found.</p>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCondidate;
