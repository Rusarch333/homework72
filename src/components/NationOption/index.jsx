import React from 'react';
import PropTypes from 'prop-types';
import styles from './NationOption.module.scss';

const NationOption = ({keyIndex, nation}) => {
  return (
    <option key={keyIndex} value={nation}>
      {nation}
    </option>
  );
};

NationOption.propTypes = {
  keyIndex: PropTypes.number.isRequired,
  nation: PropTypes.string.isRequired
};


export default NationOption;
