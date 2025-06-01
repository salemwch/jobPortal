import React from 'react'
import Header from '../componenets/header'
import Footer from '../componenets/Footer'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <div>
  <div className="site-wrap">
     
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
