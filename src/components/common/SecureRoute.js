import React from 'react'
import { Route } from 'react-router-dom'
import Auth from '../../lib/Auth'


const SecureRoute = ({ component: Component, ...otherProps }) => {
  if (Auth.isAuthenticated()) return <Route {...otherProps} component={Component}/>
  return null
}

export default SecureRoute
