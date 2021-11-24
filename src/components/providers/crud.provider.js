  import { push, ref, child, getDatabase, get, remove, set } from "@firebase/database";
  import { useState, createContext, useContext, useEffect } from "react";
  import { useParams } from "react-router";
  import config from "../../util/config";
  import { database } from "../../util/firebase";
  

  const CrudContext = createContext(null);

  const CrudProvider = ({ children }) => {
    const [tableData, settableData] = useState(null)
    const [change, setChange] = useState(false)
    const [editData, setEditData] = useState(null)
    const { entityName } = useParams();
    const [learning, setLearning] = useState(null);
    const [project, setProject] = useState(null);
    let learningTitle=[];
    let projectTitle=[];



    useEffect(() => {
      const dbRef = ref(getDatabase());
      get(child(dbRef, `roadmap/frontend/${entityName}`)).then((snapshot) => {
        if (snapshot.exists()) {
          let tableData = snapshot.val();
          settableData(tableData);
        } else {
          console.log(tableData);
          settableData(null)
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
       } else {
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
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const ReadRef = async (entity) => {
      const dbRef = ref(getDatabase());
      if (entity === "learning") {
         get(child(dbRef, `roadmap/frontend/${entity}`)).then((snapshot) => {
          if (snapshot.exists(snapshot.val())) {
            setLearning(snapshot.val())
            return snapshot.val()
          }
          else {
            return null
          }
        }).catch((error) => {
          console.error(error);
        });
      }
      else if (entity === "project") {
         get(child(dbRef, `roadmap/frontend/${entity}`)).then((snapshot) => {
          if (snapshot.exists(snapshot.val())) {
            setProject(snapshot.val())
            return snapshot.val()
          }
          else {
            return null
          }
        }).catch((error) => {
          console.error(error);
        });
      }
  
    }

    const readById = (entity, id) =>{
      const dbRef = ref(getDatabase());
      if (entity === "learning") {
       get(child(dbRef, `roadmap/frontend/learning/${id}`)).then((snapshot) => {
        if (snapshot.exists()) {
          learningTitle.push(snapshot.val())
          return
          // console.log(learningTitle,"crudtitle")
        }else{
          console.log('peyda nakardam')
        }
      }).catch((error) => {
        console.error(error);
       
      });
    }
    else if (entity === "project") {
      get(child(dbRef, `roadmap/frontend/project/${id}`)).then((snapshot) => {
        if (snapshot.exists()) {
          projectTitle.push(snapshot.val())
          // console.log(projectTitle,"crudtitle")
          return
        }else{
          console.log('peyda nakardam')
        }
      }).catch((error) => {
        console.error(error);
       
      });
    }

    }
  




    return <CrudContext.Provider value={{
      Create,
      tableData,
      Delete,
      Read,
      editData,
      Update,
      learning,
      project,
      ReadRef,
      readById,
      learningTitle,
      projectTitle

    }}>
      {children}
    </CrudContext.Provider>

  }

  export default CrudProvider;
  export const useCrud = () => useContext(CrudContext);