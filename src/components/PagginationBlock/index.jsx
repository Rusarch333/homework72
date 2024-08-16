import React from 'react';
import PropTypes from 'prop-types';
import styles from './PagginationBlock.module.scss';

const PagginationBlock = ({ currentPage = 1, setCurrentPage }) => {
  const handleClickPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleClickNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <button onClick={handleClickPrevPage}>&lt; {/*&lt; - unicode */} </button>
      <span> {currentPage} </span>
      <button onClick={handleClickNextPage}>&gt;</button>
    </>
  );
};

PagginationBlock.propTypes = {
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func.isRequired,
};

export default PagginationBlock;
