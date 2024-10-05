import React, { useContext } from 'react';
import '../styles/styles.css';
import VehicleListTile from './vehicle_tile';
import { BrandsContext } from '../store/brands-context';
import { Box } from '@mui/material';

const VehicleList = ({ vehicles, sortOption }) => {
  const sortedVehicles = vehicles.slice();
  const brandsCtx = useContext(BrandsContext);

  switch (sortOption) {
    case 0: // Cheaper first
      sortedVehicles.sort((a, b) => a.price - b.price);
      break;
    case 1: // Expensive first
      sortedVehicles.sort((a, b) => b.price - a.price);
      break;
    case 2: // Brand A - Z
      sortedVehicles.sort((a, b) => {
        const brandA = brandsCtx.brands.find(brand => brand.id === a.brand);
        const brandB = brandsCtx.brands.find(brand => brand.id === b.brand);

        // check if both brand ids are inside brandlist
        if (!brandA || !brandB) {
          return 0;
        }

        return brandA.brand.localeCompare(brandB.brand);
      });
      break;
    case 3: // Brand Z - A
      sortedVehicles.sort((a, b) => {
        const brandA = brandsCtx.brands.find(brand => brand.id === a.brand);
        const brandB = brandsCtx.brands.find(brand => brand.id === b.brand);

        // check if both brand ids are inside brandlist
        if (!brandA || !brandB) {
          return 0;
        }

        return brandB.brand.localeCompare(brandA.brand);
      });
      break;
    case 4: // Newer first
      sortedVehicles.sort((a, b) => b.year - a.year);
      break;
    case 5: // Older first
      sortedVehicles.sort((a, b) => a.year - b.year);
      break;
    default:
      break;
  }

  return (
    <ul className='vehicle-list'>
      {sortedVehicles.map((item) => (
        <>
          <VehicleListTile key={item.id} vehicle={item} />
          <Box height={10}></Box>
        </>
      ))}
    </ul>
  );
};

export default VehicleList;