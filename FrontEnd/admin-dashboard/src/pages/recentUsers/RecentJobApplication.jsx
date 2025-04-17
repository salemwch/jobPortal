import { useEffect, useState } from "react";
import recentView from "../../services/recentView";

const RecentJobApplications = () => {
  const [jobApplications, setJobApplications] = useState([]);

  useEffect(() => {
    const fetchJobApplications = async () => {
        const token = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")).tokens.refreshToken
  : null;
      const response = await recentView.getRecentJobApplications(token, 5); 
      setJobApplications(response.data);
    };
    fetchJobApplications();
  }, []);

  return (
    <div className="col-lg-8 d-flex align-items-stretch">
      <div className="card w-100">
        <div className="card-body p-4">
          <h5 className="card-title fw-semibold mb-4">Recent Job Applications</h5>
          <div className="table-responsive">
            <table className="table text-nowrap mb-0 align-middle">
              <thead className="text-dark fs-4">
                <tr>
                  <th className="border-bottom-0">ID</th>
                  <th className="border-bottom-0">Candidate ID</th>
                  <th className="border-bottom-0">Job Offer ID</th>
                  <th className="border-bottom-0">Status</th>
                  <th className="border-bottom-0">Created At</th>
                </tr>
              </thead>
              <tbody>
                {jobApplications.map((app, index) => (
                  <tr key={app._id}>
                    <td>{index + 1}</td>
                    <td>{app.condidate}</td>
                    <td>{app.jobOffer}</td>
                    <td>
                      <span className={`badge rounded-3 ${app.status === "approved" ? "bg-success" : "bg-warning"}`}>
                        {app.status}
                      </span>
                    </td>
                    <td>{new Date(app.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentJobApplications;
