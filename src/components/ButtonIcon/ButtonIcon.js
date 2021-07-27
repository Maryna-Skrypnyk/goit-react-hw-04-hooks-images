import React from 'react';

import PropTypes from 'prop-types';

import styles from './ButtonIcon.module.scss';

const ButtonIcon = ({ type, onClick, children, ...allyProps }) => (
  <button
    type={type}
    onClick={onClick}
    className={styles.ButtonIcon}
    {...allyProps}
  >
    {children}
  </button>
);

ButtonIcon.defaultProps = {
  onClick: () => null,
  children: null,
  type: 'button',
};

ButtonIcon.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  children: PropTypes.node,
  'aria-label': PropTypes.string.isRequired,
};

export default ButtonIcon;
