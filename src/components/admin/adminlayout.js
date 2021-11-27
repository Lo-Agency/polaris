import { title } from "case";
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import config from "../../util/config";


const Adminlayout = ({ children }) => {
    const { entityName, actionName } = useParams()

    return (
        <>
            <div className="bg-myBlue flex w-screen h-screen">
                <div className="bg-cyan w-40 pb-2">
                    <aside  >
                        <ul className="flex justify-end flex-col text-xl" >
                            {
                                Object.keys(config.entities)
                                    .map(key =><li className="w-full hover:bg-lightblue py-4 transition-colors text-left pl-8" key={key}><Link to={`/admin/${key.toLowerCase()}/list`}>
                                        {title(key)} 
                                        </Link></li>)
                            }
                        </ul>
                    </aside>
                </div>
                <div className=" flex flex-col w-11/12 h-12/12 bg-lightGray">
                    <p className="p-4 bg-blue mb-5">{entityName} table</p>
                    <div className="flex justify-center items-center w-11/12 h-auto">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Adminlayout;