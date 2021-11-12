import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../components/providers/auth.provider";
import { useState } from "react";


function Admin() {

	const navigate = useNavigate();
	const location = useLocation();
	const auth = useAuth();
	const [Modal, setModal] = useState("");
	const [Error, setError] = useState("");

	const from = location.state?.from?.pathname || "/";

	const handleSubmit = async (event) => {

		console.log({ from })
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const email = formData.get("email");
		const password = formData.get("password");
		setModal("New Admin User Added");
		console.log("new user added")

		try {
			await auth.SignUp(
				email,
				password
			)
		} catch (e) {
			setError(e.message)
			console.log(e.message)
		}
	};

	const SignOutButton = async (event) => {

		//event.preventDefault();
		try {
			await auth.LogOut(() => {
				navigate("/", { replace: true });
				console.log("signed out")
			})
		} catch (e) {
			setError(e.message)
			console.log(e.message)

		}

	};



	return (
		<>
		<div className="center-content">
			<button onClick={SignOutButton}>Sign out </button>
			<p>table of contents</p>
			<form onSubmit={handleSubmit}>
				<label>
					Email: <input name="email" type="email" />
				</label>{" "}
				<label>
					Password: <input name="password" type="password" />
				</label>{" "}
				<button type="submit">Add Admin User</button>
			</form>

			<p>{Modal}</p>
			</div>
		</>
	)
}

export default Admin;
