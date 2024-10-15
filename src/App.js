import logo from './logo.svg';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './assets/theme';
import SignIn from './views/SignIn';
import { ThemeProvider } from '@mui/material';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './views/404';
import Dashboard from './views/Dashboard';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <SignIn />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/app/dashboard",
      element: <Dashboard />,
    },
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
