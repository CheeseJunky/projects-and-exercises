import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

import { addVehicle, deleteVehicle, describeError, updateVehicle } from "../util/http";
import { BrandsContext } from "../store/brands-context";
import { UserContext } from "../store/user-context";
import { FUEL_TYPES } from "../util/constants";

// Field names match the shape the API returns for a vehicle. They used to be
// camelCase here while the server read snake_case on update, so edits to fuel
// type and image URL were silently dropped.
const EMPTY_FORM = {
    brand: '',
    model: '',
    year: '',
    price: '',
    fuel_type: '',
    doors: '',
    description: '',
    image_url: '',
};

const currentYear = new Date().getFullYear();

function validate(formData) {
    const errors = {};

    if (!formData.brand) errors.brand = 'Pick a brand';
    if (!formData.model?.trim()) errors.model = 'Model is required';
    if (!formData.fuel_type) errors.fuel_type = 'Pick a fuel type';

    const year = Number(formData.year);
    if (!formData.year) {
        errors.year = 'Year is required';
    } else if (!Number.isInteger(year) || year < 1900 || year > currentYear + 1) {
        errors.year = 'Enter a year between 1900 and ' + (currentYear + 1);
    }

    const price = Number(formData.price);
    if (formData.price === '') {
        errors.price = 'Price is required';
    } else if (!Number.isFinite(price) || price < 0) {
        errors.price = 'Price cannot be negative';
    }

    const doors = Number(formData.doors);
    if (formData.doors === '') {
        errors.doors = 'Number of doors is required';
    } else if (!Number.isInteger(doors) || doors < 0 || doors > 7) {
        errors.doors = 'Enter a number between 0 and 7';
    }

    return errors;
}

export const Admin = () => {
    const navigate = useNavigate();
    // Vehicle to edit, or undefined when adding a new one.
    const { state: editedVehicle } = useLocation();
    const isEdit = Boolean(editedVehicle?.id);

    const [formData, setFormData] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [feedback, setFeedback] = useState(null); // { severity, message }

    const brandsCtx = useContext(BrandsContext);
    const userCtx = useContext(UserContext);
    const isAdmin = userCtx.isAdmin;

    useEffect(() => {
        setFormData(editedVehicle ? { ...EMPTY_FORM, ...editedVehicle } : EMPTY_FORM);
        setErrors({});
    }, [editedVehicle]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    // Single submit path: the button is the submit button of the form, so the
    // handler no longer fires twice (once from onClick, once from the form).
    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = validate(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSaving(true);
        try {
            if (isEdit) {
                await updateVehicle(editedVehicle.id, formData);
                setFeedback({ severity: 'success', message: 'Vehicle updated' });
            } else {
                await addVehicle(formData);
                setFeedback({ severity: 'success', message: 'Vehicle added' });
                setFormData(EMPTY_FORM);
            }
        } catch (error) {
            setFeedback({ severity: 'error', message: describeError(error, 'Saving failed') });
        } finally {
            setIsSaving(false);
        }
    };

    async function handleDelete() {
        setConfirmDelete(false);
        setIsSaving(true);
        try {
            await deleteVehicle(editedVehicle.id);
            // Back to the list, which refetches and drops the deleted row.
            navigate('/', { replace: true });
        } catch (error) {
            setFeedback({ severity: 'error', message: describeError(error, 'Deleting failed') });
        } finally {
            setIsSaving(false);
        }
    }

    return (
        <Container maxWidth="md" sx={{ py: 3 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                {isEdit ? 'Edit vehicle' : 'Add vehicle'}
            </Typography>

            {!isAdmin && (
                <Alert severity="info" sx={{ mb: 2 }}>
                    You are signed in as <strong>{userCtx.user.username}</strong>. Log in with an
                    admin account to change vehicle data.
                </Alert>
            )}

            <Card variant="outlined">
                <CardContent>
                    <Box component="form" onSubmit={handleSubmit} noValidate>
                        <Stack spacing={2}>
                            <TextField
                                select
                                label="Brand"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                error={Boolean(errors.brand)}
                                helperText={errors.brand}
                                disabled={!isAdmin}
                                fullWidth
                            >
                                {brandsCtx.brands.map((item) => (
                                    <MenuItem key={item.id} value={item.id}>
                                        {item.brand}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                label="Model"
                                name="model"
                                value={formData.model}
                                onChange={handleChange}
                                error={Boolean(errors.model)}
                                helperText={errors.model}
                                disabled={!isAdmin}
                                fullWidth
                            />

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    label="Year"
                                    name="year"
                                    type="number"
                                    value={formData.year}
                                    onChange={handleChange}
                                    error={Boolean(errors.year)}
                                    helperText={errors.year}
                                    disabled={!isAdmin}
                                    fullWidth
                                />
                                <TextField
                                    label="Price (EUR)"
                                    name="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={handleChange}
                                    error={Boolean(errors.price)}
                                    helperText={errors.price}
                                    disabled={!isAdmin}
                                    fullWidth
                                />
                            </Stack>

                            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                <TextField
                                    select
                                    label="Fuel type"
                                    name="fuel_type"
                                    value={formData.fuel_type}
                                    onChange={handleChange}
                                    error={Boolean(errors.fuel_type)}
                                    helperText={errors.fuel_type}
                                    disabled={!isAdmin}
                                    fullWidth
                                >
                                    {FUEL_TYPES.map((item) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.type}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField
                                    label="Doors"
                                    name="doors"
                                    type="number"
                                    value={formData.doors}
                                    onChange={handleChange}
                                    error={Boolean(errors.doors)}
                                    helperText={errors.doors}
                                    disabled={!isAdmin}
                                    fullWidth
                                />
                            </Stack>

                            <TextField
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                disabled={!isAdmin}
                                multiline
                                minRows={4}
                                fullWidth
                            />

                            <TextField
                                label="Image URL"
                                name="image_url"
                                value={formData.image_url}
                                onChange={handleChange}
                                disabled={!isAdmin}
                                fullWidth
                            />

                            <Stack direction="row" spacing={2}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    disabled={!isAdmin || isSaving}
                                    startIcon={
                                        isSaving
                                            ? <CircularProgress size={18} color="inherit" />
                                            : <SaveIcon />
                                    }
                                >
                                    {isEdit ? 'Save changes' : 'Add vehicle'}
                                </Button>

                                {isEdit && (
                                    <Button
                                        type="button"
                                        variant="outlined"
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        disabled={!isAdmin || isSaving}
                                        onClick={() => setConfirmDelete(true)}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </Stack>
                        </Stack>
                    </Box>
                </CardContent>
            </Card>

            <Dialog open={confirmDelete} onClose={() => setConfirmDelete(false)}>
                <DialogTitle>Delete this vehicle?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {formData.model} will be permanently removed. This cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDelete(false)}>Cancel</Button>
                    <Button color="error" variant="contained" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                open={Boolean(feedback)}
                autoHideDuration={6000}
                onClose={() => setFeedback(null)}
            >
                {/* Severity comes from the result, not from parsing the message text. */}
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
}

export default Admin;
