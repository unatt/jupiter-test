import React from 'react';
import classes from './FilterButton.module.css';

const FilterButton = ({ id, name, onSelect, isSelected }) => {
  const selectHandler = () => {
    onSelect(id);
  };
  return (
    <button
      id={id}
      onClick={selectHandler}
      className={
        isSelected ? `${classes.button} ${classes.selected}` : classes.button
      }
    >
      {name}
    </button>
  );
};

export default FilterButton;
