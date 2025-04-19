import React from 'react'
import Header from '../componenets/header'
import Footer from '../componenets/Footer'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
  <div className="site-wrap">
    <div className="site-mobile-menu site-navbar-target">
      <div className="site-mobile-menu-header">
        <div className="site-mobile-menu-close mt-3">
          <span className="icon-close2 js-menu-toggle" />
        </div>
      </div>
      <div className="site-mobile-menu-body" />
    </div> 
    {/* NAVBAR */}
    <Header/>
    {/* HOME */}
   <Outlet/>
    <Footer/>
  </div>
</div>

  )
}

export default Home
