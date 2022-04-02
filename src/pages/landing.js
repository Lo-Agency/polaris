import { React } from 'react';
import { Link } from 'react-router-dom';

export function Landing() {
	return (
		<>
			<header className="navbar fixed w-full px-4">
				<Link className="text-2xl" to={`/login`}>
					login
				</Link>
			</header>
		</>
	);
}
export default Landing;
