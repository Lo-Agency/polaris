import { title } from 'case';
import { useParams, useNavigate, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import config from '../../util/config';
import { useAuth } from '../providers/auth.provider';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import { useState, Fragment } from 'react';
import { useCrud } from '../providers/crud.provider';

const AdminLayout = ({ children }) => {
	const crud = useCrud();
	const { workspaceId, sharedworkspaceId, entityName } = useParams();
	const location = useLocation();
	const auth = useAuth();
	const navigate = useNavigate();
	const workspaceData = crud && crud.userWorkspace;
	const checkWorkspaceName = () => {
		if (
			crud.userWorkspace &&
			entityName === 'member' &&
			(!workspaceData.userinformation.workspacename || !workspaceData.userinformation.firstname)
		) {
			toast.warning('You must complete your profile first', {
				position: 'top-center',
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			});
		} else {
			navigate(`/${workspaceId}/${sharedworkspaceId}/${entityName}/create`);
		}
	};

	const idByValues = workspaceId && crud.userSharedWorkspace;
	const [menu, setMenu] = useState([]);

	if (menu.length === 0 && localStorage.getItem('menu')) {
		setMenu(localStorage.getItem('menu').split(','));
	}
	const setMenuSituation = (situation) => {
		setMenu(situation);
		localStorage.setItem('menu', situation);
	};

	const logOut = async () => {
		try {
			await auth.logOut();
			navigate('/login');
		} catch (e) {
			console.log(e);
		}
	};

	const userEmail = crud.userWorkspace && crud.userWorkspace['userinformation']['email'];
	let sharedworkspaceWithRole = {};
	idByValues &&
		idByValues.forEach((data) => {
			sharedworkspaceWithRole[Object.keys(data)] =
				data[Object.keys(data)]['member'] &&
				Object.values(data[Object.keys(data)]['member']).filter((member) => {
					return member['email'] === userEmail;
				})[0];
		});
	const getSelectedEntityClassName = (key, id) => {
		if (key === entityName && id === sharedworkspaceId) {
			return 'w-full bg-white text-black tracking-wide text-sm py-3 px-4 transition-colors';
		}
		return 'w-full hover-list tracking-wide text-sm py-3 px-4 transition-colors';
	};

	const getWorkspaceClassName = (val) => {
		if (val === menu) {
			return 'w-full hover-list tracking-wide text-sm py-3 px-4 transition-colors bg-gray-900';
		}
		return 'w-full hover-list tracking-wide text-sm py-3 px-4 transition-colors';
	};

	const getArrowPosition = (val) => {
		if (val[0] === menu[0]) {
			return 'absolute right-3 top-3 cursor-pointer';
		}

		return 'absolute right-3 rotate-180 transform top-3 cursor-pointer';
	};

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
									onClick={() => {
										setMenuSituation(['shared']);
									}}
									className="flex justify-start flex-col mt-5 relative cursor-pointer">
									<li className={getWorkspaceClassName(['shared'])}>Shared Workspace</li>
									<label className={getArrowPosition(['shared'])}>
										<svg
											className="w-6 h-6"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
										</svg>
									</label>
								</ul>

								<ul
									className={
										menu.includes('shared') ? 'flex justify-start flex-col relative cursor-pointer' : 'hidden'
									}>
									{idByValues &&
										idByValues.map((id, index) => {
											return (
												<Fragment key={index}>
													<Link to={`/${workspaceId}/${Object.keys(id)}`} key={index}>
														<li
															onClick={() => {
																setMenuSituation(['shared', Object.keys(id)[0]]);
															}}
															className="w-full hover-list tracking-wide text-sm py-3 px-4 transition-colors">
															{' '}
															{Object.values(id)[0].userinformation.workspacename}
														</li>
														<label className={getArrowPosition(['shared', Object.keys(id)[0]])}>
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
																	d="M5 15l7-7 7 7"></path>
															</svg>
														</label>
													</Link>
													{sharedworkspaceWithRole[Object.keys(id)[0]] &&
														sharedworkspaceWithRole[Object.keys(id)[0]]['role'] === 'admin' && (
															<ul className={menu[1] === Object.keys(id)[0] ? 'block' : 'hidden'}>
																{Object.keys(config.entities).map((entity) => (
																	<Link
																		key={[entity]}
																		to={`/${workspaceId}/${Object.keys(id)}/${entity.toLowerCase()}/list`}>
																		<li className={getSelectedEntityClassName(entity, Object.keys(id)[0])}>
																			{title(entity)}
																		</li>
																	</Link>
																))}
															</ul>
														)}
												</Fragment>
											);
										})}
								</ul>
							</div>
						)}

						<div>
							<ul
								onClick={() => {
									setMenuSituation(['ownWorkspace']);
								}}
								className="flex justify-start flex-col relative cursor-pointer">
								<Link to={`/${workspaceId}/${workspaceId}`}>
									<li className={getWorkspaceClassName(['ownWorkspace'])}>My Workspace</li>
								</Link>
								<label className={getArrowPosition(['ownWorkspace'])}>
									<svg
										className="w-6 h-6"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
									</svg>
								</label>
							</ul>

							<ul className={menu.includes('ownWorkspace') ? 'block' : 'hidden'}>
								{Object.keys(config.entities).map((entity) => (
									<Link key={entity} to={`/${workspaceId}/${workspaceId}/${entity.toLowerCase()}/list`}>
										<li className={getSelectedEntityClassName(entity, workspaceId)}>{title(entity)}</li>
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
						{location.pathname.includes('profile') && <p className="px-4 ml-60"> User profile</p>}
						<p className="px-4 ml-60">{title(entityName)}</p>
						<div className="flex justify-center items-center">
							{entityName && (
								<button onClick={checkWorkspaceName} className="py-2 px-4 mr-4 text-center btn">
									Add new
								</button>
							)}
							<Link className="px-2" to={'/'}>
								Home
							</Link>
							<Link className="px-4" to={`/${workspaceId}/profile`}>
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
