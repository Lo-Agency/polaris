import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/button';
import { useAuth } from '../components/providers/auth.provider';
import { useCrud } from '../components/providers/crud.provider';
import AdminLayout from '../components/layouts/admin-layout';
import LoadingPage from '../components/molecules/loading-page';

const Profile = () => {
	const { user } = useAuth();
	const crud = useCrud();
	const navigate = useNavigate();
	const userMetaData = crud.dataState && crud.dataState[user.uid]['userinformation'];

	const saveProfile = () => {
		const form = new FormData(event.target);
		const values = {
			firstname: form.get('firstname'),
			lastname: form.get('lastname'),
			workspacename: form.get('workspacename'),
		};
		crud.updateProfile(values, user.uid);
		navigate(`/${user.uid}/${user.uid}`);
	};

	return (
		<AdminLayout>
			{userMetaData ? (
				<div className="content-sidebar">
					<form onSubmit={saveProfile}>
						<div className="flex flex-col justify-center text-sm items-center mt-8 ">
							<div className="m-2 sm:m-1 xsm:m-1 flex flex-col">
								<label className="py-2">Firstname:</label>
								<input
									className="py-2 px-3 outline-none xsm:w-48 sm:w-60 w-72 border-2 border-black"
									name="firstname"
									type="text"
									defaultValue={userMetaData['firstname']}
								/>
							</div>

							<div className="m-2 sm:m-1 xsm:m-1 flex flex-col">
								<label className="py-2">Lastname:</label>
								<input
									className="py-2 px-3 outline-none xsm:w-48 sm:w-60 w-72 border-2 border-black"
									name="lastname"
									type="text"
									defaultValue={userMetaData['lastname']}
								/>
							</div>

							<div className="m-2 sm:m-1 xsm:m-1 flex flex-col">
								<label className="py-2">Workspace Name:</label>
								<input
									className="py-2 px-3 outline-none xsm:w-48 sm:w-60 w-72 border-2 border-black"
									name="workspacename"
									type="text"
									defaultValue={userMetaData['workspacename']}
								/>
							</div>

							<Button className={'btn-form flex justify-center items-center'} actionName={'Save'} />
						</div>
					</form>
				</div>
			) : (
				<LoadingPage />
			)}
		</AdminLayout>
	);
};
export default Profile;
