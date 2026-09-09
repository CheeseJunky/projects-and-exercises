import React from 'react';
import { InputAdornment, Stack, TextField, Typography } from '@mui/material';

const PriceRangeFilter = ({ fromPrice, toPrice, onFromPriceChange, onToPriceChange }) => {
  // Only flag the range when both ends are filled in.
  const hasInvalidRange =
    fromPrice !== '' && toPrice !== '' && Number(fromPrice) > Number(toPrice);

  const euro = { startAdornment: <InputAdornment position="start">€</InputAdornment> };

  return (
    <Stack spacing={1.5}>
      <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
        Price range
      </Typography>

      <TextField
        label="From"
        type="number"
        size="small"
        value={fromPrice}
        onChange={onFromPriceChange}
        error={hasInvalidRange}
        slotProps={{ input: euro, htmlInput: { min: 0 } }}
      />
      <TextField
        label="To"
        type="number"
        size="small"
        value={toPrice}
        onChange={onToPriceChange}
        error={hasInvalidRange}
        helperText={hasInvalidRange ? '"To" must be higher than "From"' : ' '}
        slotProps={{ input: euro, htmlInput: { min: 0 } }}
      />
    </Stack>
  );
};

export default PriceRangeFilter;
