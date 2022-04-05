import { Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../util/config';
import { useAuth } from '../providers/auth.provider';

function PrivateRoute({ children }) {
	const { user } = useAuth();
	if (!user) return <Navigate to={config.routes.landing.pathname} state={{ from: location }} />;
	return children;
}

export default PrivateRoute;
