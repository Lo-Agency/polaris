function NewLearning() {
	return (
		<>
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
			</form>
		</>
	)
}

export default NewLearning;
