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
						dashboard
					</Link>
				</header>
			) : (
				<LoadingPage />
			)}
		</>
	);
}
export default Home;
