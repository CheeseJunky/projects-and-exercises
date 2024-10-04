import React from 'react';
import '../styles/styles.css';
import { ExpandLess, ExpandMore, SortByAlpha } from '@mui/icons-material';

const SortOptions = ({ onOptionChange }) => {
    return (
        <ul className='sort-options'>
            <li key="cheaper-first" onClick={() => { onOptionChange(0) }}>
                <ExpandLess />
                <label>Cheaper first</label>
            </li>
            <li key="expensive-first" onClick={() => { onOptionChange(1) }}>
                <ExpandMore />
                <label>Expensive first</label>
            </li>
            <li key="brand-a" onClick={() => { onOptionChange(2) }}>
                <SortByAlpha />
                <label>Brand A - Z</label>
            </li>
            <li key="brand-z" onClick={() => { onOptionChange(3) }}>
                <SortByAlpha />
                <label>Brand Z - A</label>
            </li>
            <li key="year-new" onClick={() => { onOptionChange(4) }}>
                <ExpandMore />
                <label>Newer first</label>
            </li>
            <li key="year-old" onClick={() => { onOptionChange(5) }}>
                <ExpandLess />
                <label>Older first</label>
            </li>
        </ul>
    );
};

export default SortOptions;