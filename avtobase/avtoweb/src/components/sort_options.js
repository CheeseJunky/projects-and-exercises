import React from 'react';
import '../styles/styles.css';
import TextButton from './buttons/text_button';

const SortOptions = ({ }) => {
    function handleSortOption(option) {
        console.log("sort option: " + option);
    }

    //fix options layout on screen
    return (
        <ul className='sort-options'>
            <li key="cheaper-first" onClick={() => {handleSortOption(0)}}>Cheaper first</li>
            <li key="expensive-first" onClick={() => {handleSortOption(1)}}>Expensive first</li>
            <li key="brand-a" onClick={() => {handleSortOption(2)}}>Brand A - Z</li>
            <li key="brand-z" onClick={() => {handleSortOption(3)}}>Brand Z - A</li>
            <li key="year-new" onClick={() => {handleSortOption(4)}}>Newer first</li>
            <li key="year-old" onClick={() => {handleSortOption(5)}}>Older first</li>
        </ul>
    );
};

export default SortOptions;