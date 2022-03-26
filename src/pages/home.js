import { React } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../components/providers/auth.provider';

export function Home() {
	const auth = useAuth();
	return (
		<>
			<header className="navbar fixed w-full px-4">
				<Link className="text-2xl" to={`${auth.user.uid}/${auth.user.uid}`}>
					dashboard
				</Link>
			</header>
		</>
	);
}
export default Home;
