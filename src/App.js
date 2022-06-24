import './App.css';
import React from 'react';
import Layout from './components/layout/Layout';
import ItemsList from './components/items/ItemsList';

// const DUMMY_ITEMS = [
//   { id: '1', title: 'book', category: 'books', img: 'imgURL1' },
//   { id: '2', title: 'magazine', category: 'books', img: 'imgURL2' },
//   { id: '3', title: 'tennis', category: 'sport', img: 'imgURL3' },
//   { id: '4', title: 'football', category: 'sport', img: 'imgURL4' },
// ];

function App() {
  return (
    <Layout>
      <ItemsList />
    </Layout>
  );
}

export default App;
