import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ItemsButtonsFilter from '../filters/ItemsButtonsFilter';
import classes from './ItemsList.module.scss';
import Item from './Item';
import ItemsSelectFilter from '../filters/ItemsSelectFilter';
import { itemsActions } from '../../store/items-slice';
import { uiActions } from '../../store/ui-slice';
import { fetchItemsData } from '../../store/items-actions';

const ItemsList = () => {
  const filteredItems = useSelector((state) => {
    return state.items.filterCategory
      ? state.items.items.filter(
          (item) => item.category === state.items.filterCategory
        )
      : state.items.items;
  });

  const categories = useSelector((state) => [
    ...new Set(state.items.items.map((item) => item.category)),
  ]);

  const selectedCategory = useSelector((state) => state.items.filterCategory);
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  useEffect(() => {
    try {
      dispatch(fetchItemsData());
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: error,
        })
      );
    }
  }, [dispatch]);

  const loadMorePages = () => {
    setPage((page) => (page += 1));
    dispatch(fetchItemsData(page));
  };

  const handleUserKeyPress = useCallback(
    (event) => {
      if (event.keyCode === 46 || event.keyCode === 8) {
        dispatch(itemsActions.removeSelectedItems());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  return (
    <main className={classes['main-area']}>
      {filteredItems.length !== 0 && (
        <section>
          <ItemsButtonsFilter categories={categories} />
          <ItemsSelectFilter categories={categories} />
        </section>
      )}

      <section>
        <div className={classes.oucontainer}>
          <div className={classes.incontainer}>
            {filteredItems.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                title={item.title}
                img={item.img}
                category={item.category}
                selected={item.isSelected}
              />
            ))}
          </div>
        </div>
      </section>

      {!selectedCategory && filteredItems.length !== 0 && (
        <div className={classes.loader}>
          <button onClick={loadMorePages} className={classes['loader-button']}>
            LOAD MORE
          </button>
        </div>
      )}
    </main>
  );
};

export default ItemsList;
