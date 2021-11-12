import { Route, Routes } from "react-router";
import config from "./util/config";
import AuthProvider from "./components/providers/auth.provider";
import CustomRoute from "./components/auth/customRoutes";
import React, { lazy, Suspense } from "react";


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
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
