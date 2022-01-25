import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/auth.provider';

function PublicRoute({ children }) {
    const { user } = useAuth();
    const location = useLocation();
    
    if(user) return <Navigate to={"/"} state={{ from: location }} />

    return children
}

export default PublicRoute;
