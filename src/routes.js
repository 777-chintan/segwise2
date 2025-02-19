import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/',
      element: (
        <DashboardLayout>
          <DashboardAppPage />
        </DashboardLayout>
      ),
    },
    {
      element: <SimpleLayout />,
      children: [{ path: '404', element: <Page404 /> }],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
