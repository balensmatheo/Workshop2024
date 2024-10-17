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
import React, { useEffect } from 'react';
import { generateClient } from 'aws-amplify/api';

const client = generateClient();

function App() {

  const [points, setPoints] = React.useState(0);

  useEffect(() => {
      const fetchUserPoints = async () => {
          try {
              const user = await client.models.User.list();
              console.log(user);
              setPoints(user.data[0].points);
          } catch (error) {
              console.error("Failed to fetch user points:", error);
          }
      };

      fetchUserPoints();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/signIn",
      element: <SignIn />
    },
    {
      path: "/",
      element: <PrimarySearchAppBar points={points} setPoints={setPoints} />,
      errorElement: <ErrorPage />,
      children: [
          {
            path: "/dashboard",
            element: <Dashboard points={points} setPoints={setPoints} />,
          },
          { 
            path: "/me",
            element: <UserProfile points={points} setPoints={setPoints} />,
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
