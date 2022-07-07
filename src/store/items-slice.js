import { createSlice } from '@reduxjs/toolkit';

const itemsSLice = createSlice({
  name: 'items',
  initialState: { items: [], filteredItems: [], filterCategory: '' },
  reducers: {
    addItems(state, action) {
      const addedItems = action.payload;
      state.items = state.items.concat(addedItems);
      state.filteredItems = state.items;
    },
    removeSelectedItems(state) {
      state.items = state.items.filter((item) => !item.isSelected);

      state.filteredItems = state.items.filter(
        (item) => item.category === state.filterCategory
      );

      if (state.filteredItems.length === 0) {
        state.filterCategory = '';
        state.filteredItems = state.items;
      }
    },
    selectItem(state, action) {
      const selectedId = action.payload;
      state.items = state.items.map((item) => {
        if (item.id === selectedId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      state.filteredItems = state.filteredItems.map((item) => {
        if (item.id === selectedId) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    },
    setFilterCategory(state, action) {
      state.filterCategory = action.payload;
      state.filteredItems = state.items.filter(
        (item) => item.category === state.filterCategory
      );
    },
    clearFilter(state) {
      state.filteredItems = state.items;
      state.filterCategory = '';
    },
  },
});

export const fetchItemsData = (page) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://jupiter-test-a0449-default-rtdb.europe-west1.firebasedatabase.app/projects.json'
      );

      const data = await response.json();

      const loadedItems = [];

      for (const key in data) {
        loadedItems.push({
          id: page ? `${key}-${page}` : key,
          title: page ? `${data[key].title}-${page}` : data[key].title,
          category: data[key].category,
          img: data[key].img,
          isSelected: false,
        });
      }

      return loadedItems;
    };

    const data = await fetchData();

    dispatch(itemsActions.addItems(data));
  };
};

export const itemsActions = itemsSLice.actions;

export default itemsSLice;
