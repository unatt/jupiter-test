import { uiActions } from './ui-slice';
import { itemsActions } from './items-slice';

export const fetchItemsData = (page) => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        'https://jupiter-test-a0449-default-rtdb.europe-west1.firebasedatabase.app/projects.json'
      );

      if (!response.ok) {
        throw new Error('Could not fetch data!');
      }

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

    try {
      dispatch(
        uiActions.showNotification({
          status: 'loading',
          title: 'Loading',
          message: 'Loading...',
        })
      );
      const data = await fetchData();
      dispatch(itemsActions.addItems(data));
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success',
          message: 'Data loaded successfully',
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error',
          message: 'Error fetching data from db',
        })
      );
    }
  };
};
