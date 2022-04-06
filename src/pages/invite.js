import { React } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingPage from '../components/molecules/loading-page';
import { useAuth } from '../components/providers/auth.provider';
import { useCrud } from '../components/providers/crud.provider';

export function Home() {
	const auth = useAuth();
	const crud = useCrud();
	const navigate = useNavigate();
	const { workspaceId, workspaceName } = useParams();

	const handleSubmit = () => {
		crud.addNewMember(auth.user.uid);
		navigate(`/${auth.user.uid}/${workspaceId}`);
	};
	return (
		<>
			{auth.user ? (
				<div className=" flex items-center justify-center flex-col h-screen">
					<p className="text-xl">You have been invited to {workspaceName}, do you want to join?</p>
					<button
						className="text-l py-1 w-60 mt-8 flex justify-center text-white bg-black items-center"
						onClick={() => {
							handleSubmit();
						}}>
						Join now
					</button>
				</div>
			) : (
				<LoadingPage />
			)}
		</>
	);
}
export default Home;
