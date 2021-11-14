import { useParams } from "react-router"
import { Link } from "react-router-dom"
import config from "../../util/config";

const Adminlayout = ({ children }) => {
    const { entityName, actionName } = useParams()

    return (
        <>
        <div>
            <ul>
                <li>{entityName} : {actionName}</li>
                

            </ul>
        </div>
        <ul>
            {
            Object.keys(config.entities)
            .map(key => <li key={key}><Link to={`/admin/${key.toLowerCase()}/list`}>{key}</Link></li>)
}
        </ul>

        <div>
            {children}
        </div>
        </>
    )
}

export default Adminlayout;