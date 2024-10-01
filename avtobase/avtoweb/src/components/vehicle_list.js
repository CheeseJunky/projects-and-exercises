import React from 'react';
import '../styles/styles.css';
import VehicleListTile from './vehicle_tile';

const VehicleList = ({ vehicles }) => {

  return (
    <ul className='vehicle-list'>
      {vehicles.map((item) => (
        <VehicleListTile vehicle={item} />
      ))}
    </ul>
  );
};

export default VehicleList;