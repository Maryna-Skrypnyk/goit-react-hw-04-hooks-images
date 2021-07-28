import React, { useState } from 'react';
import PropTypes from 'prop-types';

import ButtonIcon from '../ButtonIcon';
import { HiOutlineSearch } from 'react-icons/hi';
import { toast, Zoom } from 'react-toastify';
import styles from './Searchbar.module.scss';

const Searchbar = ({ handleSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setSearchQuery(value.toLowerCase());
  };

  const handleSearchSubmit = e => {
    e.preventDefault();

    if (searchQuery.trim() === '') {
      return toast.warn('Enter your request', {
        position: 'top-center',
        transition: Zoom,
        style: {
          top: 80,
          textAlign: 'center',
          width: 290,
          margin: '0 auto',
        },
      });
    }
    handleSubmit(searchQuery);
    resetInput();
  };

  const resetInput = () => {
    setSearchQuery('');
  };

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSearchSubmit}>
        <ButtonIcon type="submit" aria-label="Search images">
          <HiOutlineSearch />
        </ButtonIcon>

        <input
          className={styles.SearchFormInput}
          type="text"
          value={searchQuery}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
