import { Redirect } from 'react-router';
import useAuth from '../hooks/useAuth'

function PrivateRoute({ children }) {
    const auth = useAuth();
    if (auth.user) return children;
    
    return <Redirect to={{ pathname: '/login', state: { logout: true } }} />;
}

export default PrivateRoute