import React, { Fragment } from 'react';
import classes from './Layout.module.css';
import Header from './Header';

const Layout = (props) => {
  return (
    <Fragment>
      <Header />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
