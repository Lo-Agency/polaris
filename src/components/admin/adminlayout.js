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
            return "w-full text-2xl font-bold py-3 transition-colors text-left px-2"
        }else{
            return  "w-full text-md hover:text-gray-500  py-3 transition-colors text-left px-2"
        }
    }

    const svgColor=(key)=>{
        if(key== entityName) return "white"
        else return "black"
    }

    return (
        <>
           
           
                <div className="bg-black  fixed h-screen text-white w-40 pb-2 ">
                    <aside  >
                        <ul className="flex justify-start flex-col text-xl" >
                            {
                                Object.keys(config.entities)
                                    .map(key => <li className={selectEntity(key)} key={key}><Link className="flex justify-start items-center" to={`/admin/${key.toLowerCase()}/list`}>
                                        <svg className="w-6 h-6" fill={svgColor(key)} viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                        {title(key)}
                                    </Link></li>
                                    
                                    )
                            }
                        </ul>
                    </aside>
                </div>
                <div className=" flex flex-col w-12/12 pl-10 h-12/12 ml-40 items-end bg-lightGray">
                    <div className="flex justify-center items-center  self-start min-w-full h-auto">
                         <button className=" mx-4 top-2 right-2 fixed hover:text-gray-500" onClick={logOut}>Log Out</button>
                        {children}
                    </div>
                </div>
     
        </>
    )
}

export default Adminlayout;