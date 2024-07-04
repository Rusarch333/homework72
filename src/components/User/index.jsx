import React from 'react';
import PropTypes from 'prop-types';
import styles from './User.module.scss';

const User = ({ user }) => {
  const userFullName = user.name.first + ' ' + user.name.last;
  return (
    <li className={styles['user-container__user']} key={user.login.uuid}>
      <figure className={styles['li']}>
        <img src={user.picture.medium} alt={userFullName + 'avatar'} />
        <figcaption className={styles['user__full-name-caption general__word-break']}>{userFullName}</figcaption>
      </figure>
    </li>
  );
};

const userPropType = PropTypes.shape({
  gender: PropTypes.string.isRequired,
  name: PropTypes.shape({
    title: PropTypes.string.isRequired,
    first: PropTypes.string.isRequired,
    last: PropTypes.string.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    street: PropTypes.shape({
      number: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    postcode: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    coordinates: PropTypes.shape({
      latitude: PropTypes.string.isRequired,
      longitude: PropTypes.string.isRequired,
    }).isRequired,
    timezone: PropTypes.shape({
      offset: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  email: PropTypes.string.isRequired,
  login: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    salt: PropTypes.string.isRequired,
    md5: PropTypes.string.isRequired,
    sha1: PropTypes.string.isRequired,
    sha256: PropTypes.string.isRequired,
  }).isRequired,
  dob: PropTypes.shape({
    date: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
  }).isRequired,
  registered: PropTypes.shape({
    date: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
  }).isRequired,
  phone: PropTypes.string.isRequired,
  cell: PropTypes.string.isRequired,
  id: PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  picture: PropTypes.shape({
    large: PropTypes.string.isRequired,
    medium: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
  nat: PropTypes.string.isRequired,
});

User.propTypes = {
  user: userPropType,
};

export default User;
