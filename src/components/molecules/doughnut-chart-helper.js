import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { calculateLessonsDuration } from '../../util/extract-data';

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChartHelper = ({ phaseTargets, targetList, lessons }) => {
	const filteredTargets = Object.values(targetList).filter((item) => phaseTargets.indexOf(item.title) >= 0);
	const targetDays = Object.values(filteredTargets).map(
		(item) => Number(item['duration']) + calculateLessonsDuration(item['lesson'], lessons),
	);

	const data = {
		labels: phaseTargets,
		datasets: [
			{
				label: '# of Votes',
				data: targetDays,
				backgroundColor: ['#333333', '#555555', '#777777', '#999999'],
				borderColor: ['rgb(0,0,0)'],
				borderWidth: 1,
				color: '#FFF',
			},
		],
	};

	return (
		<div className="">
			<Doughnut data={data} />
		</div>
	);
};
export default DoughnutChartHelper;
