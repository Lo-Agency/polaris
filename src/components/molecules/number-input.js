import { title } from 'case';

const NumberInput = ({ name, formValues }) => {
    return (
        <div key={name} className=" w-6/12 flex flex-col items-center justify-center px-8">
            <label className="mx-2 self-start">{title(name)}:
            </label>
            <input className=" py-2 my-3  w-full rounded-none border-solid border-gray-300 border" name={name} type="number" defaultValue={formValues && formValues[name]} required />
        </div>
    )
}

export default NumberInput;