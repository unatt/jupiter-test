import React from 'react';
import classes from './Notification.module.scss';

const Notification = ({ title, message }) => {
  return (
    <div className={classes.notification}>
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
};

export default Notification;
