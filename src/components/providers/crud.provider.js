  import { push, ref, onValue, child, getDatabase, get, firebase, remove } from "@firebase/database";
  import { useState, createContext, useContext, useEffect } from "react";
  import { useParams } from "react-router";
  import config from "../../util/config";
  import { database } from "../../util/firebase";
  

  const CrudContext = createContext(null);

  const CrudProvider = ({ children }) => {
    const [mydata, setmydata] = useState(null)
    const [change, setChange] = useState(false)
    const { entityName } = useParams();


    useEffect(() => {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `roadmap/frontend/${entityName}`)).then((snapshot) => {
        if (snapshot.exists()) {
          let mydata = snapshot.val();
          setmydata(mydata);
        } else {
          console.log(mydata);
          setmydata(null)
        }
      }).catch((error) => {
        console.error(error);
      });
    }, [entityName, change])

    const Create = async (values, entity) => {
      const items = Object.keys(config.entities[entity].fields);
      let object = {};
      //creating object dynamically to be entered into firebase
      items.forEach((key, index) => {
        object[key] = values[index]
      });
      //console.log(object);
      await push(ref(database, `roadmap/frontend/${entity}`), object);
    };


    const Delete = async (item) => {
      await remove(ref(database, `roadmap/frontend/${entityName}/${item}`));
      setChange(!change)
    
    }
    
    return <CrudContext.Provider value={{
      Create,
      mydata,
      Delete

    }}>
      {children}
    </CrudContext.Provider>

  }

  export default CrudProvider;
  export const useCrud = () => useContext(CrudContext);