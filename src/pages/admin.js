import { useNavigate, useLocation} from "react-router";
import { useAuth } from "../components/providers/auth.provider";
import { useState } from "react";
import { Link } from "react-router-dom";


function Admin() {

	const navigate = useNavigate();
	const location = useLocation();
	const auth = useAuth();
	const [Modal, setModal] = useState("");
	const [Error, setError] = useState("");

	setTimeout(() => {
		setModal("")
	}, 3000)

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

	// const Addlearning = () => {
	// 	navigate("/addlearning", { replace: true });
	// }

	return (
		<>
			<header className="flex justify-end items-center px-5 py-5 bg-gray-100">
				<button className=" focus:scale-50 hover:bg-blue-600 py-2 rounded-lg text-white bg-blue-400 xsm:w-32 sm:w-32 w-32" onClick={SignOutButton}>Sign out </button>
			</header>
			<div className="flex justify-end items-center flex-col mt-4 mb-4">
				<div className="bg-gray-50 h-96 w-11/12 border-4 py-2">
					<div className="flex justify-end">
					<Link to="./newlearning"><button className="bg-gray-500 p-2 m-4 rounded-lg text-white">Add new learning</button></Link>
					<Link to="./newphase"><button className="bg-gray-500 p-2 m-4 rounded-lg text-white">Add new phase</button></Link>
					<Link to="./newproject"><button className="bg-gray-500 p-2 m-4 rounded-lg text-white">Add new project</button></Link>
					</div>
				</div>
			</div>
			<button className="py-2 rounded-lg text-white bg-blue-400 px-2 mx-8 my-4">Add Admin</button>
				<div>
					<form onSubmit={handleSubmit}>
						<label>
							Email: <input name="email" type="email" />
						</label>
						<label>
							Password: <input name="password" type="password" />
						</label>
						<button type="submit">Add Admin User</button>
					</form>
				</div>
				<p>{Modal}</p>
		</>
	)
}

export default Admin;
