import { useNavigate } from "react-router";
import config from "../../util/config";
import { useCrud } from "../providers/crud.provider";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { title } from 'case';


const EntittyForm = ({ entityName, actionName, editID, editData }) => {
    const navigate = useNavigate();
    const animatedComponents = makeAnimated();
    const crud = useCrud();

    const fields = Object.keys(config.entities[entityName].fields).map(field => {
        const { type, reference } = config.entities[entityName].fields[field];


        switch (type) {
            case "text":
                return <div key={field} className="w-6/12 flex items-center flex-col justify-center px-8 ">
                    <label className="mx-2 self-start">{title(field)}:
                    </label>
                    <input className=" py-2 my-3 w-full rounded-none border-solid border-gray-300 border" name={field} type="text" defaultValue={editData && editData[field]} required/>
                </div>
            case "number":
                return <div key={field} className=" w-6/12 flex flex-col items-center justify-center px-8">
                    <label className="mx-2 self-start">{title(field)}:
                    </label>
                    <input className=" py-2 my-3  w-full rounded-none border-solid border-gray-300 border" name={field} type="number" defaultValue={editData && editData[field]} required/>
                </div>
            case "select":
                let selectOptions = []
                let selectvalue = config.entities[entityName].fields[field].value
                for (let i = 0; i < selectvalue.length; i++) {
                    selectOptions.push({ "value": selectvalue[i], "label": [selectvalue[i]] })
                }
                return <div key={field} className=" w-6/12 flex items-center flex-col justify-center px-8">
                    <label className="mx-2 self-start">{title(field)}:
                    </label> <Select className="basic-multi-select my-3 rounded-lg w-full "
                        classNamePrefix="select"
                        hasValue
                        closeMenuOnSelect={false}
                        theme={(theme) => ({
                            ...theme,
                            borderRadius: 0,
                            colors: {
                              ...theme.colors,
                              primary25: 'neutral10',
                              primary: 'black',
                              primary50:'neutral20'
                            },
                          })}
                        components={animatedComponents} name={field} options={selectOptions}>
                    </Select>
                </div>
            case "date":
                return <div key={field} className=" w-6/12 flex item-center flex-col justify-center px-8 ">
                    <label className="mx-2 self-start">{title(field)}:
                    </label>
                    <input className="py-2 my-3 w-full bg-white mt-2 border-solid border-gray-300 border" name={field} type="date" defaultValue={editData && editData[field]} required/>
                </div>
            case "ref":
                let value = [];
                let label = [];
                let options = [];
                let setDefault=[];
                let selectvalues=[];
                let tempLabel = Object.values((Object.values(crud.dataState)).filter(item => (Object.keys(item)) == field)[0][field])
                tempLabel.map((item) => label.push(item.title))
                Object.keys((Object.values(crud.dataState)).filter(item => (Object.keys(item)) == field)[0][field]).map(item => value.push(item))
              
                
              


                for (let i = 0; i < value.length; i++) {
                    options.push({ "value": value[i], "label": label[i] })
                }
                return <div key={field} className=" w-6/12 flex flex-col justify-center px-8">
                    <label className="mx-2 self-start">{title(field)}:
                    </label>
                <Select className="basic-multi-select my-3 rounded-lg w-full "
                    classNamePrefix="select"
                    isMulti
                    hasValue
                    defaultValue={selectvalues}
                    closeMenuOnSelect={false}
                    theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                          ...theme.colors,
                          primary25: 'neutral10',
                          primary: 'black',
                          primary50:'neutral20'
                        },
                      })}
                    components={animatedComponents} name={reference} options={options} >
                </Select>
                </div>
            default:
                return <p key={field}>field type for &quot;{field}&quot; not recognized</p>;
        }
    });

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = new FormData(event.target)
        const values = Object.keys(config.entities[entityName].fields).map(field => {
            if((form.getAll(field))==[''] || (form.getAll(field))[0].length==0 ) {
                alert(`Please fill out ${field}` )
                event.preventDefault()
                return null
            }else{
                console.log(form.getAll(field))
                return form.getAll(field)
               
            }
           
        })


      
        if (!values.includes(null)){
            if (actionName === "create"){
            crud.Create(values, entityName);
            }else crud.Update(values, entityName, editID);
            navigate(`/admin/${entityName}/list`, { replace: true })
           
        }else return
           

       
    
    }
        
       
    return (
        <div className="min-h-screen min-w-full flex justify-center items-center">
            <form className="flex flex-col min-w-full  h-auto justify-center items-center  mx-20 my-32 rounded-lg" onSubmit={handleSubmit}>
                {fields}
                <button className="w-2/12 rounded-lg mt-10 transition-colors border-2 border-gray-400 text-white bg-black py-2 hover:text-gray-500" type="submit">{title(actionName)}</button>
            </form>
        </div>
    )
}

export default EntittyForm;
