import React, { Fragment, useEffect, useState, useCallback } from 'react';
import ItemsButtonsFilter from '../filters/ItemsButtonsFilter';
import classes from './ItemsList.module.css';
import Item from './Item';
import ItemsSelectFilter from '../filters/ItemsSelectFilter';

const ItemsList = () => {
  const [items, setItems] = useState([]);
  const [filterdItems, setFilteredItems] = useState([...items]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const itemsCategories = [...new Set(items.map((item) => item.category))];

  const fetchItemsHandler = useCallback(async (p) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://jupiter-test-a0449-default-rtdb.europe-west1.firebasedatabase.app/projects.json'
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();

      const loadedItems = [];

      for (const key in data) {
        loadedItems.push({
          id: p ? `${key}-${p}` : key,
          title: p ? `${data[key].title}-${p}` : data[key].title,
          category: data[key].category,
          img: data[key].img,
          isSelected: false,
        });
      }
      console.log(loadedItems);
      if (p) {
        setItems((curItems) => {
          const newItems = [...curItems].concat(loadedItems);
          return newItems;
        });
      } else {
        setItems(loadedItems);
      }
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchItemsHandler();
  }, [fetchItemsHandler]);

  const loadMorePages = () => {
    setPage((p) => (p += 1));
    fetchItemsHandler(page);
    console.log(items);
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
      if (event.keyCode === 46) {
        setItems((curItems) => {
          const newItems = curItems.filter((item) => !item.isSelected);
          return newItems;
        });

        if (filterdItems) {
          setFilteredItems((curFilteredItems) => {
            const newFilteredItems = curFilteredItems.filter(
              (item) => !item.isSelected
            );
            if (newFilteredItems.length === 0) {
              console.log('deleted all items in cat');
              setSelectedCategory('all');
              return;
            }
            return newFilteredItems;
          });
        }
      }
    },
    [filterdItems]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleUserKeyPress);
    return () => {
      window.removeEventListener('keydown', handleUserKeyPress);
    };
  }, [handleUserKeyPress]);

  const selectItemHandler = (itemId, isSelected) => {
    setItems((curItems) => {
      let newItems = [...curItems];
      newItems = newItems.map((item) => {
        if (item.id === itemId) {
          item.isSelected = isSelected;
          console.log(item.isSelected);
        }
        return item;
      });
      console.log(newItems);
      return newItems;
    });
  };

  const filterCategoryHandler = (categoryToFilter) => {
    setFilteredItems(
      [...items].filter((item) => item.category === categoryToFilter)
    );
    setSelectedCategory(categoryToFilter);
  };

  const clearFilterHandler = () => {
    setSelectedCategory('all');
  };

  let itemsToShow = selectedCategory !== 'all' ? filterdItems : items;

  return (
    <Fragment>
      <main className={classes['main-area']}>
        <section>
          <ItemsButtonsFilter
            categories={itemsCategories}
            onFilterCategory={filterCategoryHandler}
            onClearFilter={clearFilterHandler}
            selectedCategory={selectedCategory}
          />
          <ItemsSelectFilter
            categories={itemsCategories}
            onFilterCategory={filterCategoryHandler}
            onClearFilter={clearFilterHandler}
            selectedCategory={selectedCategory}
          />
        </section>
        <section>
          {/* <h2>List of items</h2> */}
          <div className={classes.oucontainer}>
            <div className={classes.incontainer}>
              {itemsToShow.map((item) => (
                <Item
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  img={item.img}
                  category={item.category}
                  selected={item.isSelected}
                  onSelect={selectItemHandler}
                  onFilter={filterCategoryHandler}
                />
              ))}
            </div>
          </div>
          <div className={classes['loading-status']}>{content}</div>
          {selectedCategory === 'all' && (
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
    </Fragment>
  );
};

export default ItemsList;
