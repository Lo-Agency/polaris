import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../providers/auth.provider";
import config from "../../util/config";

const CustomRoute = ({ children, isProtected }) => {

    let { User } = useAuth();
    let location = useLocation();
    let from = location.state?.from?.pathname;
    if (isProtected) {
        if (!User) return <Navigate to={config.routes.login.pathname} state={{ from: location }} />;

        if(from != '/admin') return <Navigate to={config.routes.admin.pathname} state={{ from: location }} />;
    }
    if (User && from != '/admin' ) return <Navigate to={config.routes.admin.pathname} state={{ from: location }} />;
    return children;

   
};

export default CustomRoute;