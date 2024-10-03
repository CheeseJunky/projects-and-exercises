import BrandsContextProvider from "./brands-context";
import VehiclesContextProvider from "./vehicles-context";

export function DataProviders({ children }) {
    return (
        <BrandsContextProvider>
            <VehiclesContextProvider>
                {children}
            </VehiclesContextProvider>
        </BrandsContextProvider>
    );
}