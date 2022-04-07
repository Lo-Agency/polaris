import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/auth.provider';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../providers/auth.provider';

function PrivateRoute({ children }) {
	const location = useLocation();
	const auth = useAuth();
	const from = location.pathname;
	let searchParams = new URLSearchParams();

	if (auth.user) {
		return children;
	}

	if (from.includes('/invite')) {
		const inviteId = from.split('/')[1];
		searchParams.append('invitedId', inviteId);
		const queryParams = searchParams.toString();
		return <Navigate to={`/login/?${queryParams}`} state={{ from: location }} />;
	}

	return <Navigate to={'/login'} state={{ from: location }} />;
}

export default PrivateRoute;
