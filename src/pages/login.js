import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../components/providers/auth.provider";
import { useState } from "react";


function Login() {
	const navigate = useNavigate();
	const location = useLocation();
	const auth = useAuth();
	const [error, setError] = useState(null);
	const from = location.state?.from?.pathname || "/";
	const handleSubmit = async (event) => {

		console.log({ from })
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const email = formData.get("email");
		const password = formData.get("password");


		try {
			await auth.SignIn(
				email,
				password
				, () => {
					if (from == "/")
					navigate("/admin")
					else
					navigate(from, { replace: true });
				})
		} catch (e) {
			setError(e.message)

		}
	};



	return (
		<div className="center-content">
			<div className="bg-gray-50 p-10 flex flex-col justify-center items-center border-blue-40 rounded-lg border-4 xsm:text-sm">
				<p>You must log in to view the page at {from}</p>

				<form onSubmit={handleSubmit}>
					<div className="flex flex-col p-3 justify-center items-center">
						<div className="m-2 sm:m-1 xsm:m-1 flex flex-col">
							<label className="py-2">
								Email:
							</label>
							<input className="py-2 px-3 rounded-lg xsm:w-48 sm:w-60 w-80" name="email" type="email" />
						</div>
						<div className="m-2 sm:m-1 xsm:m-1 flex flex-col">
							<label className="py-2">
								Password:
							</label>
							<input className="py-2 px-3 rounded-lg xsm:w-48 sm:w-60 w-80" name="password" type="password" />
						</div>
						<button className="focus:scale-50 bg-lightblue animate-bounce py-2 mt-6 sm:mt-4 xsm:mt-2 rounded-lg text-white bg-blue-400 xsm:w-48 sm:w-60 w-80" type="submit">Login</button>
					</div>
					
				</form>
			</div>
		</div>
	);
}

export default Login;
