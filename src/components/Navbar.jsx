import React from 'react'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex flex-row gap-5 justify-center p-3 text-2xl font-bold bg-blue-950 text-white'>
      <NavLink to="/" className="transition-colors duration-300 hover:text-blue-700">
         Home
      </NavLink>
      <NavLink to="/pastes" className="transition-colors duration-300 hover:text-blue-700">
         Pastes
      </NavLink>
    </div>
  )
}

export default Navbar
