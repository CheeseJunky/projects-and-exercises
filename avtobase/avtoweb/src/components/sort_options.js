import React from 'react';
import '../styles/styles.css';
import { ExpandLess, ExpandMore, SortByAlpha } from '@mui/icons-material';

const SortOptions = ({ }) => {
    function handleSortOption(option) {
        console.log("sort option: " + option);
    }

    return (
        <ul className='sort-options'>
            <li key="cheaper-first" onClick={() => { handleSortOption(0) }}>
                <ExpandLess />
                <label>Cheaper first</label>
            </li>
            <li key="expensive-first" onClick={() => { handleSortOption(1) }}>
                <ExpandMore />
                <label>Expensive first</label>
            </li>
            <li key="brand-a" onClick={() => { handleSortOption(2) }}>
                <SortByAlpha />
                <label>Brand A - Z</label>
            </li>
            <li key="brand-z" onClick={() => { handleSortOption(3) }}>
                <SortByAlpha />
                <label>Brand Z - A</label>
            </li>
            <li key="year-new" onClick={() => { handleSortOption(4) }}>
                <ExpandMore />
                <label>Newer first</label>
            </li>
            <li key="year-old" onClick={() => { handleSortOption(5) }}>
                <ExpandLess />
                <label>Older first</label>
            </li>
        </ul>
    );
};

export default SortOptions;