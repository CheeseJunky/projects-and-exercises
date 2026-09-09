import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    Container,
    Divider,
    Stack,
    Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";

import { BrandsContext } from "../store/brands-context";
import { UserContext } from "../store/user-context";
import { formatPrice, fuelTypeName } from "../util/constants";

function DetailRow({ label, value }) {
    return (
        <Stack direction="row" spacing={2} sx={{ py: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, minWidth: 120 }}>
                {label}
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap' }}>
                {value}
            </Typography>
        </Stack>
    );
}

export const DetailedScreen = () => {
    const location = useLocation();
    const vehicle = location.state;
    const navigate = useNavigate();

    const brandsCtx = useContext(BrandsContext);
    const userCtx = useContext(UserContext);

    // Opening /details directly (refresh, bookmark) leaves the router state
    // empty, which used to crash on the brand lookup.
    if (!vehicle) {
        return (
            <Container maxWidth="md" sx={{ py: 3 }}>
                <Alert
                    severity="warning"
                    action={
                        <Button color="inherit" size="small" onClick={() => navigate('/')}>
                            Back to list
                        </Button>
                    }
                >
                    No vehicle selected. Pick one from the list first.
                </Alert>
            </Container>
        );
    }

    const brandName = brandsCtx.getBrandName(vehicle.brand);

    return (
        <Container maxWidth="md" sx={{ py: 3 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                sx={{ mb: 2 }}
            >
                Back
            </Button>

            <Card variant="outlined">
                <CardMedia
                    component="img"
                    height="400"
                    image={vehicle.image_url}
                    alt={`${brandName} ${vehicle.model}`}
                    sx={{ objectFit: 'contain', bgcolor: 'action.hover' }}
                />
                <CardContent>
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        justifyContent="space-between"
                        alignItems={{ sm: 'baseline' }}
                        spacing={1}
                    >
                        <Typography variant="h4" component="h1">
                            {brandName}{' '}
                            <Typography variant="h5" component="span" color="text.secondary">
                                {vehicle.model}
                            </Typography>
                        </Typography>
                        <Typography variant="h4" color="primary">
                            {formatPrice(vehicle.price)}
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap" useFlexGap>
                        <Chip label={vehicle.year} />
                        {/* fuel_type is a foreign key; show the name, not the id. */}
                        <Chip label={fuelTypeName(vehicle.fuel_type)} />
                        <Chip label={`${vehicle.doors} doors`} />
                    </Stack>

                    <Divider sx={{ my: 2 }} />

                    <Box>
                        <DetailRow label="Year" value={vehicle.year} />
                        <DetailRow label="Fuel type" value={fuelTypeName(vehicle.fuel_type)} />
                        <DetailRow label="Doors" value={vehicle.doors} />
                        <DetailRow label="Description" value={vehicle.description} />
                    </Box>

                    {userCtx.isAdmin && (
                        <Button
                            variant="contained"
                            startIcon={<EditIcon />}
                            onClick={() => navigate('/admin', { state: vehicle })}
                            sx={{ mt: 2 }}
                        >
                            Edit
                        </Button>
                    )}
                </CardContent>
            </Card>
        </Container>
    );
}

export default DetailedScreen;
