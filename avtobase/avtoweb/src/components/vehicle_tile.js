import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BrandsContext } from "../store/brands-context";

const VehicleListTile = ({ vehicle }) => {
    const navigate = useNavigate();
    const brandsCtx = useContext(BrandsContext);
    // get name of the brand from brands array
    const brandName = brandsCtx.brands.find(brand => brand.id === vehicle.brand).brand;

    function handlerTileClick() {
        navigate('details', { state: vehicle });
    }

    return (
        <div className="vehicle-list-tile" onClick={handlerTileClick}>

            {/* name + model */}
            <div style={{
                display: "flex",
                flexDirection: "row"
            }}>
                <label style={{
                    fontWeight: "bold",
                    fontSize: 30,
                    marginRight: 10,
                }}>
                    {brandName}
                </label>
                <label style={{
                    fontWeight: "bold",
                    fontSize: 24,
                    display: "flex",
                    alignItems: "flex-end"
                }}>
                    {vehicle.model}
                </label>
            </div>

            {/* info container */}
            <div style={{
                display: "flex",
                flexDirection: "row"
            }}>
                {/* image */}
                <img
                    style={{
                        marginTop: 10,
                        height: 200,
                        objectFit: "contain"
                    }}
                    src={vehicle.image_url}
                    alt="Image of the car failed to load"
                />

                {/* other data */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 1
                }}>

                    <div className="info-group">
                        <label className="info-label">Price:</label>
                        <label className="info-value">{vehicle.price}</label>
                    </div>

                    <div className="info-group">
                        <label className="info-label">Year:</label>
                        <label className="info-value">{vehicle.year}</label>
                    </div>

                    <div className="info-group">
                        <label className="info-label">Description:</label>
                        <label className="info-description">{vehicle.description}</label>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default VehicleListTile;