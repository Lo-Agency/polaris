import { useAuth } from "../components/providers/auth.provider";
import { useState } from "react";
import AuthLayout from "../components/layouts/auth-layout"

function ForgotPassword() {
	const auth = useAuth();
	const [error, setAllert] = useState();

	const sendResetPassEmail = async (event) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const email = formData.get("email");

		try {
			await auth.forgotPassword(email)
			setAllert("Link send to your email check it")
		} catch (e) {
			setAllert(e.message)
		}

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
						Reset password
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
