import { useContext, useEffect, useState } from 'react';
import BrandList from '../components/filter/brand_list';
import PriceRangeFilter from '../components/filter/price_range_filter';
import SortOptions from '../components/sort_options';
import VehicleList from '../components/vehicle_list';
import { getBrands, getVehicles } from '../util/http';
import { BrandsContext } from '../store/brands-context';
import { VehiclesContext } from '../store/vehicles-context';
import { Button } from '@mui/material';

export const Home = () => {
    const [filterState, setFilterState] = useState({
        fromPrice: '',
        toPrice: '',
        checkedBrands: [],
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

    // get data for brands/vehicles from server
    useEffect(() => {
        async function fetchBrands() {
            var brands = await getBrands();
            brandsCtx.setBrands(brands);
        }
        fetchBrands();

        async function fetchVehicles() {
            const vehicles = await getVehicles({});
            vehiclesCtx.setVehicles(vehicles);
        }
        fetchVehicles();

    }, []);

    const [sortOption, setSortOption] = useState(null);
    const handleSortOptionChange = (option) => {
        setSortOption(option);
    };

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
                <Button
                    variant='contained'
                    color="secondary"
                    style={{
                        marginLeft: 10,
                        marginRight: 10,
                    }}
                    onClick={submitFilterHandler}
                >
                    Filter
                </Button>
            </div>
            <div className='middle-area'>
                <VehicleList vehicles={vehiclesCtx.vehicles} sortOption={sortOption} />
            </div>
            <div className='sort-area'>
                <SortOptions onOptionChange={handleSortOptionChange} />
            </div>
        </div>
    );
};