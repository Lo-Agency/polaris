import { format } from 'date-fns';
function Home() {

        //let phases = dataState && dataState.filter(entity => Object.keys(entity) == "phase")
	return <h1 className="bg-blue p-2">Today is {format(new Date(),"EEEE d MMMM yyyy")}</h1>;
}

export default Home;
 //list all the items for the firebase
        // case "list":

        //     if (entityName == "roadmap") {
        //         return <div>
        //             {crud.roadmap && (Object.values(crud.roadmap)).map((roadmap, index) => {
        //                 { starting = null }
        //                 return <div key={index}>
        //                     <table className="border-2 border-gray-400 bg-white p-2 mb-10">
        //                         <thead>
        //                             <tr>
        //                                 <th className="p-2 bg-green w-full " colSpan="5"><div className="flex w-full justify-between">
        //                                     <span>Starting Date  {(Object.values(roadmap))[1]} </span>
        //                                     <span>{(Object.values(roadmap))[2]} </span>
        //                                     <span className=" flex"><svg onClick={() => handleDelete(arr[index])} className="w-6 h-6 mr-2 cursor-pointer" fill="none" stroke="Gray" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        //                                         <Link to={`/admin/${entityName}/edit`}>
        //                                             <svg onClick={() => handleEdit(arr[index])} className="w-6 h-6 cursor-pointer" stroke="Gray" fill="gray" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" /></svg>
        //                                         </Link>
        //                                     </span>
        //                                     </div>
        //                                 </th>
        //                             </tr>
        //                         </thead>
        //                         <tbody>
        //                             <tr>
        //                                 {(Object.keys(config.entities[entityName].readfields))
        //                                     .map(item => { return <td className=" bg-blue p-4 border-2 border-gray-400 text-center" key={item}>{title(item)}</td> })}
        //                             </tr>
        //                             {crud.roadmap && (((Object.values(roadmap))[0]))
        //                                 .map(item => { return phaseConvertor(item, roadmap) })}

        //                         </tbody>
        //                     </table>
        //                 </div>
        //             })}
        //             <div className="flex w-2/3 p-4 ">
        //                 <Link className="px-2 py-2 m-2 rounded-lg bg-lightblue" to={`/admin/${entityName}/create`}>Create New {title(entityName)}</Link>
        //             </div>
        //         </div>
        //     }