import React from 'react';
import styles from './Spinner.module.scss';

// Лоадер - это на самом деле просто обычный див, весь его визуал основан на стилях из Spinner.module.scss!
const Spinner = () => {
  return <div className={styles['custom-loader']}></div>;
};

export default Spinner;
