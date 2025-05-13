import { useEffect, useState } from "react"
import statistic from "../../services/statistic";
import condidateService from "../../services/condidateService";
const CompaniesStatistics = () =>{
  const [condidates, setCondidates] = useState([]);
  const [token, setToken] = useState("");
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user"));
    const accessToken = storedUser?.refreshToken; 
    setToken(accessToken);

    if (accessToken) {
      condidateService.getAllCondidates(accessToken)
        .then((res) => {
          setCondidates(res.data.condidates);
        })
        .catch((err) => {
          console.error("Failed to fetch condidates", err);
        });
    }
  }, []);
    const [stats, setStats] = useState({
           totalCompanies: 0,
           totalCondidates: 0,
           totalJobOffers: 0,
           totalJobApplications: 0,
       });
        useEffect(() => {
       
               statistic.getDashboardStats()
                   .then((res) => setStats(res.data))
                   .catch((err) => console.log("error fetching dashboard stats: ", err));
           }, [])









    return(
        <div>
            <section className="py-5 bg-image overlay-primary fixed overlay" id="next" style={{ backgroundImage: 'url("images/hero_1.jpg")' }}>
                <div className="container">
                    <div className="row mb-5 justify-content-center">
                        <div className="col-md-7 text-center">
                            <h2 className="section-title mb-2 text-white">JobBoard Site Stats</h2>
                            <p className="lead text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita unde officiis recusandae sequi excepturi corrupti.</p>
                        </div>
                    </div>
                    <div className="row pb-0 block__19738 section-counter">
                        <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <strong className="number" >{stats.totalCondidates}</strong>
                            </div>
                            <span className="caption">Condidates</span>
                        </div>
                        <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <strong className="number" >{stats.totalJobOffers}</strong>
                            </div>
                            <span className="caption">Jobs Posted</span>
                        </div>
                        <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <strong className="number" >{stats.totalJobApplications}</strong>
                            </div>
                            <span className="caption">Jobs Applications</span>
                        </div>
                        <div className="col-6 col-md-6 col-lg-3 mb-5 mb-lg-0">
                            <div className="d-flex align-items-center justify-content-center mb-2">
                                <strong className="number" > {stats.totalCompanies} </strong>
                            </div>
                            <span className="caption">Companies</span>
                        </div>
                    </div>
                </div>
            </section>
             <section className="site-section">
      <div className="container">
        <div className="row mb-5 justify-content-center">
          <div className="col-md-7 text-center">
            <h2 className="section-title mb-2">
              {condidates.length} Condidates
            </h2>
          </div>
        </div>
        <ul className="job-listings mb-5">
          {condidates && condidates.length > 0 ? (
            condidates.map((condidate) => (
              <li
                key={condidate._id}
                className="job-listing d-block d-sm-flex pb-3 pb-sm-0 align-items-center"
              >
                <div className="job-listing-logo">
                  <img
                    src={`http://localhost:3000/uploads/${condidate.image}`}
                    alt={condidate.name}
                    className="img-fluid"
                  />
                </div>
                <div className="job-listing-about d-sm-flex custom-width w-100 justify-content-between mx-4">
                  <div className="job-listing-position custom-width w-50 mb-3 mb-sm-0">
                    <h2>{condidate.name}</h2>
                    <strong>{condidate.education}</strong>
                  </div>
                  <div className="job-listing-location mb-3 mb-sm-0 custom-width w-25">
                    <span className="icon-room" /> {condidate.location}
                  </div>
                  <div className="job-listing-meta">
                    <span className="badge badge-primary">
                      {condidate.status}
                    </span>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No condidates found.</p>
          )}
        </ul>
      </div>
    </section>
        </div>
    )
}
export default CompaniesStatistics