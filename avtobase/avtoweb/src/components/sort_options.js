import React from 'react';
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

import { SORT_OPTIONS } from '../util/constants';

// Named options instead of magic numbers, so the list and this widget cannot
// drift apart when an entry is inserted.
const options = [
    { id: SORT_OPTIONS.PRICE_ASC, label: 'Cheaper first', icon: <ArrowUpwardIcon /> },
    { id: SORT_OPTIONS.PRICE_DESC, label: 'Expensive first', icon: <ArrowDownwardIcon /> },
    { id: SORT_OPTIONS.BRAND_ASC, label: 'Brand A - Z', icon: <SortByAlphaIcon /> },
    { id: SORT_OPTIONS.BRAND_DESC, label: 'Brand Z - A', icon: <SortByAlphaIcon /> },
    { id: SORT_OPTIONS.YEAR_DESC, label: 'Newer first', icon: <ArrowDownwardIcon /> },
    { id: SORT_OPTIONS.YEAR_ASC, label: 'Older first', icon: <ArrowUpwardIcon /> },
];

const SortOptions = ({ selectedOption, onOptionChange }) => {
    return (
        <Paper variant="outlined" sx={{ p: 1.5 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>
                Sort by
            </Typography>

            <List disablePadding>
                {options.map((option) => (
                    <ListItemButton
                        key={option.id}
                        selected={selectedOption === option.id}
                        // Clicking the active option clears the sorting again.
                        onClick={() =>
                            onOptionChange(selectedOption === option.id ? null : option.id)
                        }
                        sx={{ borderRadius: 1, mb: 0.5 }}
                    >
                        <ListItemIcon sx={{ minWidth: 36 }}>{option.icon}</ListItemIcon>
                        <ListItemText primary={option.label} />
                    </ListItemButton>
                ))}
            </List>
        </Paper>
    );
};

export default SortOptions;
