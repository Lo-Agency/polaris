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
					'#333333',
					'#555555',
					'#777777',
					'#999999',
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
		<div className="">
			<Doughnut data={data} />
		</div>
	)
}
export default Charts;
