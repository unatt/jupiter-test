import React, { useState } from 'react';
import classes from './Item.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { itemsActions } from '../../store/items-slice';

const Item = React.memo((props) => {
  const { title, img, category, id, selected } = props;
  const dispatch = useDispatch();

  // const [isSelected, setIsSelected] = useState(selected);

  const selectHandler = () => {

    dispatch(itemsActions.selectItem(id));
  
  };

  const filterHandler = () => {
    dispatch(itemsActions.setFilterCategory(category));
  };

  return (
    <div
      className={
        selected ? `${classes.item} ${classes.selected}` : classes.item
      }
    >
      <img src={img} alt={title} onClick={selectHandler} />
      <div className={classes.actions}>
        <button onClick={filterHandler} className={classes['category-button']}>
          {category}
        </button>
        <h2 className={classes.title} onClick={selectHandler}>
          {title}
        </h2>
      </div>
    </div>
  );
});

export default Item;
