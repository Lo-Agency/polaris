import { push, ref } from "@firebase/database";
import { createContext, useContext} from "react";
import config from "../../util/config";
import { database } from "../../util/firebase";

const CrudContext = createContext(null);

const CrudProvider = ({children}) => 
{
    const Create = async (values, entity) => {
        const items = Object.keys(config.entities[entity].fields);
        console.log(items);
        console.log(values);
        let object={};

            items.forEach((key, index)=>{
                object[key]=values[index]
         }); 
 
        console.log(object);

        await push(ref(database, `roadmap/frontend/${entity}`), object);
	};

    return <CrudContext.Provider value={{
        Create
    }}>
        {children}

    </CrudContext.Provider>

}

export default CrudProvider;
export const useCrud = () => useContext(CrudContext);