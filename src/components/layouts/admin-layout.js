import { title } from 'case';
import { useParams, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import config from '../../util/config';
import { useAuth } from '../providers/auth.provider';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import { useCrud } from '../providers/crud.provider';

const AdminLayout = ({ children }) => {
	const crud = useCrud();
	const { workspaceId, entityName } = useParams();
	const auth = useAuth();
	const navigate = useNavigate();

	const idByValues = workspaceId && crud.userSharedWorkspace;

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
		return 'w-full hover-list tracking-wide text-sm py-3 px-4 transition-colors';
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
			navigate(`/${workspaceId}/${workspaceId}`);
			setActiveShared('false');
			localStorage.setItem('activeshared', 'false');
		}
	}

	function toggleAccordion() {
		if (localStorage.getItem('active') === 'false') {
			navigate(`/${workspaceId}/${workspaceId}`);
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
				<aside className="w-60 bg-black text-white justify-between fixed flex-col flex z-20 h-screen overflow-auto">
					<div className="mt-5">
						<Link className="text-center text-2xl m-5" to={'/'}>
							Polaris.
						</Link>
						{idByValues && idByValues.length !== 0 && (
							<div>
								<ul
									onClick={() => toggleAccordionSharedWorkspace()}
									className="flex justify-start flex-col mt-5 relative cursor-pointer">
									<li className="w-full hover-list tracking-wide text-sm py-3 px-4 transition-colors">
										Shared Workspace
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

								<ul
									className={
										activeshared === 'true' ? 'flex justify-start flex-col relative cursor-pointer' : 'hidden'
									}>
									{idByValues &&
										idByValues.map((id, index) => {
											return (
												<Link to={`/${workspaceId}/${Object.keys(id)}`} key={index}>
													<li className="w-full hover-list tracking-wide text-sm py-3 px-4 transition-colors">
														{' '}
														{Object.values(id)[0].userinformation.workspacename}
													</li>
												</Link>
											);
										})}
								</ul>
							</div>
						)}

						<div>
							<ul onClick={() => toggleAccordion()} className="flex justify-start flex-col relative cursor-pointer">
								<li className="w-full hover-list tracking-wide text-sm py-3 px-4 transition-colors">My Workspace</li>
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
					<button className="text-center text-sm p-5 hover-list" onClick={logOut}>
						Logout
					</button>
				</aside>

				<div className="absolute">
					<header className="fixed navbar bg-white min-w-full">
						<p className="px-4 ml-60">{title(entityName)}</p>
						<div>
							<Link className="px-4" to={'/'}>
								Home
							</Link>
							{entityName && (
								<Link className="py-2 px-4 mr-4 text-center btn" to={`/${workspaceId}/${entityName}/create`}>
									Add new
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
