import { Navigate, useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../util/config';
import { useAuth } from '../providers/auth.provider';

function PrivateRoute({ children }) {
	const { user, loading } = useAuth();
	const location = useLocation();
	if (!user && !loading) return <Navigate to={config.routes.login.pathname} state={{ from: location }} />;
	return children;
}

export default PrivateRoute;
