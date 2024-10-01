import React, { useState } from 'react';

const PriceRangeFilter = () => {
  const [fromPrice, setFromPrice] = useState('');
  const [toPrice, setToPrice] = useState('');

  const handleFromPriceChange = (event) => {
    setFromPrice(event.target.value);
  };

  const handleToPriceChange = (event) => {
    setToPrice(event.target.value);
  };

  return (
    <div className='price-range-filter'>
      <label style={{ fontWeight: "bold" }}>Price range</label>
      <label className='fromto-label'>From:</label>
      <input
        type="number"
        value={fromPrice}
        onChange={handleFromPriceChange}
      />
      <label className='fromto-label'>To:</label>
      <input
        type="number"
        value={toPrice}
        onChange={handleToPriceChange}
      />
    </div>
  );
};

export default PriceRangeFilter;