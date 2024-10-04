import { createContext, useState } from "react";

export const BrandsContext = createContext({
    brands: [],
    isFetched: false,
    setBrands: (brands) => { },
    setIsFetched: (isDone) => { },
});

function BrandsContextProvider({ children }) {
    const [brandList, setBrandList] = useState([]);
    const [isDataFetched, setIsDataDetched] = useState(false);

    function setBrands(newBrands) {
        setBrandList(newBrands);
        if (brands.length > 0) {
            setIsDataFetched(true);
        }
    }

    function setIsDataFetched(isDone) {
        setIsDataDetched(isDone);
    }

    const value = {
        brands: brandList,
        isFetched: isDataFetched,
        setBrands: setBrands,
        setIsFetched: setIsDataFetched
    }

    return <BrandsContext.Provider value={value}>
        {children}
    </BrandsContext.Provider>
}

export default BrandsContextProvider;