function NewPhase() {

	return (
		<>
			<h1>NewPhase</h1>
			<form>
				<div>
					<h4>New learning</h4>
					<button type="submit">+</button>
					<label>Topic:</label>
					<input name="Topic" type="text" />
					<label>Category:</label>
					<input name="Category" type="text" />
					<label>Resources:</label>
					<input name="Resources" type="text" />

				</div>
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
				<button type="submit" className="bg-green-500 p-2">Save</button>
			</form>
		</>
	)
}

export default NewPhase;
