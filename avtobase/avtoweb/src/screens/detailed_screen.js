import { useLocation, useNavigate } from "react-router-dom"
import TextButton from "../components/buttons/text_button";

export const DetailedScreen = () => {
    const location = useLocation();
    const vehicle = location.state;

    const navigate = useNavigate();
    console.log("img: " + vehicle.image_url);

    function handleEditClick() {
        navigate('/admin', { state: vehicle });
    }

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
                            {vehicle.brand}
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
                    <TextButton label="edit" onClick={handleEditClick} />
                </div>
            </div>
        </div>
    );
}