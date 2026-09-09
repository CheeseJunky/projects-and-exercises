import React from 'react';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Skeleton,
  Typography,
} from '@mui/material';

// `checkedBrands` is owned by the screen so the checkboxes cannot drift out of
// sync with the filter that actually gets submitted.
const BrandList = ({ brands, checkedBrands, onCheckedItemsChange, loading = false }) => {
  const handleCheckboxChange = (event, brandId) => {
    const next = event.target.checked
      ? [...checkedBrands, brandId]
      : checkedBrands.filter((item) => item !== brandId);

    onCheckedItemsChange(next);
  };

  return (
    <>
      <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 0.5 }}>
        Brand
      </Typography>

      {loading && (
        <>
          {[...Array(6)].map((_, index) => (
            <Skeleton key={index} height={32} />
          ))}
        </>
      )}

      {!loading && brands.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          No brands available
        </Typography>
      )}

      <FormGroup>
        {brands.map((brand) => (
          <FormControlLabel
            key={brand.id}
            control={
              <Checkbox
                size="small"
                checked={checkedBrands.includes(brand.id)}
                onChange={(event) => handleCheckboxChange(event, brand.id)}
              />
            }
            label={brand.brand}
          />
        ))}
      </FormGroup>
    </>
  );
};

export default BrandList;
