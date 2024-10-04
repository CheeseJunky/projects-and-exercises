import { useContext, useEffect, useState } from 'react';
import TextButton from '../components/buttons/text_button';
import BrandList from '../components/filter/brand_list';
import PriceRangeFilter from '../components/filter/price_range_filter';
import SortOptions from '../components/sort_options';
import VehicleList from '../components/vehicle_list';
import { getBrands, getVehicles } from '../util/http';
import { BrandsContext } from '../store/brands-context';
import { VehiclesContext } from '../store/vehicles-context';

export const Home = () => {
    const [filterState, setFilterState] = useState({
        fromPrice: '',
        toPrice: '',
        checkedBrands: [], // Store checked brands here
    });

    const brandsCtx = useContext(BrandsContext);
    const vehiclesCtx = useContext(VehiclesContext);

    const handleFromPriceChange = (event) => {
        setFilterState({ ...filterState, fromPrice: event.target.value });
    };
    const handleToPriceChange = (event) => {
        setFilterState({ ...filterState, toPrice: event.target.value });
    };

    const handleBrandSelectionChange = (newCheckedItems) => {
        setFilterState({ ...filterState, checkedBrands: newCheckedItems });
    };

    async function submitFilterHandler() {
        const vehicles = await getVehicles(filterState);
        vehiclesCtx.setVehicles(vehicles);
    }

    // get brand list from server
    useEffect(() => {
        // TODO: fix double http send
        async function fetchBrands() {
            const brands = await getBrands();
            brandsCtx.setBrands(brands);
        }

        if (!brandsCtx.isFetched) {
            fetchBrands();
        }

        async function fetchVehicles() {
            const vehicles = await getVehicles({});
            vehiclesCtx.setVehicles(vehicles);
        }

        fetchVehicles();
    }, [brandsCtx.isFetched]);

    return (
        <div className='container'>
            <div className='filter-area'>
                <BrandList
                    brands={brandsCtx.brands}
                    onCheckedItemsChange={handleBrandSelectionChange}
                />
                <PriceRangeFilter
                    fromPrice={filterState.fromPrice}
                    toPrice={filterState.toPrice}
                    onFromPriceChange={handleFromPriceChange}
                    onToPriceChange={handleToPriceChange}
                />
                <TextButton label="Filter" onClick={submitFilterHandler} />
            </div>
            <div className='middle-area'>
                <VehicleList vehicles={vehiclesCtx.vehicles} />
            </div>
            <div className='sort-area'>
                <SortOptions />
            </div>
        </div>
    );
};