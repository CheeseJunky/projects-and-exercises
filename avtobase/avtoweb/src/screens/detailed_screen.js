import { useLocation, useNavigate } from "react-router-dom"
import { BrandsContext } from "../store/brands-context";
import { useContext } from "react";
import { Button } from "@mui/material";
import { UserContext } from "../store/user-context";

export const DetailedScreen = () => {
    const location = useLocation();
    const vehicle = location.state;

    const brandsCtx = useContext(BrandsContext);
    // get name of the brand from brands array
    const brandName = brandsCtx.brands.find(brand => brand.id === vehicle.brand).brand;

    const navigate = useNavigate();
    function handleEditClick() {
        navigate('/admin', { state: vehicle });
    }

    // check users role and disable admin buttons
    // role -> normal = 0, admin = 1
    const userCtx = useContext(UserContext);
    const isAdmin = userCtx.user.role === 1;

    return (
        <div className="container">
            <div style={{
                display: "flex",
                flexDirection: "column"
            }}>
                <div className='vehicle-details'>

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

                    {/* image */}
                    <div>
                        <img
                            style={{
                                marginTop: 10,
                                height: 400,
                                objectFit: "contain"
                            }}
                            src={vehicle.image_url}
                            alt="Image of the car failed to load"
                        />
                    </div>

                    {/* other info */}
                    <div>
                        <div className="info-group">
                            <label className="info-label">Price:</label>
                            <label className="info-value">{vehicle.price}€</label>
                        </div>

                        <div className="info-group">
                            <label className="info-label">Year:</label>
                            <label className="info-value">{vehicle.year}</label>
                        </div>

                        <div className="info-group">
                            <label className="info-label">Fuel Type:</label>
                            <label className="info-value">{vehicle.fuel_type}</label>
                        </div>

                        <div className="info-group">
                            <label className="info-label">Doors:</label>
                            <label className="info-value">{vehicle.doors}</label>
                        </div>

                        <div className="info-group">
                            <label className="info-label">Description:</label>
                            <label className="info-description">{vehicle.description}</label>
                        </div>
                    </div>

                </div>
                <div>
                    <Button
                        variant='contained'
                        color="secondary"
                        disabled={!isAdmin}
                        style={{
                            marginLeft: 10,
                            marginRight: 10,
                        }}
                        onClick={handleEditClick}
                    >
                        Edit
                    </Button>
                </div>
            </div>
        </div>
    );
}