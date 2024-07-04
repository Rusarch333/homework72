import React from 'react';
import PropTypes from 'prop-types';
import styles from './LoadedUsersResultsAmountRadiobutton.module.scss';

const LoadedUsersResultsAmountRadiobutton = ({
  value,
  checked,
  handlerResultsCallback,
}) => {
  return (
    <label>
      <input
        name="results"
        type="radio"
        value={value}
        checked={checked}
        onChange={handlerResultsCallback}
      />
      {value}
    </label>
  );
};

LoadedUsersResultsAmountRadiobutton.propTypes = {
  value: PropTypes.number,
  checked: PropTypes.bool,
  handlerResultsCallback: PropTypes.func.isRequired,
};

LoadedUsersResultsAmountRadiobutton.defaultProps = {
  value: 5,
  checked: false,
};

export default LoadedUsersResultsAmountRadiobutton;
