import { useNavigate } from "react-router";
import { useAuth } from "../components/providers/auth.provider";
import { useState } from "react";
import AuthLayout from "../components/layouts/auth-layout";

function Login() {
	const navigate = useNavigate();
	const auth = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	const handleSubmit = async (event) => {
		setLoading(true)
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
		setLoading(false)
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
						{loading ?
							<svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" className="mr-3" stroke="#fff">
								<g transform="translate(1 1)" strokeWidth="2">
									<circle opacity=".5" cx="18" cy="18" r="18" />
									<path d="M36 18c0-9.94-8.06-18-18-18">
										<animateTransform
											attributeName="transform"
											type="rotate"
											from="0 18 18"
											to="360 18 18"
											dur="1s"
											repeatCount="indefinite" />
									</path>
								</g>
							</svg>
							: <>Login</>
						}
					</button>



					<a href='/forgot-password' className="py-2">Forgot Password</a>
					<a href='/signup'>Dont have an account yet?</a>
					{error && <div className="flex items-center text-red-500 text-sm font-bold px-4 py-3" role="alert">
						<p>{error}</p>
					</div>}
				</div>
			</form>
		</AuthLayout>
	);
}

export default Login;
