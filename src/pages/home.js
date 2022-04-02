import { React } from 'react';
import { Link } from 'react-router-dom';
import LoadingPage from '../components/molecules/loading-page';
import { useAuth } from '../components/providers/auth.provider';

export function Home() {
	const auth = useAuth();
	return (
		<>
			{auth.user ? (
				<header className="navbar fixed w-full px-4">
					<Link className="text-2xl" to={`/${auth.user.uid}/${auth.user.uid}`}>
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
