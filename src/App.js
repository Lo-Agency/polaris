import { Route, Routes } from "react-router";
import config from "./util/config";
import AuthProvider from "./components/providers/auth.provider";
import React, { lazy, Suspense } from "react";
import CrudProvider from "./components/providers/crud.provider";
import PrivateRoute from "./components/routes/private-routes";
import PublicRoute from "./components/routes/public-routes";
import LoadingPage from "./components/molecules/loading-page"

function App() {
  return (
      <AuthProvider>
        <Routes>
          {
            Object.keys(config.routes).map(routeConfig => {
              const route = config.routes[routeConfig];
              const Component = lazy(() => import(`./pages/${routeConfig}`));
              return <Route key={routeConfig} path={route.pathname} element={
                <CrudProvider>
                  <Suspense fallback={<LoadingPage />}>
                    {route.isProtected ?
                      <PrivateRoute>
                        <Component />
                      </PrivateRoute>
                      : <PublicRoute>
                        <Component />
                      </PublicRoute>
                    }
                  </Suspense>
                </CrudProvider>
              }>
              </Route>
            })
          }
          <Route path="*" element={<p>Not found</p>} />
        </Routes>
      </AuthProvider>
  );
}

export default App;
