import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, auth: { isAuthenticated, loading }, ...rest }) => {
    return <Outlet {...rest} render={props => !isAuthenticated && !loading ? (<Navigate  to='/login'  />) : (<Component {...props} />) } />
}




PrivateRoute.propTypes = {
   auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)