import AdminLayout from '../components/layouts/admin-layout';
import LoadingPage from '../components/molecules/loading-page';
import { useCrud } from '../components/providers/crud.provider';
import Select from 'react-select';
import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import DoughnutChart from '../components/organisms/doughnut-chart';
import GanttChart from '../components/organisms/gantt-chart';
import TableView from '../components/molecules/table-view';
import { format } from 'date-fns';

const workspace = () => {
	const crud = useCrud();
	const workspaceData = crud.userWorkspace;
	const roadmaps = workspaceData && workspaceData['roadmap'];
	const [selectedRoadmap, setSelectedRoadmap] = useState(null);
	const [viewType, setViewType] = useState(localStorage.getItem('viewtype'));

	const options =
		roadmaps && Object.entries(roadmaps).map((roadmap) => ({ value: roadmap[0], label: roadmap[1]['title'] }));

	if (!viewType) {
		setViewType('table');
	}

	const RoadmapView = (viewtype) => {
		localStorage.setItem('viewtype', viewtype);
		setViewType(viewtype);
		getSelectedEntityClassName(viewtype);
	};

	const getSelectedEntityClassName = (type) => {
		if (type === viewType) {
			return 'view-roadmap ';
		}
		return 'view-roadmap-hover';
	};

	const createSelectBox = () => {
		if (options) {
			return (
				<form>
					<Select
						onChange={(value) => {
							setSelectedRoadmap(value);
						}}
						defaultValue={selectedRoadmap}
						theme={(theme) => ({
							...theme,
							borderRadius: 0,
							colors: {
								...theme.colors,
								primary25: '#C0C0C0',
								primary50: '#C0C0C0',
								primary: 'black',
							},
						})}
						className="p-2 w-96 max-w-lg"
						classNamePrefix="select"
						closeMenuOnSelect={true}
						name={'roadmap'}
						options={options}></Select>
				</form>
			);
		}
		return <p>You dont have any group yet!</p>;
	};

	const createRoadmap = (type) => {
		switch (type) {
			case 'table':
				return <TableView roadmapId={selectedRoadmap.value} />;
			case 'gantt':
				return <GanttChart roadmapId={selectedRoadmap.value} />;
			case 'doughnut':
				return <DoughnutChart selectedRoadmap={selectedRoadmap.value} />;
		}
	};

	return (
		<AdminLayout>
			{workspaceData ? (
				<div className="flex flex-col">
					<header className="navbar fixed w-full px-4">
						<Link className="text-2xl" to={'/'}>
							Polaris.
						</Link>
					</header>
					{selectedRoadmap && (
						<div className="px-4 mt-20 mb-10">
							<div className="flex justify-between mb-3">
								<div className="flex self-center">
									<p> Starting Date {format(new Date(Object.values(roadmaps[selectedRoadmap.value])[1]), 'PPP')} </p>
								</div>
								<div className="flex">
									{createSelectBox()}
									<button onClick={() => RoadmapView('table')}>
										<svg
											className={getSelectedEntityClassName('table')}
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
										</svg>
									</button>

									<button className="rotate" onClick={() => RoadmapView('gantt')}>
										<svg
											className={getSelectedEntityClassName('gantt')}
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
										</svg>
									</button>

									<button onClick={() => RoadmapView('doughnut')}>
										<svg
											className={getSelectedEntityClassName('doughnut')}
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
											xmlns="http://www.w3.org/2000/svg">
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
											<path
												strokeLinecap="round"
												className=""
												strokeLinejoin="round"
												strokeWidth=""
												d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
										</svg>
									</button>
								</div>
							</div>
							{createRoadmap(viewType)}
						</div>
					)}
					{!selectedRoadmap && <div className="flex h-full items-center justify-center mt-72">{createSelectBox()}</div>}
				</div>
			) : (
				<LoadingPage />
			)}
		</AdminLayout>
	);
};

export default workspace;
