import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from '../../../components/navigation'
import Footer from '../../../components/footer/footer'

function Home() {
  return (
  <div className="overflow-x-hidden" >
  <NavBar />
  <Outlet />
  <Footer />
  </div>
  )
}

export default Home
