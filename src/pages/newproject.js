function NewProject() {
	return (
		<>
			<form>
				<div>
					<h4>New Project</h4>
					<button type="submit">+</button>
					<label>Type:</label>
					<input name="Type" type="text" />
					<label>Title:</label>
					<input name="Title" type="text" />
					<label>Deadline:</label>
					<input name="Deadline" type="text" />
				</div>
			</form>
		</>
	)
}

export default NewProject;
