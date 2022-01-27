import { useAuth } from "../components/providers/auth.provider";
import { useState } from "react";
import AuthLayout from "../components/layouts/auth-layout"

function ForgotPassword() {
	const auth = useAuth();
	const [loading, setLoading] = useState(false);
	const [error, setAllert] = useState();

	const sendResetPassEmail = async (event) => {
		setLoading(true)
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const email = formData.get("email");

		try {
			await auth.forgotPassword(email)
			setAllert("Link send to your email check it")
		} catch (e) {
			setAllert(e.message)
		}
		setLoading(false)
	};

	return (
		<AuthLayout>
			<form onSubmit={sendResetPassEmail}>
				<h1 className="text-xl mb-2">Forgot your password?</h1>
				<div className="flex flex-col justify-center items-center" >
					<div className="m-2 sm:m-1 xsm:m-1 flex flex-col">
						<label className="py-2">
							Your email:
						</label>
						<input className="py-2 px-3 xsm:w-48 sm:w-60 w-80 border-2 border-black" name="email" type="email" />
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
							: <>Reset password</>
						}
					</button>


					<a href='/login' className="py-2">Login</a>
					{error && <div className="flex items-center text-blue-500 text-sm font-bold px-4 py-3" role="alert">
						<p>{error}</p>
					</div>}
				</div>
			</form>

		</AuthLayout>
	);
}

export default ForgotPassword;
