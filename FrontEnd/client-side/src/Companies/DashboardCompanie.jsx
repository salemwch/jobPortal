import Footer from "../componenets/Footer"
import Header from "../componenets/header"

const DashboardCompanie = () => {
    return (
        <div>
                  <div className="container-xxl bg-white p-0">

            <Header/>
            <div className="container-xxl py-5">
    <div className="container">
      <h1 className="text-center mb-5 wow fadeInUp" data-wow-delay="0.1s">Job Listing</h1>
      <div className="tab-class text-center wow fadeInUp" data-wow-delay="0.3s">
        <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
          <li className="nav-item">
            <a className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active" data-bs-toggle="pill" href="#tab-1">
              <h6 className="mt-n1 mb-0">Featured</h6>
            </a>
          </li>
        </ul>
        <div className="tab-content">
        <div id="tab-1" className="tab-pane fade show p-0 active">

  <a className="btn btn-primary py-3 px-5" href="/">
    Browse More Jobs
  </a>
</div>

        </div>
      </div>
    </div>
  </div>
        </div>
        <Footer/>
        </div>
    )
}

export default DashboardCompanie