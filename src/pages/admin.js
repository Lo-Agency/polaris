import format from "date-fns/format";
import Charts from "../components/admin/charts";
import { useCrud } from "../components/providers/crud.provider";
import { subDays } from 'date-fns'
import { title } from "case";




function Admin() {
	const crud = useCrud();
	let entityData, roadmap, phase, project, projectData, learningData, learn, starting, eDate, projTitles, duration;
	crud.dataState && (entityData = crud.dataState.filter(elem => Object.keys(elem) == "roadmap"))
	crud.dataState && (roadmap = (Object.values(entityData[0])[0]));
	let phaseData;
	crud.dataState && (entityData = crud.dataState.filter(elem => Object.keys(elem) == "roadmap"))
	crud.dataState && (phaseData = crud.dataState.filter(elem => Object.keys(elem) == "phase"))
	crud.dataState && (learningData = crud.dataState.filter(elem => Object.keys(elem) == "learning"))
	crud.dataState && (projectData = crud.dataState.filter(elem => Object.keys(elem) == "project"))
	crud.dataState && (roadmap = (Object.values(entityData[0])[0]));
	crud.dataState && (phase = (Object.values(phaseData[0])[0]));
	crud.dataState && (learn = (Object.values(learningData[0])[0]))
	crud.dataState && (project = (Object.values(projectData[0])[0]))
	crud.dataState && console.log(Object.values(roadmap), "roadmap");
	crud.dataState && console.log(Object.values(project), "project");

	projTitles = crud.dataState && (Object.values(project)).map(proj => proj.title)
	crud.dataState && console.log(Object.values(projTitles), "projtitle");

	(crud.dataState && Object.values(roadmap)).map(item => {
		console.log(item.startingDate, "SDate", item.title, "title")
	})

	var result = format(subDays(new Date(2014, 8, 1), 10), "EEEE d MMMM yyyy")


	console.log()

	return (
		<>
			<div>
				<p>Today is {format(new Date(), "EEEE d MMMM yyyy")}</p>
				<p>{result}</p>

			</div>
			{/* <Charts/> */}
		</>

	)
}

export default Admin;
