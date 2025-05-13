import React, { useEffect, useState } from 'react'
import Statistic from '../pages/Statistic';
import RoleBasedStatistics from '../RoleBasedStatistic/RoleStatistics';

const Layout = () => {  
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
    </div> {/* .site-mobile-menu */}
    {/* HOME */}
    <section className="py-5 bg-image overlay-primary fixed overlay" style={{backgroundImage: 'url("images/hero_1.jpg")'}}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-8">
            <h2 className="text-white">Looking For A Job?</h2>
            <p className="mb-0 text-white lead">Lorem ipsum dolor sit amet consectetur adipisicing elit tempora adipisci impedit.</p>
          </div>
          <div className="col-md-3 ml-auto">
            <a href="/register" className="btn btn-warning btn-block btn-lg">Sign Up</a>
          </div>
        </div>
      </div>
    </section>
    <RoleBasedStatistics/>
    <section className="site-section py-4">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 text-center mt-4 mb-5">
            <div className="row justify-content-center">
              <div className="col-md-7">
                <h2 className="section-title mb-2">Company We've Helped</h2>
                <p className="lead">Porro error reiciendis commodi beatae omnis similique voluptate rerum ipsam fugit mollitia ipsum facilis expedita tempora suscipit iste</p>
              </div>
            </div>
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img src="images/logo_mailchimp.svg" alt="Image" className="img-fluid logo-1" />
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img src="images/logo_paypal.svg" alt="Image" className="img-fluid logo-2" />
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img src="images/logo_stripe.svg" alt="Image" className="img-fluid logo-3" />
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img src="images/logo_visa.svg" alt="Image" className="img-fluid logo-4" />
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img src="images/logo_apple.svg" alt="Image" className="img-fluid logo-5" />
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img src="images/logo_tinder.svg" alt="Image" className="img-fluid logo-6" />
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img src="images/logo_sony.svg" alt="Image" className="img-fluid logo-7" />
          </div>
          <div className="col-6 col-lg-3 col-md-6 text-center">
            <img src="images/logo_airbnb.svg" alt="Image" className="img-fluid logo-8" />
          </div>
        </div>
      </div>
    </section>
    <section className="bg-light pt-5 testimony-full">
      <div className="owl-carousel single-carousel">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center text-center text-lg-left">
              <blockquote>
                <p>“Soluta quasi cum delectus eum facilis recusandae nesciunt molestias accusantium libero dolores repellat id in dolorem laborum ad modi qui at quas dolorum voluptatem voluptatum repudiandae.”</p>
                <p><cite> — Corey Woods, @Dribbble</cite></p>
              </blockquote>
            </div>
            <div className="col-lg-6 align-self-end text-center text-lg-right">
              <img src="images/person_transparent_2.png" alt="Image" className="img-fluid mb-0" />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center text-center text-lg-left">
              <blockquote>
                <p>“Soluta quasi cum delectus eum facilis recusandae nesciunt molestias accusantium libero dolores repellat id in dolorem laborum ad modi qui at quas dolorum voluptatem voluptatum repudiandae.”</p>
                <p><cite> — Chris Peters, @Google</cite></p>
              </blockquote>
            </div>
            <div className="col-lg-6 align-self-end text-center text-lg-right">
              <img src="images/person_transparent.png" alt="Image" className="img-fluid mb-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="pt-5 bg-image overlay-primary fixed overlay" style={{backgroundImage: 'url("images/hero_1.jpg")'}}>
      <div className="container">
        <div className="row">
          <div className="col-md-6 align-self-center text-center text-md-left mb-5 mb-md-0">
            <h2 className="text-white">Get The Mobile Apps</h2>
            <p className="mb-5 lead text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit tempora adipisci impedit.</p>
            <p className="mb-0">
              <a href="#" className="btn btn-dark btn-md px-4 border-width-2"><span className="icon-apple mr-3" />App Store</a>
              <a href="#" className="btn btn-dark btn-md px-4 border-width-2"><span className="icon-android mr-3" />Play Store</a>
            </p>
          </div>
          <div className="col-md-6 ml-auto align-self-end">
            <img src="images/apps.png" alt="Free Website Template by Free-Template.co" className="img-fluid" />
          </div>
        </div>
      </div>
    </section>
  </div>
</div>

  )
}

export default Layout
