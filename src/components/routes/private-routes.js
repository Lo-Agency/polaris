import { Navigate, useLocation } from 'react-router-dom';
import config from '../../util/config';
import AdminLayout from '../layouts/admin-layout';
import { useAuth } from '../providers/auth.provider';

function PrivateRoute({ children }) {
    const { User } = useAuth();
    const location = useLocation();
    const from = location.state?.from?.pathname;

    if (!User) return <Navigate to={config.routes.login.pathname} state={{ from: location }} />;

    if (from && !from.startsWith('/admin')) return <Navigate to={"/admin/learning/list"} state={{ from: location }} />;

    return <AdminLayout>{children}</AdminLayout>
}

export default PrivateRoute;