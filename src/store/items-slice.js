import { createSlice } from '@reduxjs/toolkit';

const itemsSLice = createSlice({
  name: 'items',
  initialState: { items: [], filterCategory: '' },
  reducers: {
    addItems(state, action) {
      state.items = state.items.concat(action.payload);
    },
    removeSelectedItems(state) {
      state.items = state.items.filter((item) => !item.isSelected);
      if (
        state.items.filter((item) => item.category === state.filterCategory)
          .length === 0
      ) {
        state.filterCategory = '';
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
    },
    setFilterCategory(state, action) {
      state.filterCategory = action.payload;
    },
    clearFilter(state) {
      state.filterCategory = '';
    },
  },
});


export const itemsActions = itemsSLice.actions;

export default itemsSLice;
