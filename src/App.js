import { Route, Routes } from "react-router";
import config from "./util/config";
import AuthProvider from "./components/providers/auth.provider";
import CustomRoute from "./components/auth/customRoutes";
import React, { lazy, Suspense } from "react";
import NewLearning from "./pages/newlearning";
import NewPhase from "./pages/newphase";
import NewProject from "./pages/newproject";


function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          {
            Object.keys(config.routes).map(routeConfig => {

              const route = config.routes[routeConfig];
              const Component = lazy(() => import(`./pages/${routeConfig}`));
              return <Route key={routeConfig} path={route.pathname} element={
                <CustomRoute isProtected={route.isProtected}>
                  <Suspense fallback={<p>Loading...</p>}>
                    <Component />
                  </Suspense>
                </CustomRoute>
              }>
              </Route>

            })
          }
          <Route path="admin/newlearning" element={<NewLearning />} />
          <Route path="admin/newphase" element={<NewPhase />} />
          <Route path="admin/newproject" element={<NewProject />} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
