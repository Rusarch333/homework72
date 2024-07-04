import React from 'react';
import PropTypes from 'prop-types';
import styles from './NationOption.module.scss';

const NationOption = ({key, nat}) => {
  return (
    <option key={key} value={nat}>
      {nat}
    </option>
  );
};

NationOption.propTypes = {
  key: PropTypes.number.isRequired,
  nat: PropTypes.string.isRequired
};


export default NationOption;
