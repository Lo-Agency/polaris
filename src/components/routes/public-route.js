import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/auth.provider';

function PublicRoute({ children }) {
	const { user, functionIsLoading } = useAuth();
	const location = useLocation();
	if (user && !functionIsLoading) {
		return <Navigate to={'/home'} state={{ from: location }} />;
	}

	return children;
}

export default PublicRoute;
