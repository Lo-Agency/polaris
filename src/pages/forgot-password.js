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
			<h1 className="text-xl mb-2">Forgot your password?</h1>
			<p className="w-4/6">
				Dont fret! Just type in your email and we
				will send you a code to reset your password!
			</p>

			<form onSubmit={sendResetPassEmail}>
				<div className="flex flex-col p-3 justify-center items-center" >
					<div className="m-2 sm:m-1 xsm:m-1 flex flex-col">
						<label className="py-2">
							Your email
						</label>
						<input className="py-2 px-3 rounded-lg xsm:w-48 sm:w-60 w-80 border-2 border-black" name="email" type="email" />
					</div>

					<button className="focus:scale-50 bg-lightblue animate-bounce py-2 mt-6 sm:mt-4 xsm:mt-2 rounded-lg text-white bg-black xsm:w-48 sm:w-60 w-80" type="submit">
						Reset password
					</button>

					{error && <div className="flex items-center text-blue-500 text-sm font-bold px-4 py-3" role="alert">
						<p>{error}</p>
					</div>}

				</div>
			</form>

		</AuthLayout>
	);
}

export default ForgotPassword;
