import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children }) => {
    return (
        <div className="center-content bg-black">
            <div className="bg-gray-50 p-10 flex flex-col justify-center items-center border-blue-40 border-4 xsm:text-sm">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout;