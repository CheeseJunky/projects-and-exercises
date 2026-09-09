import { createContext, useCallback, useMemo, useState } from "react";

export const VehiclesContext = createContext({
    vehicles: [],
    setVehicles: (vehicles) => { },
});

function VehiclesContextProvider({ children }) {
    const [vehicleList, setVehicleList] = useState([]);

    const setVehicles = useCallback((newVehicles) => {
        setVehicleList(Array.isArray(newVehicles) ? newVehicles : []);
    }, []);

    const value = useMemo(
        () => ({ vehicles: vehicleList, setVehicles }),
        [vehicleList, setVehicles],
    );

    return <VehiclesContext.Provider value={value}>
        {children}
    </VehiclesContext.Provider>
}

export default VehiclesContextProvider;
