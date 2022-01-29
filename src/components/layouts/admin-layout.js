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
    const logOut = async () => {
        try {
            await auth.logOut()
            navigate('/login')
        } catch (e) {
            console.log(e)
        }
    }

    const getSelectedEntityClassName = (key) => {
        if (key === entityName) {
            return "w-full bg-white text-black text-lg tracking-wide py-3 px-4 transition-colors text-left px-2"
        }
        return "w-full hover:bg-gray-800 tracking-wide py-3 text-lg px-4 transition-colors text-left px-2"
    }

    return (
        <div className="relative">
            <aside className="bg-black fixed h-screen border border-black text-white w-1/6 justify-between flex-col flex">
                <div>
                    <h1 className="text-center text-2xl m-5 ">Polaris.</h1>
                    <ul className="flex justify-start flex-col text-base">
                        {
                            Object.keys(config.entities).map(key =>
                                <li className={getSelectedEntityClassName(key)} key={key}>
                                    <Link className="flex justify-start items-center"
                                        to={`/admin/${key.toLowerCase()}/list`}>
                                        {title(key)}
                                    </Link>
                                </li>)
                        }
                    </ul>
                </div>
                <button className="text-center text-base p-5 hover:bg-gray-800" onClick={logOut}>Logout</button>
            </aside>

            <div className="top-0 absolute right-0 w-5/6">

                <header className="fixed navbar w-5/6">
                    <p className="px-4">{title(entityName)}</p>
                    <div>
                        <Link className="mx-2" to={`/`}>Home</Link>
                        <Link className="py-2 px-4 mx-2 text-center bg-black text-white transition-colors hover:text-gray-400" to={`/admin/${entityName}/create`}>Create new</Link>
                    </div>
                </header>

                {children}
            </div>
            <ToastContainer />
        </div>
    )
}

export default AdminLayout;