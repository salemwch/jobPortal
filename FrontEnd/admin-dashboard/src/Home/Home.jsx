import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/sidebar'
import Header from '../components/header'

const Home = () => {
  return (
    

  <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
    {/* Sidebar Start */}
    <Sidebar/>
    {/*  Sidebar End */}
    {/*  Main wrapper */}
    <div className="body-wrapper">
      {/*  Header Start */}
      <Header/>
      {/*  Header End */}
      <div className="container-fluid">
   <Outlet/>


    </div>
  </div>
</div>

    
  )
}

export default Home
