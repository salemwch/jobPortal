import { useEffect, useState } from "react";
import  recentView  from "../../services/recentView";

const RecentUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).tokens.refreshToken
      : null; 
      const response = await recentView.getRecentUsers(token, 5);
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  return (
    <div className="col-lg-7 d-flex align-items-stretch">
      <div className="card w-100">
        <div className="card-body p-4">
          <h5 className="card-title fw-semibold mb-4">Recent Accounts</h5>
          <div className="table-responsive">
            <table className="table text-nowrap mb-0 align-middle">
              <thead className="text-dark fs-4">
                <tr>
                  <th className="border-bottom-0">ID</th>
                  <th className="border-bottom-0">Name</th>
                  <th className="border-bottom-0">Email</th>
                  <th className="border-bottom-0">Status</th>
                  <th className="border-bottom-0">Created At</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`badge rounded-3 ${user.status === "approved" ? "bg-success" : "bg-danger"}`}>
                        {user.status}
                      </span>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
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

export default RecentUsers;
