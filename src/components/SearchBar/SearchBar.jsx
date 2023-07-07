import { useState } from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as SearchIcon } from '../../icons/search.svg'

export default function SearchBar({ onSubmit, onChange }) {

  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const searchQuery = event.target.elements.searchName.value.trim().toLowerCase();
    if (searchQuery) {
      onSubmit(searchQuery);
      event.target.reset();
    }
    setSearchQuery('');
  };


  return (
    <header className="SearchBar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          {/* <span className="SearchForm-button-label">Search</span> */}
          <SearchIcon />
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchName"
          value={searchQuery}
          onChange={handleChange}
        />
      </form>
    </header>
  )
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func,
};