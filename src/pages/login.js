import { useNavigate } from "react-router";
import { useAuth } from "../components/providers/auth.provider";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/layouts/auth-layout";

function Login() {
	const navigate = useNavigate();
	const auth = useAuth();
	const [error, setError] = useState(null);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const email = formData.get("email");
		const password = formData.get("password");

		try {
			await auth.signIn(email, password)
			navigate('/')
		} catch (e) {
			setError(e.message)
		}
	};

	return (
		<AuthLayout>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col p-3 justify-center items-center ">
					<div className="m-2 sm:m-1 xsm:m-1 flex flex-col">
						<label className="py-2">
							Email:
						</label>
						<input className="py-2 px-3 xsm:w-48 sm:w-60 w-80 border-2 border-black" name="email" type="email" />
					</div>
					<div className="m-2 sm:m-1 xsm:m-1 flex flex-col">
						<label className="py-2">
							Password:
						</label>
						<input className="py-2 px-3 xsm:w-48 sm:w-60 w-80 border-2 border-black" name="password" type="password" />
					</div>

					<button className="btn-form w-2/12 flex justify-center items-center" type="submit">
						Login
					</button>

					<Link to='/forgot-password' className="py-2">Forgot Password</Link>
					<Link to='/signup'>Dont have an account yet?</Link>
					{error && <div className="flex items-center text-red-500 text-sm font-bold px-4 py-3" role="alert">
						<p>{error}</p>
					</div>}
				</div>
			</form>
		</AuthLayout>
	);
}

export default Login;
