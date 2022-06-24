import React, { useState } from 'react';
import classes from './Item.module.css';

const Item = React.memo((props) => {
  const { title, img, category, id, selected } = props;

  const [isSelected, setIsSelected] = useState(selected);

  const selectHandler = () => {
    props.onSelect(id, !isSelected);
    setIsSelected((prevState) => !prevState);
  };

  const filterHandler = () => {
    props.onFilter(category);
  };

  console.log('item is rendering');

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
        <h2 className={classes.title} >{title}</h2>
      </div>
    </div>
  );
});

export default Item;
