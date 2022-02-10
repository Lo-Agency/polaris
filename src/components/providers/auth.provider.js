import {
	signOut,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
	getAuth,
	createUserWithEmailAndPassword
} from 'firebase/auth';
import { ref, set, child, getDatabase, get } from "@firebase/database";
import { database } from "../../util/firebase";
import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WrongCredentialsException } from '../../exceptions/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
	const [isLoading, setIsLoading] = useState(false)
	const auth = getAuth();
	const navigate = useNavigate()
	const [user, loading, error] = useAuthState(auth);

	const signIn = async (email, password) => {
		setIsLoading(true)
		try {
			const dbRef = ref(getDatabase());
			let userData;
			await signInWithEmailAndPassword(auth, email, password);
			await get(child(dbRef, `user/${auth.currentUser.uid}`)).then((snapshot) => { userData = snapshot.val() })
			if (userData.type === "admin") {
				navigate('/admin/roadmap/list')
			} else if (userData.isApproved === 'true') {
				navigate('/')
			} else {
				await logOut()
				toast.error('You are not approved yet.', {
					position: "top-center",
					autoClose: 5000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			}
		} catch (error) {
			setIsLoading(false)
			switch (error.code) {
				case 'auth/user-not-found':
					throw new WrongCredentialsException('User not found');
				case 'auth/wrong-password':
					throw new WrongCredentialsException('Password is incorrect');
				default:
					throw new WrongCredentialsException('Something went Wrong contact admin!');
			}

		}
		setIsLoading(false)
	};

	const logOut = async () => {
		await signOut(auth);
	};

	const forgotPassword = async (email) => {
		setIsLoading(true)
		try {
			await sendPasswordResetEmail(auth, email);
		} catch (error) {
			setIsLoading(false)
			throw new WrongCredentialsException('We cant find a user with that e-mail address');
		}
		setIsLoading(false)
	};

	const signup = async (email, password) => {
		setIsLoading(true)
		try {
			const data = await createUserWithEmailAndPassword(auth, email, password);
			const userId = data.user.uid
			await set(ref(database, `user/${userId}`), { email, isApproved: "false", type: "user", group: "" });
			await logOut()
			setIsLoading(false)
			toast.success('Your Email address is successfully registered. Please wait for admin approval verification.', {
				position: "top-center",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});

		} catch (error) {
			setIsLoading(false)
			switch (error.code) {
				case 'auth/email-already-in-use':
					throw new WrongCredentialsException('Email has already been taken.');
				default:
					throw new WrongCredentialsException('Network error!');
			}
		}
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				signup,
				signIn,
				logOut,
				forgotPassword,
				isLoading
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
