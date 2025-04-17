import React from 'react'
import TopCompanies from '../pages/TopVisited/TopCompanies'
import TopCondidate from '../pages/TopVisited/TopCondidate'
import RecentUsers from '../pages/recentUsers/recentUsers'
import RecentJobApplications from '../pages/recentUsers/RecentJobApplication'
import RecentComments from '../pages/recentUsers/recentComment'

const Laouyt = () => {
  return (
   <div>
  <div className="row">
  <RecentJobApplications/>
    <div className="col-lg-4">
      <div className="row">
        <TopCompanies/>
        <TopCondidate/>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-lg-5 d-flex align-items-stretch">
      <div className="card w-100">
        <RecentComments/>
        
      </div>
    </div>
    
    <RecentUsers/>
  </div>
  
  <div className="py-6 px-6 text-center">
    <p className="mb-0 fs-4">Design and Developed by <a href="https://adminmart.com/" target="_blank" rel='noreferrer' className="pe-1 text-primary text-decoration-underline">AdminMart.com</a> Distributed by <a href="https://themewagon.com">ThemeWagon</a></p>
  </div>
</div>

  )
}

export default Laouyt
