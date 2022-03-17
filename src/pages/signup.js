import { useAuth } from '../components/providers/auth.provider';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/layouts/auth-layout';
import Button from '../components/atoms/button';

function SignUp() {
	const [error, setError] = useState(null);
	const [showPassword, setShowPassword] = useState(false);

	const auth = useAuth();

	const handleSubmit = async (event) => {
		setError(null);
		event.preventDefault();
		const formData = new FormData(event.currentTarget);

		const firstname = formData.get('firstname');
		const lastname = formData.get('lastname');
		const email = formData.get('email');
		const workspacename = formData.get('workspacename');
		const password = formData.get('password');

		try {
			await auth.signup(firstname, lastname, email, workspacename, password);
		} catch (e) {
			setError(e.message);
		}
	};

	const getTypeOfPassword = () => {
		return showPassword ? 'text' : 'password';
	};

	return (
		<AuthLayout>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col justify-center text-sm items-center ">
					<div className="m-2 sm:m-1 xsm:m-1 flex flex-col">
						<label className="py-2">Firstname:</label>
						<input
							className="py-2 px-3 outline-none xsm:w-48 sm:w-60 w-72 border-2 border-black"
							name="firstname"
							type="text"
						/>
					</div>

					<div className="m-2 sm:m-1 xsm:m-1 flex flex-col">
						<label className="py-2">Lastname:</label>
						<input
							className="py-2 px-3 outline-none xsm:w-48 sm:w-60 w-72 border-2 border-black"
							name="lastname"
							type="text"
						/>
					</div>

					<div className="m-2 sm:m-1 xsm:m-1 flex flex-col">
						<label className="py-2">Email:</label>
						<input
							className="py-2 px-3 outline-none xsm:w-48 sm:w-60 w-72 border-2 border-black"
							name="email"
							type="email"
						/>
					</div>

					<div className="m-2 sm:m-1 xsm:m-1 flex flex-col">
						<label className="py-2">Enter name of your workspace:</label>
						<input
							className="py-2 px-3 outline-none xsm:w-48 sm:w-60 w-72 border-2 border-black"
							name="workspacename"
							type="text"
						/>
					</div>

					<div className="m-2 sm:m-1 xsm:m-1 flex flex-col">
						<label className="py-2">Password:</label>
						<div className="border-2 border-black w-72 relative">
							<input
								type={getTypeOfPassword()}
								className="py-2 px-3 xsm:w-48 sm:w-60 outline-none w-full"
								name="password"
							/>
							<label onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2 cursor-pointer">
								{showPassword && (
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
									</svg>
								)}
								{!showPassword && (
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
									</svg>
								)}
							</label>
						</div>
					</div>

					<Button
						className={'btn-form flex justify-center items-center'}
						loading={auth.functionIsLoading}
						actionName={'Sign up'}
					/>

					<Link to="/login" className="py-2">
						Already Have an account? Login
					</Link>

					{error && (
						<div className="flex items-center text-red-500 text-sm font-bold px-4 py-3" role="alert">
							<p>{error}</p>
						</div>
					)}
				</div>
			</form>
		</AuthLayout>
	);
}

export default SignUp;
