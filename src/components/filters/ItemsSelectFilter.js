import React from 'react';
import classes from './ItemsSelectFilter.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { itemsActions } from '../../store/items-slice';

const ItemsSelectFilter = ({ categories }) => {
  const selectedCategory = useSelector((state) => state.items.filterCategory);
  const dispatch = useDispatch();

  const selectHandler = (event) => {
    const selectedValue = event.target.value;

    if (selectedValue === 'all') {
      dispatch(itemsActions.clearFilter());
    } else {
      dispatch(itemsActions.setFilterCategory(selectedValue));
    }
  };

  return (
    <div className={classes['selection-filter']}>
      <div className={classes.select}>
        <select onChange={selectHandler} value={selectedCategory}>
          <option value="all">Show All</option>
          {categories.map((category) => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ItemsSelectFilter;
