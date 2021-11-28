import { format } from 'date-fns';
function Home() {
	return <h1 className="bg-blue p-2">Today is {format(new Date(),"EEEE d MMMM yyyy")}</h1>;
}

export default Home;
