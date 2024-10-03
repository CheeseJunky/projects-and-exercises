import { useContext, useEffect } from 'react';
import TextButton from '../components/buttons/text_button';
import BrandList from '../components/filter/brand_list';
import PriceRangeFilter from '../components/filter/price_range_filter';
import SortOptions from '../components/sort_options';
import VehicleList from '../components/vehicle_list';
import { getBrands, getVehicles } from '../util/http';
import { BrandsContext } from '../store/brands-context';
import { VehiclesContext } from '../store/vehicles-context';

export const Home = () => {
    const brandsCtx = useContext(BrandsContext);
    const vehiclesCtx = useContext(VehiclesContext);

    function submitFilterHandler() {
        console.log("Filter clicked")
        // TODO: add is fetched to vehicles
        // TODO: save filter in context?
    }

    // get brand list from server
    useEffect(() => {   // dont make useEffect into async
        async function fetchBrands() {
            const brands = await getBrands();
            brandsCtx.setIsFetched(true);
            brandsCtx.setBrands(brands);
        }

        if (!brandsCtx.isFetched) {
            fetchBrands();
        }
    }, [brandsCtx.isFetched]);

    useEffect(() => {   // dont make useEffect into async
        async function fetchVehicles() {
            const vehicles = await getVehicles({});
            vehiclesCtx.setVehicles(vehicles);
        }

        fetchVehicles();
    }, []);

    return (
        <div className='container'>
            <div className='filter-area'>
                <BrandList brands={brandsCtx.brands} />
                <PriceRangeFilter />
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
}