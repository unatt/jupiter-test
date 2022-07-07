import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ItemsButtonsFilter from '../filters/ItemsButtonsFilter';
import classes from './ItemsList.module.css';
import Item from './Item';
import ItemsSelectFilter from '../filters/ItemsSelectFilter';
import { itemsActions } from '../../store/items-slice';
import { fetchItemsData } from '../../store/items-slice';

const ItemsList = () => {
  const filteredItems = useSelector((state) => {
    if (state.items.filterCategory) {
      return state.items.items.filter(
        (item) => item.category === state.items.filterCategory
      );
    } else return state.items.items;
  });

  const categories = useSelector((state) => [
    ...new Set(state.items.items.map((item) => item.category)),
  ]);

  const selectedCategory = useSelector((state) => state.items.filterCategory);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    try {
      dispatch(fetchItemsData());
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  }, [dispatch]);

  const loadMorePages = () => {
    setPage((page) => (page += 1));
    dispatch(fetchItemsData(page));
  };

  let content;

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

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
      <section>
        <ItemsButtonsFilter categories={categories} />
        <ItemsSelectFilter categories={categories} />
      </section>
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
        <div className={classes['loading-status']}>{content}</div>
        {!selectedCategory && (
          <div className={classes.loader}>
            <button
              onClick={loadMorePages}
              className={classes['loader-button']}
            >
              LOAD MORE
            </button>
          </div>
        )}
      </section>
    </main>
  );
};

export default ItemsList;
