import logo from './logo.svg';
import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './assets/theme';
import SignIn from './views/SignIn';
import { ThemeProvider } from '@mui/material';


function App() {

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <SignIn/>
      </ThemeProvider>
    </>
  );
}

export default App;
