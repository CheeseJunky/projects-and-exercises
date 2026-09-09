import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Stack,
    Typography,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import SensorDoorIcon from '@mui/icons-material/SensorDoor';

import { BrandsContext } from "../store/brands-context";
import { formatPrice, fuelTypeName } from "../util/constants";

const FALLBACK_IMAGE =
    'data:image/svg+xml;utf8,' +
    encodeURIComponent(
        `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200">
            <rect width="100%" height="100%" fill="#ece3f5"/>
            <text x="50%" y="50%" fill="#7b3fbf" font-family="sans-serif"
                  font-size="16" text-anchor="middle">Image unavailable</text>
        </svg>`,
    );

const VehicleListTile = ({ vehicle }) => {
    const navigate = useNavigate();
    const brandsCtx = useContext(BrandsContext);
    // Safe lookup: vehicles can arrive before the brand list does, and the old
    // `.find(...).brand` threw a TypeError in that window.
    const brandName = brandsCtx.getBrandName(vehicle.brand);

    function handleTileClick() {
        navigate('/details', { state: vehicle });
    }

    return (
        <Card variant="outlined">
            <CardActionArea onClick={handleTileClick}>
                <CardMedia
                    component="img"
                    alt={`${brandName} ${vehicle.model}`}
                    height="220"
                    image={vehicle.image_url || FALLBACK_IMAGE}
                    onError={(event) => { event.target.src = FALLBACK_IMAGE; }}
                    sx={{ objectFit: 'cover', bgcolor: 'action.hover' }}
                />
                <CardContent>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="baseline"
                        spacing={1}
                    >
                        <Typography variant="h6" component="h2">
                            {brandName} {vehicle.model}
                        </Typography>
                        <Typography variant="h6" color="primary" sx={{ whiteSpace: 'nowrap' }}>
                            {formatPrice(vehicle.price)}
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={1} sx={{ my: 1.5 }} flexWrap="wrap" useFlexGap>
                        <Chip size="small" icon={<CalendarMonthIcon />} label={vehicle.year} />
                        <Chip
                            size="small"
                            icon={<LocalGasStationIcon />}
                            label={fuelTypeName(vehicle.fuel_type)}
                        />
                        <Chip
                            size="small"
                            icon={<SensorDoorIcon />}
                            label={`${vehicle.doors} doors`}
                        />
                    </Stack>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }}
                    >
                        {vehicle.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default VehicleListTile;
