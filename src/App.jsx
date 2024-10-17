import logo from './logo.svg';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './assets/theme';
import SignIn from './views/SignIn';
import { AppBar, ThemeProvider, Toolbar } from '@mui/material';
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import ErrorPage from './views/404';
import Dashboard from './views/Dashboard';
import PrimarySearchAppBar from './layout/AppBar';
import UserProfile from './views/UserProfile';
import Leaderboard from './views/Leaderboard';
import AdminView from './views/AdminView';

function App() {
  const router = createBrowserRouter([
    {
      path: "/signIn",
      element: <SignIn />
    },
    {
      path: "/",
      element: <PrimarySearchAppBar />,
      errorElement: <ErrorPage />,
      children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          { 
            path: "/me",
            element: <UserProfile />,
          },
          { 
            path: "/leaderboard",
            element: <Leaderboard />,
          },
          {
              path: "/admin",
              element: <AdminView />,
          }
      ]
    }
  ]);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
