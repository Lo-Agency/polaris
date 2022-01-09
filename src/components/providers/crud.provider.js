import { push, ref, child, getDatabase, get, remove, set } from "@firebase/database";
import { useState, createContext, useContext, useEffect } from "react";
import { useParams } from "react-router";
import config from "../../util/config";
import { extractDataFromEntity } from "../../util/extract-data";
import { database } from "../../util/firebase";

const CrudContext = createContext(null);
const CrudProvider = ({ children }) => {
  const [change, setChange] = useState(false)
  const [formValues, setFormValues] = useState(null)
  const { entityName } = useParams();
  const [dataState, setDataState] = useState();

  //get all data from db
  useEffect(() => {
    getAllData().then((data) => {
      setDataState(data)
    })
  }, [change])

  //get all data from db
  const getAllData = async () => {
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

  //create new data
  const Create = async (values, entity) => {
    const items = Object.keys(config.entities[entity].fields);
    let result = values.reduce(function (result, field, index) {
      result[items[index]] = field;
      return result;
    }, {})
    await push(ref(database, `roadmap/frontend/${entity}`), result);
    setChange(!change)
  };

  //delete data
  const Delete = async (id) => {
    const entitiesWithList = Object.keys(config.entities).filter(item => config.entities[item]['list'] != undefined);
    const deleteEntity = entitiesWithList.filter(entity => (config.entities[entity]['list']).includes(entityName));

    // await remove(ref(database, `roadmap/frontend/${entityName}/${id}`));

    //delet it from others entities
    if (deleteEntity.length != 0) {
      let entityData = extractDataFromEntity(deleteEntity[0]);
      const a = entityData && Object.entries((Object.values(entityData[0]))[0]);
      const deleteArr = a.map(record => ({ [record[0]]: record[1] }));
      const updateData = deleteArr.filter(record => Object.values(record)[0][entityName].includes(id));

      if (updateData.length > 0) {
        for (let i = 0; i < updateData.length; i++) {
          const newEntityInput = Object.values(updateData[i])[0][entityName].filter(entityId => entityId != id);
          const updateId = updateData.map(data => Object.keys(data))
          // await set(ref(database, `roadmap/frontend/${deleteEntity}/${updateId[i][0]}/${entityName}`), newEntityInput);
        }
      }
    }

    setChange(!change)
  }


  //get data for edit form
  const Read = async (item) => {
    setFormValues(null)
    const dbRef = ref(getDatabase());
    await get(child(dbRef, `roadmap/frontend/${entityName}/${item}`)).then((snapshot) => {
      if (snapshot.exists()) {
        setFormValues(snapshot.val())
      } else {
        setFormValues(null)
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  //update
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
    formValues,
    Update,
    change,
    dataState
  }}>
    {children}
  </CrudContext.Provider>

}

export default CrudProvider;
export const useCrud = () => useContext(CrudContext);