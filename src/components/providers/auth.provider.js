import {
	signOut,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	getAuth,
	createUserWithEmailAndPassword
} from 'firebase/auth';
import { ref, set } from "@firebase/database";
import { database } from "../../util/firebase";
import React, { createContext, useContext } from 'react';
import { WrongCredentialsException } from '../../exceptions/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const auth = getAuth();
	const [user, loading, error] = useAuthState(auth);

	const signIn = async (email, password) => {
		try {
			await signInWithEmailAndPassword(auth, email, password);
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

	const logOut = async () => {
		await signOut(auth);
	};

	const forgotPassword = async (email) => {
		try {
			await sendPasswordResetEmail(auth, email);
		} catch (error) {
			throw new WrongCredentialsException('We cant find a user with that e-mail address.');
		}
	};

	const signup = async (email, password) => {
		const data = await createUserWithEmailAndPassword(auth, email, password);
		const userId = data.user.uid
		await set(ref(database, `user/${userId}`), { email, isApproved: "false", type: "user" });

	}

	return (
		<AuthContext.Provider
			value={{
				user,
				signup,
				signIn,
				logOut,
				forgotPassword
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
