import { Navigate, useLocation } from 'react-router-dom';
import config from '../../util/config';
// import { extractDataFromEntity } from '../../util/extract-data';
import { useAuth } from '../providers/auth.provider';
import 'react-toastify/dist/ReactToastify.css';
// import { useCrud } from '../providers/crud.provider';

function PrivateRoute({ children }) {
	// const crud = useCrud();
	// const dataState = crud.dataState;

	const { user } = useAuth();
	const location = useLocation();
	// const users = extractDataFromEntity('member', dataState);
	// const from = location.state?.from?.pathname;

	if (!user) return <Navigate to={config.routes.login.pathname} state={{ from: location }} />;

	// const userData = users && users[user.uid];

	// if (userData?.type === 'user' && location.pathname !== '/') {
	// 	return <Navigate to={config.routes.home.pathname} state={{ from: location }} />;
	// }
	// if (userData?.type === 'admin') {
	// 	if (from && !from.startsWith('/admin')) {
	// 		return <Navigate to={'/admin/lesson-category/list'} state={{ from: location }} />;
	// 	}
	// }

	return children;
}

export default PrivateRoute;
