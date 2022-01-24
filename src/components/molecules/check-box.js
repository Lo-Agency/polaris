import { title } from "case"
import { useState } from "react";

const CheckBox=({name, formValues})=>{
  
    const [checked, setChecked]=useState(true)

    return(
        <div key={name} className="w-6/12 flex items-start justify-center px-8 ">
        <label className="mx-2 self-start">{name}:
        </label>
        <input className="h-4 w-4 border border-gray-300 rounded-sm checked:bg-blue-600 checked:border-blue-600 cursor-pointer"
         type="checkbox"
         checked={checked}
         name={name}
         onChange={()=>{setChecked(!checked)}}
         value={checked}
          />
    </div>
    )
}

export default CheckBox;