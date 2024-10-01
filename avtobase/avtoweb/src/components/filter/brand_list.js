import React, { useState } from 'react';
import '../../styles/styles.css';

const BrandList = ({ brands }) => {
  const [checkedItems, setCheckedItems] = useState([]);

  function handleCheckboxChange(event, itemId) {
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedItems([...checkedItems, itemId]);
    } else {
      setCheckedItems(checkedItems.filter(item => item !== itemId));
    }
  }

  return (
    <ul className='brand-list'>
      {brands.map((brand) => (
        <li key={brand.id}>
          <div className='brand-list-item'>
            <input
              type='checkbox'
              id={`brand-item-${brand.id}`}
              name={brand.brand}
              value={brand.brand}
              checked={checkedItems.includes(brand.id)}
              onChange={(event) => handleCheckboxChange(event, brand.id)}
            />
            <label htmlFor={`brand-item-${brand.id}`}>{brand.brand}</label>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BrandList;