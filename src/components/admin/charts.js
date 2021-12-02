import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = (phaseProjects) => {
	let projectLabels =[];
	phaseProjects && (Object.values(phaseProjects)).forEach(elem =>{
		elem.map(item => item.map(each => {
			projectLabels.push(each)
		}))
	})
	phaseProjects && console.log(phaseProjects, "intaraf")
	phaseProjects && console.log(projectLabels, "intaraflab")

	const data = {
		labels: projectLabels,
		datasets: [
		  {
			label: '# of Votes',
			data: [12, 19, 3, 5, 2, 3],
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
		  },
		],
	  };



  return (
  <>
  <div className="flex items-center justify-center">
  <div className="w-9/12">
 		 <Doughnut  data={data}/>
  </div>
  </div>
  </>
  )
}
export default Charts;
