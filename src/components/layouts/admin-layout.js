import { title } from 'case';
import { useParams, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import config from '../../util/config';
import { useAuth } from '../providers/auth.provider';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';

const AdminLayout = ({ children }) => {
	const { workspaceId, entityName } = useParams();
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

	const [active, setActive] = useState(localStorage.getItem('active'));
	const [activeshared, setActiveShared] = useState(localStorage.getItem('activeshared'));

	if (active === null || activeshared === null) {
		localStorage.setItem('active', 'false');
		localStorage.setItem('activeshared', 'false');
	}

	function toggleAccordionSharedWorkspace() {
		if (localStorage.getItem('activeshared') === 'false') {
			setActiveShared('true');
			localStorage.setItem('activeshared', 'true');
		} else {
			setActiveShared('false');
			localStorage.setItem('activeshared', 'false');
		}
	}

	function toggleAccordion() {
		if (localStorage.getItem('active') === 'false') {
			setActive('true');
			localStorage.setItem('active', 'true');
		} else {
			setActive('false');
			localStorage.setItem('active', 'false');
		}
	}

	return (
		<>
			<div className="relative">
				<aside className="w-60 bg-black fixed h-screen text-white justify-between flex-col flex z-20">
					<div className="mt-5">
						<Link className="text-center text-2xl m-5" to={'/'}>
							Polaris.
						</Link>
						<div>
							<ul
								onClick={() => toggleAccordionSharedWorkspace()}
								className="flex justify-start flex-col mt-5 relative cursor-pointer">
								<li className="w-full hover:bg-gray-800 tracking-wide text-sm py-3 px-4 transition-colors">
									Shared Workspcae
								</li>
								<label className="absolute right-3 top-3 cursor-pointer">
									{activeshared === 'true' && (
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
										</svg>
									)}
									{activeshared === 'false' && (
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
										</svg>
									)}
								</label>
							</ul>

							<ul className={activeshared === 'true' ? 'block' : 'hidden'}>
								{Object.keys(config.entities).map((workspacename, index) => (
									<Link key={index} to={`/${sharedworkspaceId}`}>
										<li className={getSelectedEntityClassName(workspacename)}>{title(workspacename)}</li>
									</Link>
								))}
							</ul>
						</div>

						<div>
							<ul onClick={() => toggleAccordion()} className="flex justify-start flex-col relative cursor-pointer">
								<li className="w-full hover:bg-gray-800 tracking-wide text-sm py-3 px-4 transition-colors">
									My Workspcae
								</li>
								<label className="absolute right-3 top-3 cursor-pointer">
									{active === 'true' && (
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
										</svg>
									)}
									{active === 'false' && (
										<svg
											className="w-5 h-5"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
										</svg>
									)}
								</label>
							</ul>

							<ul className={active === 'true' ? 'block' : 'hidden'}>
								{Object.keys(config.entities).map((entity) => (
									<Link key={entity} to={`/${workspaceId}/${entity.toLowerCase()}/list`}>
										<li className={getSelectedEntityClassName(entity)}>{title(entity)}</li>
									</Link>
								))}
							</ul>
						</div>
					</div>
					<button className="text-center text-sm p-5 hover:bg-gray-800" onClick={logOut}>
						Logout
					</button>
				</aside>

				<div className="absolute">
					<header className="fixed navbar min-w-full">
						<p className="px-4 ml-60">{title(entityName)}</p>
						<div>
							<Link className="px-4" to={'/'}>
								Home
							</Link>
							{entityName !== 'user' && (
								<Link className="py-2 px-4 mr-4 text-center btn" to={`/${workspaceId}/${entityName}/create`}>
									Create new
								</Link>
							)}
						</div>
					</header>
				</div>

				{children}
				<ToastContainer />
			</div>
		</>
	);
};

export default AdminLayout;
