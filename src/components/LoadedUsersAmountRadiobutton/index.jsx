import React from 'react';
import PropTypes from 'prop-types';
import styles from './LoadedUsersAmountRadiobutton.module.scss';

const LoadedUsersAmountRadiobutton = ({
  value=5,
  checked=false,
  handleChangeResultsAmount,
}) => {
  return (
    <label>
      <input
        name="results-amount"
        type="radio"
        value={value}
        checked={checked}
        onChange={handleChangeResultsAmount}
      />
      {value}
    </label>
  );
};

LoadedUsersAmountRadiobutton.propTypes = {
  value: PropTypes.number,
  checked: PropTypes.bool,
  handleChangeResultsAmount: PropTypes.func.isRequired,
};

export default LoadedUsersAmountRadiobutton;
