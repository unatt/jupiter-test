import React from 'react';
import classes from './Logo.module.css';

const Logo = () => {
  return (
    <div className={classes.logo}>
      <div className={classes['logo-icon']}>
        <div className={classes.border}>
          <div className={classes.bg}>
            <div className={classes.inner}></div>
          </div>
        </div>
      </div>
      <div className={classes['logo-text']}>Agency</div>
    </div>
  );
};

export default Logo;
