import { ReactNode } from 'react';
import { Route, Redirect } from 'react-router';
import useAuth from '../hooks/useAuth'

function PrivateRoute({children: ReactNode, ...rest}) {
    const auth = useAuth();
    return <Route {...rest} render={props => {
        console.log(auth);
        return (auth.user ? children : <Redirect to='/login'/>)
    }} />
}

export default PrivateRoute