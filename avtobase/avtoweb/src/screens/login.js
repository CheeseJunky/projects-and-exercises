import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    IconButton,
    InputAdornment,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { describeError, loginUser } from '../util/http';
import { UserContext } from '../store/user-context';

const LoginScreen = () => {
    // The backend authenticates against the email column, so ask for an email.
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [feedback, setFeedback] = useState(null); // { severity, message }

    const userCtx = useContext(UserContext);
    const navigate = useNavigate();

    // Wrapped in a form so Enter submits.
    async function handleLogin(event) {
        event.preventDefault();
        if (!email || !password) {
            setFeedback({ severity: 'warning', message: 'Enter your email and password' });
            return;
        }

        setIsSubmitting(true);
        try {
            const user = await loginUser(email, password);

            if (user) {
                userCtx.setUser(user);
                setFeedback({ severity: 'success', message: `Welcome, ${user.username}` });
                navigate('/');
            } else {
                // Previously the failed-login payload was written into the
                // context, which logged the guest user out of their own session.
                setFeedback({ severity: 'error', message: 'Wrong email or password' });
            }
        } catch (error) {
            setFeedback({ severity: 'error', message: describeError(error, 'Login failed') });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Container maxWidth="xs" sx={{ py: 6 }}>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" sx={{ mb: 2 }}>
                        Sign in
                    </Typography>

                    <Box component="form" onSubmit={handleLogin} noValidate>
                        <Stack spacing={2}>
                            <TextField
                                label="Email"
                                type="email"
                                autoComplete="username"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                fullWidth
                                autoFocus
                            />
                            <TextField
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                slotProps={{
                                    input: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label={
                                                        showPassword
                                                            ? 'Hide password'
                                                            : 'Show password'
                                                    }
                                                    onClick={() => setShowPassword((v) => !v)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    },
                                }}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={isSubmitting}
                                startIcon={
                                    isSubmitting
                                        ? <CircularProgress size={18} color="inherit" />
                                        : <LoginIcon />
                                }
                            >
                                Login
                            </Button>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>

            <Snackbar
                open={Boolean(feedback)}
                autoHideDuration={6000}
                onClose={() => setFeedback(null)}
            >
                <Alert
                    severity={feedback?.severity || 'info'}
                    variant="filled"
                    onClose={() => setFeedback(null)}
                >
                    {feedback?.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default LoginScreen;
