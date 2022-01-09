import { title } from 'case';

const DateInput = ({ name, formValues }) => {
    return (
        <div key={name} className=" w-6/12 flex item-center flex-col justify-center px-8 ">
            <label className="mx-2 self-start">{title(name)}:
            </label>
            <input className="py-2 my-3 w-full bg-white mt-2 border-solid border-gray-300 border" name={name} type="date" defaultValue={formValues && formValues[name]} required />
        </div>
    )
}

export default DateInput;