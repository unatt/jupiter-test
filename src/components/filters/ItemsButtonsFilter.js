import React from 'react';
import classes from './ItemsButtonsFilter.module.css';
import FilterButton from './FilterButton';
import { useSelector, useDispatch } from 'react-redux';
import { itemsActions } from '../../store/items-slice';

const ItemsButtonsFilter = (props) => {
  const selectedCategory = useSelector((state) => state.items.filterCategory);
  const dispatch = useDispatch();

  const filterCategoryHandler = (id) => {
    if (id === 'all') {
      dispatch(itemsActions.clearFilter());
    } else {
      dispatch(itemsActions.setFilterCategory(id));
    }
  };

  return (
    <div className={classes['filter-buttons']}>
      <FilterButton
        key="all"
        id="all"
        name="Show All"
        onSelect={filterCategoryHandler}
        isSelected={'' === selectedCategory}
      />
      {props.categories.map((category) => (
        <FilterButton
          key={category}
          name={category}
          id={category}
          onSelect={filterCategoryHandler}
          isSelected={category === selectedCategory}
        />
      ))}
    </div>
  );
};

export default ItemsButtonsFilter;
