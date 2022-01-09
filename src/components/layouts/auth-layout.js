import { useNavigate } from "react-router-dom";

const AuthLayout = ({ children }) => {
    const navigate = useNavigate();
    return (
        <div className="center-content bg-black">
            <button className=" mx-4 top-2 text-white right-2 fixed hover:text-gray-500" onClick={() => { navigate('/') }}>Back</button>
            <div className="bg-gray-50 p-10 flex flex-col justify-center items-center border-blue-40 rounded-lg border-4 xsm:text-sm">
                {children}
            </div>
        </div>
    )
}

export default AuthLayout;