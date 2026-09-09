import { createTheme } from '@mui/material/styles';

// Material theme built around the original purple palette of the app
export const theme = createTheme({
    palette: {
        primary: {
            main: '#7b3fbf',
            light: '#c192ec',
            dark: '#54287f',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#af6dec',
            light: '#f3e9fb',
            dark: '#7a49a5',
            contrastText: '#ffffff',
        },
        background: {
            default: '#faf7fd',
            paper: '#ffffff',
        },
    },
    shape: {
        borderRadius: 8,
    },
    typography: {
        fontFamily: 'Inter, Roboto, Avenir, Helvetica, Arial, sans-serif',
        button: {
            textTransform: 'none',
            fontWeight: 600,
        },
    },
    components: {
        MuiCard: {
            defaultProps: { elevation: 0 },
            styleOverrides: {
                root: { border: '1px solid rgba(0, 0, 0, 0.12)' },
            },
        },
    },
});

export default theme;
