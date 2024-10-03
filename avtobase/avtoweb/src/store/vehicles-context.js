import { createContext, useState } from "react";

export const VehiclesContext = createContext({
    vehicles: [],
    setVehicles: (vehicles) => { },
});

function VehiclesContextProvider({ children }) {
    const [vehicleList, setVehicleList] = useState([]);

    function setVehicles(newVehicles) {
        setVehicleList(newVehicles);
    }

    const value = {
        vehicles: vehicleList,
        setVehicles: setVehicles,
    }

    return <VehiclesContext.Provider value={value}>
        {children}
    </VehiclesContext.Provider>
}

export default VehiclesContextProvider;