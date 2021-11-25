import { useParams } from "react-router"
import { Link } from "react-router-dom"
import config from "../../util/config";

const Adminlayout = ({ children }) => {
    const { entityName, actionName } = useParams()

    return (
        <>
            <div className="bg-myBlue flex w-screen h-screen">
                <div className="bg-yellow w-40 px-4 ">
                    <aside className=" h-screen" >
                        <ul className="flex justify-end flex-col p-4 text-xl" >
                            {
                                Object.keys(config.entities)
                                    .map(key => <li className="mt-4 p-2 hover:bg-myBlue rounded-lg transition-colors" key={key}><Link to={`/admin/${key.toLowerCase()}/list`}>{key}</Link></li>)
                            }
                        </ul>
                    </aside>
                </div>
                <div className=" flex flex-col w-11/12 h-12/12 py-2">
                    <p className="p-5">{entityName} : {actionName} </p>
                    <div className="flex justify-center items-center w-11/12 h-96">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Adminlayout;