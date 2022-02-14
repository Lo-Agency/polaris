import { title } from 'case';
import { useParams, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import config from '../../util/config';
import { useAuth } from '../providers/auth.provider';
import { ToastContainer } from 'react-toastify';

const AdminLayout = ({ children }) => {
	const { entityName } = useParams();
	const auth = useAuth();
	const navigate = useNavigate();
	const logOut = async () => {
		try {
			await auth.logOut();
			navigate('/login');
		} catch (e) {
			console.log(e);
		}
	};

	const getSelectedEntityClassName = (key) => {
		if (key === entityName) {
			return 'w-full bg-white text-black tracking-wide text-sm py-3 px-4 transition-colors';
		}
		return 'w-full hover:bg-gray-800 tracking-wide text-sm py-3 px-4 transition-colors';
	};

	return (
		<div className="relative">
			<aside className="w-60 bg-black fixed h-screen text-white justify-between flex-col flex z-20">
				<div>
					<h1 className="text-center text-2xl m-5">Polaris.</h1>
					<ul className="flex justify-start flex-col">
						{Object.keys(config.entities).map((key) => (
							<li className={getSelectedEntityClassName(key)} key={key}>
								<Link className="flex justify-start items-center" to={`/admin/${key.toLowerCase()}/list`}>
									{title(key)}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<button className="text-center text-sm p-5 hover:bg-gray-800" onClick={logOut}>
					Logout
				</button>
			</aside>

			<div className="absolute">
				<header className="fixed navbar min-w-full">
					<p className="px-4 ml-60">{title(entityName)}</p>
					<div>
						<Link className="px-4" to={`/`}>
							Home
						</Link>
						{entityName !== 'user' ? (
							<Link className="py-2 px-4 mr-4 text-center btn" to={`/admin/${entityName}/create`}>
								Create new
							</Link>
						) : null}
					</div>
				</header>
			</div>

			{children}
			<ToastContainer />
		</div>
	);
};

export default AdminLayout;
