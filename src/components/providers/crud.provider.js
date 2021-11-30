import { push, ref, child, getDatabase, get, remove, set } from "@firebase/database";
import { useState, createContext, useContext, useEffect } from "react";
import { useParams } from "react-router";
import config from "../../util/config";
import { database } from "../../util/firebase";


const CrudContext = createContext(null);

const CrudProvider = ({ children }) => {
  const [change, setChange] = useState(false)
  const [editData, setEditData] = useState(null)
  const { entityName } = useParams();
  const [dataState, setDataState] = useState();


  useEffect(() => {
    getAllData().then((data)=>{
      setDataState(data)
    })
 
  }, [change])

  const getAllData = async() => {
    const allPromises = Object.keys(config.entities).map(entity => {
      return new Promise((resolve, reject) => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `roadmap/frontend/${entity}`)).then((snapshot) => {
          resolve({ [entity]: snapshot.val() })
        }).catch((error) => {
          reject(error);
        })
      })

    })
    return await Promise.all(allPromises);
  }
  


  const Create = async (values, entity) => {
    const items = Object.keys(config.entities[entity].fields);
    let result = values.reduce(function (result, field, index) {
      result[items[index]] = field;
      return result;
    }, {})
    await push(ref(database, `roadmap/frontend/${entity}`), result);
    setChange(!change)

  };


  const Delete = async (item) => {
    await remove(ref(database, `roadmap/frontend/${entityName}/${item}`));
    setChange(!change)
  }

  const Read = async (item) => {
    setEditData(null)
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `roadmap/frontend/${entityName}/${item}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setEditData(snapshot.val())
      } else {
        setEditData(null)
      }
    }).catch((error) => {
      console.error(error);
    });
  }


  const Update = async (values, entityName, editID) => {
    const items = Object.keys(config.entities[entityName].fields);
    var result = values.reduce(function (result, field, index) {
      result[items[index]] = field;
      return result;
    }, {})
    await set(ref(database, `roadmap/frontend/${entityName}/${editID}`), result)
    setChange(!change)
  }


  return <CrudContext.Provider value={{
    Create,
    Delete,
    Read,
    editData,
    Update,
    change,
    dataState
  }}>
    {children}
  </CrudContext.Provider>

}

export default CrudProvider;
export const useCrud = () => useContext(CrudContext);