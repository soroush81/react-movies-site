import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import authService from '../../services/authService'

const ProptectedRoute = ({ path, component: Component, render, ...rest }) => {
    const user = authService.getCurrentUser();
    return (
        <>
            <Route
                {...rest}
                render={(props) => {
                    if (!user) return <Redirect to={
                        {
                            pathname: '/login',
                            state: { from: props.location }
                        }
                    } />
                    return Component ? <Component {...props} /> : render(props)
                }} />
        </>
    )
}

export default ProptectedRoute
