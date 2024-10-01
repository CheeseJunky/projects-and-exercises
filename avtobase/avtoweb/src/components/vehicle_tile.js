import React from "react";

const VehicleListTile = ({ vehicle }) => {
    return (
        <div className="vehicle-list-tile">
            <h2>{vehicle.brand}</h2>
            <label>{vehicle.model}</label>
            <label>{vehicle.price}</label>
        </div>
    );
};

export default VehicleListTile;