import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './pages/home';
import Login from './pages/login';
import NewLearning from './pages/newlearning';
import NewPhase from './pages/newphase';
import NewProject from './pages/newproject';
import Admin from './pages/admin';
function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/admin" element={<Admin />} />
			<Route path="/login" element={<Login />} />
			<Route path="/newlearning" element={<NewLearning />} />
			<Route path="/newphase" element={<NewPhase />} />
			<Route path="/newproject" element={<NewProject />} />
		</Routes>
	);
}

export default App;
