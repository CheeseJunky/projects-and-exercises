import { useCallback, useContext, useEffect, useState } from 'react';
import {
    Alert,
    Box,
    Button,
    Container,
    Paper,
    Snackbar,
    Stack,
} from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

import BrandList from '../components/filter/brand_list';
import PriceRangeFilter from '../components/filter/price_range_filter';
import SortOptions from '../components/sort_options';
import VehicleList from '../components/vehicle_list';
import { describeError, getBrands, getVehicles } from '../util/http';
import { BrandsContext } from '../store/brands-context';
import { VehiclesContext } from '../store/vehicles-context';

const EMPTY_FILTER = { fromPrice: '', toPrice: '', checkedBrands: [] };

export const Home = () => {
    const [filterState, setFilterState] = useState(EMPTY_FILTER);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOption, setSortOption] = useState(null);

    const brandsCtx = useContext(BrandsContext);
    const vehiclesCtx = useContext(VehiclesContext);
    const { setBrands, isFetched: brandsFetched } = brandsCtx;
    const { setVehicles } = vehiclesCtx;

    const handleFromPriceChange = (event) => {
        setFilterState((prev) => ({ ...prev, fromPrice: event.target.value }));
    };
    const handleToPriceChange = (event) => {
        setFilterState((prev) => ({ ...prev, toPrice: event.target.value }));
    };
    const handleBrandSelectionChange = (newCheckedItems) => {
        setFilterState((prev) => ({ ...prev, checkedBrands: newCheckedItems }));
    };

    const loadVehicles = useCallback(async (filter) => {
        setIsLoading(true);
        setError(null);
        try {
            setVehicles(await getVehicles(filter));
        } catch (err) {
            setError(describeError(err, 'Could not load vehicles'));
            setVehicles([]);
        } finally {
            setIsLoading(false);
        }
    }, [setVehicles]);

    // Brands are shared app-wide, so only fetch them once per session.
    useEffect(() => {
        if (brandsFetched) {
            return;
        }
        let cancelled = false;

        (async () => {
            try {
                const brands = await getBrands();
                if (!cancelled) {
                    setBrands(brands);
                }
            } catch (err) {
                if (!cancelled) {
                    setError(describeError(err, 'Could not load brands'));
                }
            }
        })();

        return () => { cancelled = true; };
    }, [brandsFetched, setBrands]);

    useEffect(() => {
        loadVehicles({});
    }, [loadVehicles]);

    function submitFilterHandler() {
        loadVehicles(filterState);
    }

    function resetFilterHandler() {
        setFilterState(EMPTY_FILTER);
        loadVehicles({});
    }

    const isRangeInvalid =
        filterState.fromPrice !== '' &&
        filterState.toPrice !== '' &&
        Number(filterState.fromPrice) > Number(filterState.toPrice);

    return (
        <Container maxWidth="xl" sx={{ py: 3 }}>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={2}
                alignItems="flex-start"
            >
                {/* filters */}
                <Paper
                    variant="outlined"
                    sx={{
                        p: 2,
                        width: { xs: '100%', md: 280 },
                        flexShrink: 0,
                        position: { md: 'sticky' },
                        top: { md: 80 },
                        maxHeight: { md: 'calc(100vh - 100px)' },
                        overflowY: 'auto',
                    }}
                >
                    <Stack spacing={2}>
                        <BrandList
                            brands={brandsCtx.brands}
                            checkedBrands={filterState.checkedBrands}
                            onCheckedItemsChange={handleBrandSelectionChange}
                            loading={!brandsFetched}
                        />
                        <PriceRangeFilter
                            fromPrice={filterState.fromPrice}
                            toPrice={filterState.toPrice}
                            onFromPriceChange={handleFromPriceChange}
                            onToPriceChange={handleToPriceChange}
                        />
                        <Stack direction="row" spacing={1}>
                            <Button
                                variant="contained"
                                startIcon={<FilterAltIcon />}
                                disabled={isRangeInvalid || isLoading}
                                onClick={submitFilterHandler}
                                fullWidth
                            >
                                Filter
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<RestartAltIcon />}
                                onClick={resetFilterHandler}
                                disabled={isLoading}
                            >
                                Reset
                            </Button>
                        </Stack>
                    </Stack>
                </Paper>

                {/* results */}
                <Box sx={{ flexGrow: 1, minWidth: 0, width: '100%' }}>
                    <VehicleList
                        vehicles={vehiclesCtx.vehicles}
                        sortOption={sortOption}
                        loading={isLoading}
                    />
                </Box>

                {/* sorting */}
                <Box sx={{ width: { xs: '100%', md: 240 }, flexShrink: 0 }}>
                    <SortOptions
                        selectedOption={sortOption}
                        onOptionChange={setSortOption}
                    />
                </Box>
            </Stack>

            <Snackbar
                open={Boolean(error)}
                autoHideDuration={6000}
                onClose={() => setError(null)}
            >
                <Alert severity="error" onClose={() => setError(null)} variant="filled">
                    {error}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default Home;
