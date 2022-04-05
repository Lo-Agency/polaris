import {
	signOut,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	getAuth,
	createUserWithEmailAndPassword,
	signInWithPopup,
	GithubAuthProvider,
	GoogleAuthProvider,
} from 'firebase/auth';
import { ref, set, child, getDatabase, get } from '@firebase/database';
import { database } from '../../util/firebase';
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WrongCredentialsException } from '../../exceptions/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const [functionIsLoading, setFunctionIsLoading] = useState(false);
	const auth = getAuth();
	const navigate = useNavigate();
	const [user, loading] = useAuthState(auth);

	const signIn = async (email, password) => {
		setFunctionIsLoading(true);
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			setFunctionIsLoading(false);
			if (error.code === 'auth/user-not-found') {
				throw new WrongCredentialsException('User not found');
			} else if (error.code === 'auth/wrong-password') {
				throw new WrongCredentialsException('Password is incorrect');
			} else {
				throw new WrongCredentialsException('Something went Wrong contact admin!');
			}
		}
		setFunctionIsLoading(false);
	};
	const logOut = async () => {
		await signOut(auth);
	};

	const forgotPassword = async (email) => {
		setFunctionIsLoading(true);
		try {
			await sendPasswordResetEmail(auth, email);
		} catch (error) {
			setFunctionIsLoading(false);
			throw new WrongCredentialsException('We cant find a user with that e-mail address');
		}
		setFunctionIsLoading(false);
	};

	const loginWithOAuthSystem = async (providerName) => {
		setFunctionIsLoading(true);
		const dbRef = ref(getDatabase());
		let provider;
		if (providerName === 'github') {
			provider = new GithubAuthProvider();
		} else {
			provider = new GoogleAuthProvider();
		}
		try {
			const result = await signInWithPopup(auth, provider);
			const userData = result.user;
			const userMetaData = await get(child(dbRef, `${userData.uid}`));
			if (userMetaData.exists()) {
				await checkUserMetaData(userMetaData.val());
			} else {
				await logOut();
				await set(ref(database, `${userData.uid}/userinformation`), {
					email: userData.email,
				});
				toast.success('Your are successfully registered.', {
					position: 'top-center',
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
				setFunctionIsLoading(false);
			}
		} catch (error) {
			setFunctionIsLoading(false);
			if (error.code === 'auth/account-exists-with-different-credential') {
				throw new WrongCredentialsException('This email is already exist with different credential!');
			} else {
				throw new WrongCredentialsException('Something went Wrong contact admin!');
			}
		}
	};

	const signup = async (firstname, lastname, email, workspacename, password) => {
		setFunctionIsLoading(true);
		try {
			const data = await createUserWithEmailAndPassword(auth, email, password);
			const userId = data.user.uid;
			await set(ref(database, `${userId}/userinformation`), {
				firstname,
				lastname,
				email,
				workspacename,
			});
			await logOut();
			navigate('/login');
			setFunctionIsLoading(false);
			toast.success('Your Email address is successfully registered.', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} catch (error) {
			setFunctionIsLoading(false);
			if (error.code === 'auth/email-already-in-use') {
				throw new WrongCredentialsException('Email has already been taken.');
			} else {
				throw new WrongCredentialsException('Something went Wrong contact admin!');
			}
		}
	};

	const checkUserMetaData = async () => {
		setFunctionIsLoading(false);
		navigate('/');
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				signup,
				signIn,
				logOut,
				forgotPassword,
				functionIsLoading,
				loading,
				loginWithOAuthSystem,
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
