import { Navigate, useLocation } from 'react-router-dom';
import config from '../../util/config';
import { extractDataFromEntity } from '../../util/extract-data';
import { useAuth } from '../providers/auth.provider';
import 'react-toastify/dist/ReactToastify.css';

function PrivateRoute({ children }) {
    const { user, logOut } = useAuth();
    const location = useLocation();
    const users = extractDataFromEntity("user")
    const from = location.state?.from?.pathname;

    if (!user) return <Navigate to={config.routes.login.pathname} state={{ from: location }} />;

    const userData = users && users[user.uid]
    if (userData && (userData?.isApproved == ['false'] || !userData.isApproved)) {
        logOut()
        return <Navigate to={config.routes.login.pathname} state={{ from: location }} />
    }
    
    if (userData?.type[0] == "user" && location.pathname != '/') {
        return <Navigate to={config.routes.home.pathname} state={{ from: location }} />;
    }

    if (userData?.type[0] == "admin") {
        if (from && !from.startsWith('/admin')) {
            return <Navigate to={'/admin/roadmap/list'} state={{ from: location }} />;
        }
    }

    return children
}

export default PrivateRoute;