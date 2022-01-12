import { Route, Routes } from "react-router";
import config from "./util/config";
import AuthProvider from "./components/providers/auth.provider";
import CustomRoute from "./components/routes/custom-routes";
import React, { lazy, Suspense } from "react";
import CrudProvider from "./components/providers/crud.provider";

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
                <CrudProvider>
                  <CustomRoute isProtected={route.isProtected}>
                    <Suspense fallback={<p>Loading...</p>}>
                      <Component />
                    </Suspense>
                  </CustomRoute>
                </CrudProvider>
              }>
              </Route>
            })
          }
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
