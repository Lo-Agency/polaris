import { title } from 'case';

const TextInput = ({ field, editData }) => {
    return (
        <div key={field} className="w-6/12 flex items-center flex-col justify-center px-8 ">
            <label className="mx-2 self-start">{title(field)}:
            </label>
            <input className=" py-2 my-3 w-full rounded-none border-solid border-gray-300 border" name={field} type="text" defaultValue={editData && editData[field]} required />
        </div>
    )
}

export default TextInput;