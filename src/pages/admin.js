// import { useNavigate, useLocation} from "react-router";
// import { useAuth } from "../components/providers/auth.provider";
// import { useState } from "react";
// import { Link } from "react-router-dom";


// function Admin() {

// 	const navigate = useNavigate();
// 	const location = useLocation();
// 	const auth = useAuth();

// 	const from = location.state?.from?.pathname || "/";
// 	// const SignOutButton = async (event) => {

// 	// 	//event.preventDefault();
// 	// 	try {
// 	// 		await auth.LogOut(() => {
// 	// 			navigate("/", { replace: true });
// 	// 			console.log("signed out")
// 	// 		})
// 	// 	} catch (e) {
// 	// 		setError(e.message)
// 	// 		console.log(e.message)
// 	// 	}
// 	// };

// 	return (
// 		<>
// 			<div>
// 				<ul>
// 					<li>
// 						<Link to="admin/projects/create">New Project</Link>
// 					</li>
// 				</ul>
// 			</div>
// 		</>
// 	)
// }

// export default Admin;
