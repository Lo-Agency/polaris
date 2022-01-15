import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/auth.provider';

function PublicRoute({ children }) {
    const { User } = useAuth();
    const location = useLocation();
    
    if(User) return <Navigate to={"/admin/roadmap/list"} state={{ from: location }} />

    return children
}

export default PublicRoute;