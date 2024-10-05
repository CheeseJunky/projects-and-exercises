import BrandsContextProvider from "./brands-context";
import UserContextProvider from "./user-context";
import VehiclesContextProvider from "./vehicles-context";

export function DataProviders({ children }) {
    return (
        <BrandsContextProvider>
            <VehiclesContextProvider>
                <UserContextProvider>
                    {children}
                </UserContextProvider>
            </VehiclesContextProvider>
        </BrandsContextProvider>
    );
}