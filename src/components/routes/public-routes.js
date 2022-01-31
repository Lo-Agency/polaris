import { Navigate, useLocation } from 'react-router-dom';
import { extractDataFromEntity } from '../../util/extract-data';
import { useAuth } from '../providers/auth.provider';
import { useCrud } from '../providers/crud.provider';

function PublicRoute({ children }) {
    const { user } = useAuth();
    const crud = useCrud()
    const dataState = crud.dataState
    const location = useLocation();
    const users = extractDataFromEntity("user",dataState);
    const userData = users && users[user?.uid];

    if(user && userData?.isApproved === ['true']){
         return <Navigate to={"/"} state={{ from: location }} />
        }

    return children
}

export default PublicRoute;
