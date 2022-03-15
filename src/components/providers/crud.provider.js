import { push, ref, child, getDatabase, get, remove, set, onValue } from '@firebase/database';
import { useState, createContext, useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from '../../util/config';
import { database } from '../../util/firebase';

const CrudContext = createContext(null);
const CrudProvider = ({ children }) => {
	const [change, setChange] = useState(false);
	const [formValues, setFormValues] = useState(null);
	const { workspaceId, entityName } = useParams();
	const [userWorkspace, setUserWorkspace] = useState(null);

	//send notifications
	const sendNotification = (type, message) => {
		if (type === 'success')
			return toast.success(message, {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		return toast.error(message, {
			position: 'top-center',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
		});
	};

	//get all data from db
	useEffect(() => {
		findOneWorkspace(workspaceId);
	}, [change]);

	// get one workspace
	const findOneWorkspace = async (id) => {
		setUserWorkspace(null);
		const dbRef = ref(getDatabase());
		await get(child(dbRef, `${id}`))
			.then((snapshot) => {
				setUserWorkspace(snapshot.val());
			})
			.catch((error) => {
				console.error(error);
			});
	};

	//get all data from db
	const findAllItems = async () => {
		const allPromises = Object.keys(config.entities).map((entity) => {
			return new Promise((resolve) => {
				const db = getDatabase();
				return onValue(
					ref(db, `${entity}`),
					(snapshot) => {
						resolve({ [entity]: snapshot.val() });
					},
					{
						onlyOnce: true,
					},
				);
			});
		});
		return Promise.all(allPromises);
	};

	//create new data
	const insertNewItem = async (values, entity) => {
		try {
			await push(ref(database, `${workspaceId}/${entity}`), values);
			sendNotification('success', `New ${entity} is successfully created.`);
			setChange(!change);
		} catch (error) {
			sendNotification('error', 'Somthing went wrong, please try again.');
		}
	};

	//delete data
	const deleteItem = async (id) => {
		const entitiesWithList = Object.keys(config.entities).filter((item) => config.entities[item]['list'] != undefined);
		const deleteEntity = entitiesWithList.filter((entity) => config.entities[entity]['list'].includes(entityName));
		if (deleteEntity.length != 0) {
			deleteEntity.forEach((entity) => deleteDependency(entity, id));
		}
		try {
			const response = await remove(ref(database, `${workspaceId}/${entityName}/${id}`));
			sendNotification('success', 'successfully deleted.');
			setChange(!change);
			return response;
		} catch (error) {
			sendNotification('error', 'Somthing went wrong, please try again.');
		}
	};

	//delete data from others entities
	const deleteDependency = async (deleteEntity, id) => {
		let data = Object.entries(userWorkspace).filter((elem) => elem[0] === deleteEntity);
		data = data && Object.entries(data[0][1]);
		data = data.map((record) => ({ [record[0]]: record[1] }));
		const updateData = data.filter((record) => Object.values(record)[0][entityName].includes(id));

		if (updateData.length > 0) {
			updateData.forEach(async (item, index) => {
				const newEntityInput = Object.values(item)[0][entityName].filter((entityId) => entityId != id);
				const updateId = updateData.map((updateItemData) => Object.keys(updateItemData));
				await set(ref(database, `${workspaceId}/${deleteEntity}/${updateId[index][0]}/${entityName}`), newEntityInput);
				setChange(!change);
			});
		}
	};

	//get data for edit form
	const findOneItem = async (item) => {
		setFormValues(null);
		const dbRef = ref(getDatabase());
		await get(child(dbRef, `${workspaceId}/${entityName}/${item}`))
			.then((snapshot) => {
				if (snapshot.exists()) {
					setFormValues(snapshot.val());
				} else {
					setFormValues(null);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};

	//update
	const updateItem = async (values, entity, editID) => {
		try {
			await set(ref(database, `${workspaceId}/${entity}/${editID}`), values);
			sendNotification('success', 'successfully updated.');
			setChange(!change);
		} catch (error) {
			sendNotification('error', 'Somthing went wrong, please try again.');
		}
	};

	return (
		<CrudContext.Provider
			value={{
				findAllItems,
				insertNewItem,
				deleteItem,
				findOneItem,
				formValues,
				updateItem,
				change,
				userWorkspace,
			}}>
			{children}
		</CrudContext.Provider>
	);
};

export default CrudProvider;
export const useCrud = () => useContext(CrudContext);
