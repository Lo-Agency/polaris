import { useAuth } from '../components/providers/auth.provider';
import { useState } from 'react';
import AuthLayout from '../components/layouts/auth-layout';
import { Link } from 'react-router-dom';
import Button from '../components/atoms/button';

function ForgotPassword() {
	const auth = useAuth();
	const [alert, setAlert] = useState(null);

	const sendResetPassEmail = async (event) => {
		setAlert(null);
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const email = formData.get('email');

		try {
			await auth.forgotPassword(email);
			setAlert({
				message: 'Link send to your email check it',
				style: 'flex items-center text-green-500 text-sm font-bold px-4 py-3',
			});
		} catch (e) {
			setAlert({ message: e.message, style: 'flex items-center text-red-500 text-sm font-bold px-4 py-3' });
		}
	};

	return (
		<AuthLayout>
			<form onSubmit={sendResetPassEmail}>
				<h1 className="text-xl mb-2">Forgot your password?</h1>
				<div className="flex flex-col justify-center items-center">
					<div className="m-2 sm:m-1 xsm:m-1 flex flex-col">
						<label className="py-2">Your email:</label>
						<input className="py-2 px-3 xsm:w-48 sm:w-60 w-80 border-2 border-black" name="email" type="email" />
					</div>

					<Button
						className={'btn-form w-2/12 flex justify-center items-center'}
						loading={auth.isLoading}
						actionName={'Reset password'}
					/>

					<Link to="/login" className="py-2">
						Login
					</Link>

					{alert && (
						<div className={alert.style}>
							<p>{alert.message}</p>
						</div>
					)}
				</div>
			</form>
		</AuthLayout>
	);
}

export default ForgotPassword;
