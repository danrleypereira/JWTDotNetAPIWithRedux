import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { selectors as userSelectors } from '../features/user'

interface PrivateRouteProps {
  children: React.ReactNode
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = useSelector(userSelectors.getUserToken)
  const isAuth =
    Object.keys(token).length !== 0 && new Date(token.expiration) > new Date(Date.now())

  if (!isAuth) {
    return (
      <Fragment>
        <Navigate to="/login" replace />
      </Fragment>
    )
  }

  return <>{children}</>
}

export default PrivateRoute
