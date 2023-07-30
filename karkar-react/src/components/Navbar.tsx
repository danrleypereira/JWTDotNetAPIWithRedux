import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectors } from '../features/user'

export const Navbar: React.FC = () => {
  const token = useSelector(selectors.getUserToken)
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
            {new Date(token.expiration) > new Date(Date.now()) ? (
              <Fragment>
                <li>
                  <NavLink to="/profile">Profile</NavLink>
                </li>
                <li>
                  <NavLink to="/new">New Car</NavLink>
                </li>
              </Fragment>
            ) : (
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            )}
        </ul>
      </div>
    </nav>
  )
}
