  import { push, ref, child, getDatabase, get, remove, set } from "@firebase/database";
  import { useState, createContext, useContext, useEffect } from "react";
  import { useParams } from "react-router";
  import config from "../../util/config";
  import { database } from "../../util/firebase";
  

  const CrudContext = createContext(null);

  const CrudProvider = ({ children }) => {
    const [mydata, setmydata] = useState(null)
    const [change, setChange] = useState(false)
    const [editData, setEditData] = useState(null)
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
       console.log(editData, "editData");

      } else {
        console.log("peida nakardam");
        setEditData(null)
      }
    }).catch((error) => {
      console.error(error);
    });
  }


  const Update = async (values, entityName, editID) => {
    const items = Object.keys(config.entities[entityName].fields);
    let object = {};
    items.forEach((key, index) => {
      object[key] = values[index]
    });
    await set(ref(database, `roadmap/frontend/${entityName}/${editID}`), object)
    setChange(!change)
    console.log(values, "values");





  }
    
    return <CrudContext.Provider value={{
      Create,
      mydata,
      Delete,
      Read,
      editData,
      Update

    }}>
      {children}
    </CrudContext.Provider>

  }

  export default CrudProvider;
  export const useCrud = () => useContext(CrudContext);