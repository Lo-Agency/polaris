import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/auth.provider';
import { useParams } from 'react-router';
import { useCrud } from '../providers/crud.provider';
import 'react-toastify/dist/ReactToastify.css';

function PrivateRoute({ children }) {
	const location = useLocation();
	const auth = useAuth();
	const crud = useCrud();
	const from = location.pathname;
	let searchParams = new URLSearchParams();
	const { workspaceId, sharedworkspaceId } = useParams();
	if (!auth.loading && auth.user) {
		if (workspaceId && workspaceId !== auth.user.uid) {
			return <Navigate to={`/${auth.user.uid}/${auth.user.uid}`} state={{ from: location }} />;
		}
		const userEmail = crud.dataState && crud.dataState[auth.user.uid]['userinformation']['email'];
		let members;
		if (crud.dataState?.sharedworkspaceId?.member) {
			members = Object.values(crud.dataState[sharedworkspaceId]['member']).map((member) => member['email']);
		}

		if (!sharedworkspaceId || sharedworkspaceId === auth.user.uid || (members && members.includes(userEmail))) {
			return children;
		}
		return <Navigate to={`/${auth.user.uid}/${auth.user.uid}`} state={{ from: location }} />;
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
