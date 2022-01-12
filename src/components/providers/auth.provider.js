import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence, sendPasswordResetEmail } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../util/firebase";
import { WrongCredentialsException } from '../../exceptions/auth'

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setUser(user);
		});
		return () => unsubscribe();
	});

	const SignIn = async (email, password, callback) => {
		try {
			await setPersistence(auth, browserSessionPersistence);
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
	}

	return <AuthContext.Provider value={{
		User: user,
		SignIn,
		SignUp,
		LogOut,
		ForgotPassword
	}}>
		{children}
	</AuthContext.Provider>;
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);