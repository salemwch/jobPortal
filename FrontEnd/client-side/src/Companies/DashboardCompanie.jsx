import React, { useEffect, useState } from "react";
import jobOfferService from "../services/jobOffer"; 
import JobOfferCard from "../Companies/jobOfferCard"; 
import Header from "../componenets/header";
import Footer from "../componenets/Footer";
import { useNavigate } from "react-router-dom"; 
import JobOfferDetails from "./jobOfferDetails";
import companyService from "../services/companyservice";
import TidioLoader from '../Shared/TidioLoader';


const DashboardCompanie = () => {
  const [jobOffers, setJobOffers] = useState([]);
  const [stats, setStats] = useState(null);
  const navigate = useNavigate(); 
  const [selectedOffer, setSelectedOffer] = useState(null);
  useEffect(() => {
  const fetchData = async () => {
    try {
      const userSession = JSON.parse(sessionStorage.getItem("user"));
      const token = userSession?.refreshToken;
      const companyId = userSession?.user?._id;

      if (!companyId || !token) {
        console.warn("Missing companyId or token");
        return;
      }

      const [jobOfferRes, statsRes] = await Promise.all([
        jobOfferService.getJobOffersByCompany(companyId, token),
        companyService.getCompanyDashboardStats(token, companyId)
      ]);

      setJobOffers(jobOfferRes.data.getJobOffersByCompanyId);
      setStats(statsRes.data); 
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  fetchData();
}, []);


  const handleEdit = (offer) => {
    navigate(`/job-offer/${offer._id}/edit`);
  };

const handleDelete = async (id) => {
  const confirmed = window.confirm("Are you sure you want to delete this job offer?");
  if (!confirmed) return;

  try {
    const userSession = JSON.parse(sessionStorage.getItem("user"));
    const token = userSession?.refreshToken;

    await jobOfferService.deleteJobOffer(id, token);
    setJobOffers((prev) => prev.filter((offer) => offer._id !== id));
  } catch (error) {
    console.error("Error deleting job offer:", error);
  }
};

    return (
    <div>
      <Header />
      <div className="container mt-5">
        {stats && (
  <div className="row mb-4 text-center">
    <div className="col-md-3">
      <div className="card shadow-sm p-3">
        <h5>Total Job Offers</h5>
        <p className="text-primary fs-4">{stats.totalJobOffers}</p>
      </div>
    </div>
    <div className="col-md-3">
      <div className="card shadow-sm p-3">
        <h5>Total Applications</h5>
        <p className="text-success fs-4">{stats.totalJobApplications}</p>
      </div>
    </div>
    <div className="col-md-3">
      <div className="card shadow-sm p-3">
        <h5>Profile Views</h5>
        <p className="text-warning fs-4">{stats.profileViews}</p>
      </div>
    </div>
    
  </div>
)}

        <h2 className="text-center mb-4">My Job Offers</h2>

        {selectedOffer ? (
          <div className="row justify-content-center">
            <div className="col-md-8">
              <JobOfferDetails jobOffer={selectedOffer} onBack={() => setSelectedOffer(null)} />
            </div>
          </div>
        ) : (
          <div className="row justify-content-center">
            {jobOffers.length === 0 ? (
              <p className="text-center">No job offers found.</p>
            ) : (
              jobOffers.map((offer) => (
                <div
                  className="col-md-4 col-sm-6 mb-4"
                  key={offer._id}
                  data-aos="fade-up"
                >
                  <JobOfferCard
                    offer={offer}
                    onView={() => setSelectedOffer(offer)} 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                </div>
              ))
            )}
          </div>
        )}
      </div>
         <TidioLoader />
      <Footer />
    </div>
  );

};

export default DashboardCompanie;
