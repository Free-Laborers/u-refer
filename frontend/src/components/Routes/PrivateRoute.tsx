import { Route, Redirect, RouteProps } from 'react-router'
import useAuth from '../../hooks/useAuth'
import Navbar from '../Navbar';

interface PrivateRouteProps {
    component: any,
    nonavbar?: boolean
}

// Stuart:
// private route will redirect to login if the user is not logged in
// not sure how typescript works :D
function PrivateRoute({component: Component, nonavbar, ...routeProps}: PrivateRouteProps & RouteProps) {
    return (
        <Route {...routeProps} render={props => {
            if (useAuth().user) {
                // logged in, return the component (with navbar if not nonavbar)
                return (
                    <>
                        {nonavbar ? null : <Navbar />}
                        <Component {...props} />
                    </>
                );
            } else {
                // not logged in, redirect to login.
                return <Redirect to='/login' />;
            }
        }}/>
    )
}

export default PrivateRoute