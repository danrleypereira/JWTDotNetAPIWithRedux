import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectors } from '../features/user'

export const Navbar: React.FC = () => {
  const user = useSelector(selectors.getUserValue)
  return (
  <nav>
    <div className="nav-wrapper cyan darken-1 px1">
      <NavLink to="/" className="brand-logo">
        KarKar
      </NavLink>
      <ul className="right hide-on-med-and-down">
        <li cy-data="home-nav-link">
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/cars">Cars</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        {user ? (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        ) : (
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
        )}
      </ul>
    </div>
  </nav>
)
}
