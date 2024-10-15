import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#629624',
        },
        secondary: {
            main: '#f50057',
        },
    },
    zIndex: {
        appBar: 1200,
        drawer: 1100,
    },
});

export default theme;