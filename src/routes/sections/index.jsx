import { lazy, Suspense, useEffect } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import { MainLayout } from 'src/layouts/main';
import { SimpleLayout } from 'src/layouts/simple';

import { SplashScreen } from 'src/components/loading-screen';

import { authRoutes } from './auth';
import { mainRoutes } from './main';
import { authDemoRoutes } from './auth-demo';
import { dashboardRoutes } from './dashboard';
import { componentsRoutes } from './components';

// ----------------------------------------------------------------------

const HomePage = lazy(() => import('src/pages/home'));
const MaintenancePage = lazy(() => import('src/pages/maintenance'));

export function Router() {
  const isMaintenance = import.meta.env.VITE_MAINTENANCE === 'true';

  useEffect(() => {
    console.log('isMaintenance', isMaintenance);
    // Ajoutez ici des effets supplémentaires si nécessaire
  }, [isMaintenance]);

  return useRoutes([
    {
      path: '/',
      element: (
        <Suspense fallback={<SplashScreen />}>
          {isMaintenance ? (
            <SimpleLayout content={{ compact: true }}>
              <MaintenancePage />
            </SimpleLayout>
          ) : (
            <MainLayout>
              <HomePage />
            </MainLayout>
          )}
        </Suspense>
      ),
    },

    // Auth
    ...authRoutes,
    ...authDemoRoutes,

    // Dashboard
    ...dashboardRoutes,

    // Main
    ...mainRoutes,

    // Components
    ...componentsRoutes,

    // No match
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
