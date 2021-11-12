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

		console.log({from})
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const email = formData.get("email");
		const password = formData.get("password");


		try {
			await auth.SignIn(
				email,
				password
			, () => {
				navigate(from, { replace: true });
			})
		} catch (e) {
			setError(e.message)
			
		}
	};

	return (
		<div>
			<p>You must log in to view the page at {from}</p>

			<form onSubmit={handleSubmit}>
				<label>
					Email: <input name="email" type="email" />
				</label>{" "}
				<label>
					Password: <input name="password" type="password" />
				</label>{" "}
				<button type="submit">Login</button>
			</form>
		</div>
	);
}

export default Login;
