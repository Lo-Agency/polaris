import { title } from "case";
import { useParams } from "react-router"
import { Link } from "react-router-dom"
import config from "../../util/config";
import { useNavigate} from "react-router";
import { useAuth } from "../providers/auth.provider";

const Adminlayout = ({ children }) => {
    const { entityName, actionName } = useParams()
    const auth = useAuth();
    const navigate= useNavigate();
    const logOut = ()=>{
        try{
            auth.LogOut(()=>{
                navigate('/')
              })
        } catch (e) {
			console.log(e)

		}
    }

    const selectEntity=(key)=>{
        if(key == entityName){
            return " w-full bg-gray-50 text-black py-3 transition-colors text-left pl-8"
        }else{
            return  "w-full hover:text-gray-500 py-3 transition-colors text-left pl-8"
        }
    }

    return (
        <>
            <div className="bg-myBlue flex w-screen h-screen">
            <button className=" mx-4 absolute  top-2 right-2  py-2 my-4 text-center w-56 rounded-lg bg-black text-white transition-colors hover:text-gray-500" onClick={logOut}>Log Out</button>
                <div className="bg-black text-white w-40 pb-2 ">
                    <aside  >
                        <ul className="flex justify-end flex-col text-xl" >
                            {
                                Object.keys(config.entities)
                                    .map(key => <li className={selectEntity(key)} key={key}><Link to={`/admin/${key.toLowerCase()}/list`}>
                                        {title(key)} 
                                        </Link></li>)
                            }
                        </ul>
                    </aside>
                </div>
                <div className=" flex flex-col w-11/12 h-12/12 bg-lightGray">
                    <div className="flex justify-center items-center w-11/12 h-auto">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Adminlayout;