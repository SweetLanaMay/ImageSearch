import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import logoImg from '../../images/logo.png';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(query);
  };

  return (
    <header className={css.searchbar}>
      <a href="/" className={css.logoContainer}>
        <img src={logoImg} alt="ImageSearch Logo" className={css.logo} />
        <h1 className={css.title}>ImageSearch</h1>
      </a>
      
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchButton}>
          <span className={css.buttonLabel}>Search</span>
        </button>

        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
