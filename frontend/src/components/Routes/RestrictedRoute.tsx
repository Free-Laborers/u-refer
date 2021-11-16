import { Route, Redirect, RouteProps } from 'react-router'
import useAuth from '../../hooks/useAuth'
import Navbar from '../Navbar';

interface RestrictedRouteProps {
    component: any
}

// Stuart:
// restricted route will redirect to job feed if logged in
// not sure how typescript works :D
function RestrictedRoute({component: Component, ...routeProps}: RestrictedRouteProps & RouteProps) {
    return (
        <Route {...routeProps} render={props => {
            if (useAuth().user) {
                // logged in, not allowed on this page so redirect to job feed
                return <Redirect to='/jobs' />;
            } else {
                // render the component.
                return <Component {...props} />;
            }
        }}/>
    )
}

export default RestrictedRoute