import React from 'react';
import PropTypes from 'prop-types';
import styles from './User.module.scss';

const User = ({ user }) => {
  const userFullName = user.name.first + ' ' + user.name.last;
  return (
    <li key={user.login.uuid}>
      <figure>
        <img src={user.picture.medium} alt={userFullName + 'avatar'} />
        <figcaption>{userFullName}</figcaption>
      </figure>
    </li>
  );
};

User.propTypes = {};

export default User;
