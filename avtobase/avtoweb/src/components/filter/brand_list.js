import React, { useState } from 'react';
import '../../styles/styles.css';
import { Checkbox, FormControlLabel } from '@mui/material';

const BrandList = ({ brands, onCheckedItemsChange }) => {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheckboxChange = (event, itemId) => {
    const isChecked = event.target.checked;
    const newCheckedItems = isChecked
      ? [...checkedItems, itemId]
      : checkedItems.filter(item => item !== itemId);

    setCheckedItems(newCheckedItems);
    onCheckedItemsChange(newCheckedItems);
  };

  return (
    <ul className='brand-list'>
      {brands.map((brand) => (
        <li key={brand.id}>
          <div className='brand-list-item'>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems.includes(brand.id)}
                  onChange={(event) => handleCheckboxChange(event, brand.id)}
                />
              }
              label={brand.brand}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BrandList;