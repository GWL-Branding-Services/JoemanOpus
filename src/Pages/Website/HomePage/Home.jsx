import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from '../../../components/navigation'

function Home() {
  return (
  <div className="overflow-x-hidden" >
  <NavBar />
  <Outlet />
  </div>
  )
}

export default Home
