import React from 'react';
import classes from './ItemsSelectFilter.module.css';

const ItemsSelectFilter = ({
  selectedCategory,
  categories,
  onFilterCategory,
  onClearFilter,
}) => {
  const selectHandler = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === 'all') {
      console.log('clear filter');
      onClearFilter();
    } else {
      onFilterCategory(selectedValue);
    }
  };

  return (
    <div className={classes['selection-filter']}>
      <div className={classes.select}>
        {/* <h3>ItemsSelectFilter</h3> */}
        <select onChange={selectHandler} value={selectedCategory}>
          <option value="all">Show All</option>
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
          <span class="focus"></span>
        </select>
      </div>
    </div>
  );
};

export default ItemsSelectFilter;
