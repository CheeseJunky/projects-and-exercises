import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BrandsContext } from "../store/brands-context";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';

const VehicleListTile = ({ vehicle }) => {
    const navigate = useNavigate();
    const brandsCtx = useContext(BrandsContext);
    // get name of the brand from brands array
    const brandName = brandsCtx.brands.find(brand => brand.id === vehicle.brand).brand;

    function handlerTileClick() {
        navigate('details', { state: vehicle });
    }

    return (
        <Card variant="outlined" onClick={handlerTileClick}>
            <CardContent>
                <Typography variant="h5">
                    {brandName} {vehicle.model}
                </Typography>
                <CardMedia
                    component="img"
                    alt="Image of the car failed to load"
                    height="200"
                    image={vehicle.image_url}
                />
                <div className="info-group">
                    <Typography variant="body2">Price: {vehicle.price}</Typography>
                </div>
                <div className="info-group">
                    <Typography variant="body2">Year: {vehicle.year}</Typography>
                </div>
                <div className="info-group">
                    <Typography variant="body2">Description: {vehicle.description}</Typography>
                </div>
            </CardContent>
        </Card>
    );
};

export default VehicleListTile;