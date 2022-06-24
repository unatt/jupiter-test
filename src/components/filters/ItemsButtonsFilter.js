import React from 'react';
import classes from './ItemsButtonsFilter.module.css';
import FilterButton from './FilterButton';

const ItemsButtonsFilter = (props) => {
  const filterCategoryHandler = (id) => {
    if (id === 'all') {
      console.log('clear filter');
      props.onClearFilter();
    } else {
      props.onFilterCategory(id);
    }
  };

  return (
    <div className={classes['filter-buttons']}>
      <FilterButton
        key="all"
        id="all"
        name="Show All"
        onSelect={filterCategoryHandler}
        isSelected={'all' === props.selectedCategory}
      />
      {props.categories.map((category) => (
        <FilterButton
          key={category}
          name={category}
          id={category}
          onSelect={filterCategoryHandler}
          isSelected={category === props.selectedCategory}
        />
      ))}
    </div>
  );
};

export default ItemsButtonsFilter;
