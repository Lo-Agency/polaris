import { title } from "case";
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import config from "../../util/config";
import { useNavigate } from "react-router";
import { useAuth } from "../providers/auth.provider";
import { ToastContainer } from "react-toastify";

const AdminLayout = ({ children }) => {
    const { entityName, actionName } = useParams()
    const auth = useAuth();
    const navigate = useNavigate();

    const logOut = () => {
        try {
            auth.logOut(() => {
                navigate('/')
            })
        } catch (e) {
            console.log(e)
        }
    }

    const getSelectedEntityClassName = (key) => {
        if (key == entityName) {
            return "w-full font-extrabold tracking-wide py-3 transition-colors text-left px-2"
        }
        return "w-full tracking-wide hover:bg-gray-900 py-3 transition-colors text-left px-2"
    }

    const getSvgColor = (key) => {
        if (key == entityName) return "white"
        return "transparent"
    }

    return (
        <div className="relative">
            <aside className="bg-black fixed h-screen text-white w-1/6 justify-between flex-col flex" >
                <div>
                    <h1 className="text-center text-2xl m-5 ">Polaris</h1>
                    <ul className="flex justify-start  flex-col text-base">
                        {
                            Object.keys(config.entities).map(key =>
                                <li className={getSelectedEntityClassName(key)} key={key}>
                                    <Link className="flex justify-start items-center" to={`/admin/${key.toLowerCase()}/list`}>
                                        <svg className="w-6 h-6" fill={getSvgColor(key)} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                        {title(key)}
                                    </Link>
                                </li>)
                        }
                    </ul>
                </div>
                <button className="text-center text-base p-5 hover:bg-gray-900" onClick={logOut}>Logout</button>
            </aside>
            {children}
            <ToastContainer />
        </div>
    )
}

export default AdminLayout;