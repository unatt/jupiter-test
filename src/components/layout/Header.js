import React from 'react';
import Logo from '../ui/Logo';
import classes from './Header.module.css';

const Header = () => {
  return (
    <header className={classes.header}>
      <div className={classes.actions}>
        <div className={classes.logo}>
          <Logo />
        </div>
        <nav>
          <ul>
            <li>About</li>
            <li>Services</li>
            <li>Pricing</li>
            <li>Blog</li>
          </ul>
        </nav>
        <div className={classes.contact}>
          <button className={classes['contact-button']}>CONTACT</button>
        </div>
      </div>
      <h1 className={classes.title}>Portfolio</h1>
      <div className={classes.description}>
        Agency provides a full service range including technical skills, design,
        business understanding.
      </div>
    </header>
  );
};

export default Header;
