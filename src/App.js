import './App.scss';
import React from 'react';
import Layout from './components/layout/Layout';
import ItemsList from './components/items/ItemsList';
import Notification from './components/ui/Notification';
import { useSelector } from 'react-redux';

// const DUMMY_ITEMS = [
//   { id: '1', title: 'book', category: 'books', img: 'imgURL1' },
//   { id: '2', title: 'magazine', category: 'books', img: 'imgURL2' },
//   { id: '3', title: 'tennis', category: 'sport', img: 'imgURL3' },
//   { id: '4', title: 'football', category: 'sport', img: 'imgURL4' },
// ];

function App() {
  const notification = useSelector((state) => state.ui.notification);
  const items = useSelector((state) => state.items.items);

  return (
    <Layout>
      {notification && notification.status !== 'success' && (
        <Notification
          title={notification.title}
          message={notification.message}
        />
      )}

      {items && <ItemsList />}
    </Layout>
  );
}

export default App;
