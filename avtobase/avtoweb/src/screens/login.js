import React, { useContext, useState } from 'react';
import "../styles/styles.css";
import { loginUser } from '../util/http';
import { UserContext } from '../store/user-context';
import { TextField, Alert, Button, Snackbar } from '@mui/material';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const userCtx = useContext(UserContext);

    // snackbar for action feedback
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    async function handleLogin() {
        const result = await loginUser(username, password);
        userCtx.setUser(result);

        if (result.username && result.username !== "error") {
            setSnackbarOpen(true);
            setSnackbarMessage('Login successful');
        } else {
            setSnackbarOpen(true);
            setSnackbarMessage('Login failed');
        }
    };

    return (
        <div className='login-screen'>
            <TextField
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                type="password"

                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary"
                onClick={handleLogin}>
                Login
            </Button>

            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
                <Alert severity={snackbarMessage.includes('successful') ? 'success' : 'error'}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default LoginScreen;