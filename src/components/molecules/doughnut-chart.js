import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = ({ phaseProjects, projectList }) => {
	const filteredProjects = (Object.values(projectList)).filter((item => phaseProjects.indexOf((item.title)[0]) >= 0))
	const projectDays = (Object.values(filteredProjects)).map(item => Number(item.days) + Number(item.learningDay))

	const data = {
		labels: phaseProjects,
		datasets: [
			{
				label: '# of Votes',
				data: projectDays,
				backgroundColor: [
					'rgb(220,220,220)',
					'rgb(211,211,211)',
					'rgb(192,192,192)',
					'rgb(169,169,169)',
					'rgb(128,128,128)',
					'rgb(105,105,105)',
				],
				borderColor: [
					'rgb(0,0,0)'
				],
				borderWidth: 1,
				color: "#FFF",
			},
		],
	};

	return (
		<div className="flex items-center  min-w-full justify-center">
			<div className="min-w-full">
				<Doughnut data={data} />
			</div>
		</div>
	)
}
export default Charts;
