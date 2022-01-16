import {
	signOut,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	getAuth
} from 'firebase/auth';
import React, { createContext, useContext } from 'react';
import { WrongCredentialsException } from '../../exceptions/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const auth = getAuth();
	const [user, loading, error] = useAuthState(auth);

	const SignIn = async (email, password, callback) => {
		try {
			// await setPersistence(auth, browserLocalPersistence);
			await signInWithEmailAndPassword(auth, email, password);
			callback();
		} catch (error) {
			switch (error.code) {
				case 'auth/user-not-found':
					throw new WrongCredentialsException('User not found.');
				case 'auth/wrong-password':
					throw new WrongCredentialsException('Password is incorrect.');
				default:
					throw new WrongCredentialsException('Something went Wrong contact admin!');
			}
		}
	};

	const SignUp = async (email, password) => {
		await createUserWithEmailAndPassword(auth, email, password);
	};

	const LogOut = async (callback) => {
		await signOut(auth);
		setUser(null);
		callback();
	};

	const ForgotPassword = async (email) => {
		try {
			await sendPasswordResetEmail(auth, email);
		} catch (error) {
			throw new WrongCredentialsException('We cant find a user with that e-mail address.');
		}
	};

	return (
		<AuthContext.Provider
			value={{
				User: user,
				SignIn,
				SignUp,
				LogOut,
				ForgotPassword
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
