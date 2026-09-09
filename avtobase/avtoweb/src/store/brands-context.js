import { createContext, useCallback, useMemo, useState } from "react";

export const BrandsContext = createContext({
    brands: [],
    isFetched: false,
    setBrands: (brands) => { },
    getBrandName: (brandId) => '',
});

function BrandsContextProvider({ children }) {
    const [brandList, setBrandList] = useState([]);
    const [isFetched, setIsFetched] = useState(false);

    const setBrands = useCallback((newBrands) => {
        const brands = Array.isArray(newBrands) ? newBrands : [];
        setBrandList(brands);
        // The fetch is done regardless of how many rows came back; deriving this
        // from the previous state was always one render behind.
        setIsFetched(true);
    }, []);

    // Lookup map so the list/tiles do not run a linear search per vehicle.
    const brandsById = useMemo(() => {
        const map = new Map();
        brandList.forEach((brand) => map.set(brand.id, brand.brand));
        return map;
    }, [brandList]);

    const getBrandName = useCallback(
        (brandId) => brandsById.get(brandId) ?? 'Unknown brand',
        [brandsById],
    );

    const value = useMemo(
        () => ({ brands: brandList, isFetched, setBrands, getBrandName }),
        [brandList, isFetched, setBrands, getBrandName],
    );

    return <BrandsContext.Provider value={value}>
        {children}
    </BrandsContext.Provider>
}

export default BrandsContextProvider;
