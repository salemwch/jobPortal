import React, { useEffect, useState } from "react";
import condidateService from "../../services/condidateService";
import { motion } from "framer-motion";
import Header from "../../componenets/header";
import Footer from "../../componenets/Footer";
import { Link } from "react-router-dom";
import "./../../condidate/companyprofile/companyListStyle.css";

export default function CondidateList() {
  const [condidates, setCondidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const IMAGE_BASE_URL = "http://localhost:3000/uploads";

  useEffect(() => {
    const fetchCondidates = async () => {
      try {
        const token = JSON.parse(sessionStorage.getItem("user"))?.refreshToken;
        const response = await condidateService.getAllCondidates(token);
        setCondidates(response.data.condidates);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch condidates.");
        setLoading(false);
      }
    };

    fetchCondidates();
  }, []);

  const handleCondidateClick = async (condidateId) => {
  const userData = JSON.parse(sessionStorage.getItem("user"));
  const companyId = userData?.user?._id;
  const token = userData?.refreshToken;

  const key = `viewed_condidate_by_${companyId}_${condidateId}`;

  if (!localStorage.getItem(key)) {
    try {
      await condidateService.incrementViewCount(token, condidateId);
      localStorage.setItem(key, "true");
    } catch (error) {
      console.error("Failed to increment view count:", error);
    }
  }
};


  if (loading)
    return <p className="text-center mt-10 text-gray-600">Loading condidates...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (condidates.length === 0)
    return <p className="text-center mt-10 text-gray-600">No condidates found.</p>;

  return (
    <div>
      <Header />
      <div className="containerr">
        <h1 className="titlee">🌟 Meet Our Condidates</h1>
        <div className="cardd-grid">
          {condidates.map((condidate, index) => (
            <motion.div
              key={condidate._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="motionn-card"
            >
              <Link
                to={`/PublicCondidateProfile/${condidate._id}`}
                onClick={() => handleCondidateClick(condidate._id)}
                className="hover:scale-[1.02] transition-transform duration-300 block"
              >
                <div className="companyy-card">
                  <div className="cardd-header">
                    <div className="letterr-logo">
                      {condidate.name.charAt(0).toUpperCase()}
                    </div>
                    <h2>{condidate.name}</h2>
                    <img
                      src={`${IMAGE_BASE_URL}/${condidate.image}`}
                      alt={condidate.name}
                      className="cardd-logo"
                    />
                  </div>

                  <div className="cardd-content">
                    <p>📍 Location: {condidate.location}</p>
                    <div className="badgee">
                      🛠️ Skills:{" "}
                      {condidate.skills && condidate.skills.length > 0
                        ? condidate.skills.join(", ")
                        : "No skills listed"}
                    </div>
                    <div className="badgee" style={{ marginTop: "8px" }}>
                      👁️ Views: {condidate.viewCount || 0}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
