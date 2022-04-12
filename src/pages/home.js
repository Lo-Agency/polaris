import { React } from 'react';
import { Link } from 'react-router-dom';
import LoadingPage from '../components/molecules/loading-page';
import { useAuth } from '../components/providers/auth.provider';

export function Home() {
	const { user } = useAuth();
	return (
		<>
			{user ? (
				<header className="navbar fixed w-full px-4">
					<Link className="text-2xl" to={`/${user.uid}/${user.uid}`}>
						Dashboard
					</Link>
					<Link className="px-4" to={`/${user.uid}/profile`}>
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
								d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
						</svg>
					</Link>
				</header>
			) : (
				<LoadingPage />
			)}
		</>
	);
}
export default Home;
