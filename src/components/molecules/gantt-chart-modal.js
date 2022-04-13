import { extractDataFromEntity } from '../../util/extract-data';
import { useCrud } from '../providers/crud.provider';
import { title } from 'case';
import { isAfter } from 'date-fns';

const GanttChartModal = ({ onCancel, project, phaseId, startDate }) => {
	const { dataState } = useCrud();
	const phases = extractDataFromEntity('phase', dataState);
	const learnings = extractDataFromEntity('learning', dataState);
	const phaseLearningsIds = phases[phaseId]['learning'];
	return (
		<>
			<div onClick={onCancel} className="fixed z-10 inset-0 overflow-y-auto">
				<div className="flex justify-center min-h-screen p-4 items-center text-center sm:block sm:p-0">
					<div enter="ease-out duration-300" leave="ease-in duration-200">
						<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</div>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
						&#8203;
					</span>
					<div enter="ease-out duration-300" leave="ease-in duration-200">
						<div className="p-5 inline-block align-bottom bg-white text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
							<table className="min-w-full divide-y divide-gray-500 m-8">
								<tbody>
									<tr>
										<td>Type:</td>
										<td>{project.projectType}</td>
									</tr>
									<tr>
										<td>Learning:</td>
										<td>{project.learningDay} days</td>
									</tr>
									<tr>
										<td>Project:</td>
										<td>{project.days} days</td>
									</tr>
									<tr>
										<td>Learning courses:</td>
										{isAfter(new Date(), new Date(startDate)) ? (
											<td className="pt-4">
												{phaseLearningsIds.map((id) => (
													<p key={id} className="">
														{title(learnings[id].title)}
													</p>
												))}
											</td>
										) : (
											<svg
												className="w-6 h-6 mr-4"
												fill="none"
												stroke="currentColor"
												viewBox="0 0 24 24"
												xmlns="http://www.w3.org/2000/svg">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth="2"
													d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
											</svg>
										)}
									</tr>
								</tbody>
							</table>

							<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
								<button
									type="button"
									className="btn-form focus:outline-none focus:ring-2 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
									OK
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default GanttChartModal;
