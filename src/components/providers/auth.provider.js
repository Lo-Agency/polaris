import { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../../util/firebase";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) =>
{
	const [user, setUser] = useState(null);

	useEffect(() =>
	{
		const unsubscribe = auth.onAuthStateChanged((user) =>
		{
			setUser(user);
		});

		return () => unsubscribe();
		
	});

	const SignIn = async (email, password, callback) =>
	{
		await setPersistence(auth, browserSessionPersistence);
		await signInWithEmailAndPassword(auth, email, password);
		callback();
	};

	const SignUp = async (email, password ) =>
	{
		await createUserWithEmailAndPassword(auth, email, password);
		
	};

	const LogOut = async (callback) =>
	{
		await signOut(auth);
		setUser(null);
		callback();
	};

	return <AuthContext.Provider value={{
		User: user,
		SignIn,
		SignUp,
		LogOut
	}}>
		{children}
	</AuthContext.Provider>;
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);