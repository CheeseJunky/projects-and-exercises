import React, { useContext, useMemo } from 'react';
import { Alert, Skeleton, Stack } from '@mui/material';

import VehicleListTile from './vehicle_tile';
import { BrandsContext } from '../store/brands-context';
import { SORT_OPTIONS } from '../util/constants';

const VehicleList = ({ vehicles, sortOption, loading = false }) => {
  const brandsCtx = useContext(BrandsContext);
  const { getBrandName } = brandsCtx;

  // Sorting only has to run when the list or the option actually changes.
  const sortedVehicles = useMemo(() => {
    const list = vehicles.slice();

    switch (sortOption) {
      case SORT_OPTIONS.PRICE_ASC:
        return list.sort((a, b) => a.price - b.price);
      case SORT_OPTIONS.PRICE_DESC:
        return list.sort((a, b) => b.price - a.price);
      case SORT_OPTIONS.BRAND_ASC:
        return list.sort((a, b) => getBrandName(a.brand).localeCompare(getBrandName(b.brand)));
      case SORT_OPTIONS.BRAND_DESC:
        return list.sort((a, b) => getBrandName(b.brand).localeCompare(getBrandName(a.brand)));
      case SORT_OPTIONS.YEAR_DESC:
        return list.sort((a, b) => b.year - a.year);
      case SORT_OPTIONS.YEAR_ASC:
        return list.sort((a, b) => a.year - b.year);
      default:
        return list;
    }
  }, [vehicles, sortOption, getBrandName]);

  if (loading) {
    return (
      <Stack spacing={1.5} sx={{ width: '100%' }}>
        {[...Array(4)].map((_, index) => (
          <Skeleton key={index} variant="rounded" height={320} />
        ))}
      </Stack>
    );
  }

  if (sortedVehicles.length === 0) {
    return (
      <Alert severity="info" sx={{ width: '100%' }}>
        No vehicles match the current filter.
      </Alert>
    );
  }

  return (
    // The key belongs on the outermost element of each iteration; the previous
    // fragment wrapper swallowed it and React re-created every tile.
    <Stack spacing={1.5} sx={{ width: '100%' }}>
      {sortedVehicles.map((item) => (
        <VehicleListTile key={item.id} vehicle={item} />
      ))}
    </Stack>
  );
};

export default VehicleList;
