import config from "../../util/config";
const EntittyForm = ({entityName}) => {

    const fields = Object.keys(config.entities[entityName].fields).map(field => {

        const {type, reference} = config.entities[entityName].fields[field];

        switch (type)
        {
            case "text":
                return <label key={field}>{field}:
                <input name={field} type="text" />
                </label>
            case "number":
                return <label key={field}>{field}:
                <input name={field} type="number" />
                </label>
            case "ref":
                return <p key={field}>field {field} is referencing to {reference}</p>;

            default:
                
        }
    });


    const handleSubmit = (event) => {
		event.preventDefault()

		const form = new FormData(event.target)
		const values = Object.keys(config.entities[entityName].fields).map(field => {
			return form.get(field)
		})

		console.log({values})
	}
    
    return(
        <>
        <form onSubmit={handleSubmit}>
		{fields}
		<button type="submit">Submit</button>
	</form>;
        </>
    )
}

export default EntittyForm;
