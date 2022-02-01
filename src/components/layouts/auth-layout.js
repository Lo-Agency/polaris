import { ToastContainer } from "react-toastify";

const AuthLayout = ({ children }) => {
    return (
        <div className="center-content">
            <div className="p-10 flex flex-col justify-center items-center shadow-2xl xsm:text-sm">
                {children}
            </div>
            <ToastContainer />
        </div>
    )
}

export default AuthLayout;