import { title } from 'case';

const Button =({loading, actionName})=>{
    return(
        <button className="w-2/12 rounded-lg mt-10 transition-colors border-2 border-gray-400 text-white bg-black py-2 hover:text-gray-500" type="submit">{title(actionName)}</button>
    )
}
export default Button