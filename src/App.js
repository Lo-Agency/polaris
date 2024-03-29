import { Route, Routes } from 'react-router';
import config from './util/config';
import React, { lazy, Suspense } from 'react';
import CrudProvider from './components/providers/crud.provider';
import PrivateRoute from './components/routes/private-route';
import PublicRoute from './components/routes/public-route';
import LoadingPage from './components/molecules/loading-page';
import NotFound from './pages/not-found';

function App() {
	return (
		<Routes>
			{Object.keys(config.routes).map((routeConfig) => {
				const route = config.routes[routeConfig];
				const Component = lazy(() => import(`./pages/${routeConfig}`));
				return (
					<Route
						key={routeConfig}
						path={route.pathname}
						element={
							<CrudProvider>
								<Suspense fallback={<LoadingPage />}>
									{route.isProtected ? (
										<PrivateRoute>
											<Component />
										</PrivateRoute>
									) : (
										<PublicRoute>
											<Component />
										</PublicRoute>
									)}
								</Suspense>
							</CrudProvider>
						}></Route>
				);
			})}
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
