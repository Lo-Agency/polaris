import { useAuth } from '../components/providers/auth.provider';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../components/layouts/auth-layout';
import Button from '../components/atoms/button';
import LoadingPage from '../components/molecules/loading-page';

function Login() {
	const auth = useAuth();
	const [error, setError] = useState(null);
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = async (event) => {
		setError(null);
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const email = formData.get('email');
		const password = formData.get('password');

		try {
			await auth.signIn(email, password);
		} catch (e) {
			setError(e.message);
		}
	};

	const OAuthLogin = async (providerName) => {
		setError(null);
		try {
			await auth.loginWithOAuthSystem(providerName);
		} catch (e) {
			setError(e.message);
		}
	};
	const getTypeOfPassword = () => {
		return showPassword ? 'text' : 'password';
	};

	return (
		<>
			{!auth.loading ? (
				<AuthLayout>
					<form onSubmit={handleSubmit}>
						<div className="flex flex-col justify-center items-center ">
							<div className="m-2 sm:m-1 xsm:m-1 flex flex-col">
								<label className="py-2">Email:</label>
								<input className="py-2 px-3 w-80 outline-none border-2 border-black" name="email" type="email" />
							</div>
							<div className="m-2 sm:m-1 xsm:m-1 flex flex-col">
								<label className="py-2">Password:</label>
								<div className="border-2 border-black w-80 relative">
									<input type={getTypeOfPassword()} className="py-2 px-3 outline-none w-full" name="password" />
									<label
										onClick={() => setShowPassword(!showPassword)}
										className="absolute right-3 top-2 cursor-pointer">
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
								className={'btn-form w-2/12 flex justify-center items-center'}
								loading={auth.functionIsLoading}
								actionName={'Login'}
							/>
						</div>
					</form>

					<Link to="/forgot-password" className="pt-2">
						Forgot Password
					</Link>
					<Link to="/signup">Dont have an account yet?</Link>
					<div className={'w-80 text-gray-500 m-4 h-4 border-b-2 text-center p-1'}>
						<span className={'bg-white p-2'}>OR</span>
					</div>
					<button
						className={
							'py-1 w-80 mt-2 flex justify-center bg-white items-center border-2 border-gray-200 hover:border-black'
						}
						onClick={() => {
							OAuthLogin('github');
						}}>
						<svg xmlns="http://www.w3.org/2000/svg" className={'w-4 h-4 mr-3'} fill="#000" viewBox="0 0 24 24">
							<path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
						</svg>
						Login with GitHub
					</button>
					<button
						className={
							'py-1 w-80 mt-2 flex justify-center bg-white items-center border-2 border-gray-200 hover:border-black'
						}
						onClick={() => {
							OAuthLogin('google');
						}}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" className={'w-4 h-4 mr-3'} fill="#000">
							<path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
						</svg>
						Login with Google
					</button>

					{error && (
						<div className="flex items-center text-red-500 text-sm font-bold px-4 py-2" role="alert">
							<p>{error}</p>
						</div>
					)}
				</AuthLayout>
			) : (
				<LoadingPage />
			)}
		</>
	);
}

export default Login;
