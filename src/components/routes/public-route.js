import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/auth.provider';

function PublicRoute({ children }) {
	const { user, functionIsLoading } = useAuth();
	const location = useLocation();
	let from = location.state?.from?.pathname;
	if (user && !functionIsLoading) {
		if (from) {
			return <Navigate to={from} state={{ from: location }} />;
		}
		return <Navigate to={'/'} state={{ from: location }} />;
	}

	return children;
}

export default PublicRoute;
