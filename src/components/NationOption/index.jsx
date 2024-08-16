import React from 'react';
import PropTypes from 'prop-types';
import styles from './NationOption.module.scss';

const NationOption = ({nat}) => {
  return (
    <option value={nat}>
      {nat}
    </option>
  );
};

NationOption.propTypes = {
  nat: PropTypes.string.isRequired
};


export default NationOption;
