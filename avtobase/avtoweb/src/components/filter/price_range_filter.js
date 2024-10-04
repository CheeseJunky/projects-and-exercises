import React from 'react';

const PriceRangeFilter = ({ fromPrice, toPrice, onFromPriceChange, onToPriceChange }) => {
  return (
    <div className='price-range-filter'>
      <label style={{ fontWeight: "bold" }}>Price range</label>
      <label className='fromto-label'>From:</label>
      <input
        type="number"
        min="0"
        value={fromPrice}
        onChange={onFromPriceChange}
      />
      <label className='fromto-label'>To:</label>
      <input
        type="number"
        min="0"
        value={toPrice}
        onChange={onToPriceChange}
      />
    </div>
  );
};

export default PriceRangeFilter;