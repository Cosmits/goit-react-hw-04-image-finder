import { useState } from 'react'
import PropTypes from 'prop-types'

import { ReactComponent as SearchIcon } from '../../icons/search.svg'
import {
  StyledSearchBar,
  StyledSearchForm,
  StyledSearchFormButton,
  StyledSearchFormInput
} from './SearchBar.styled';

export default function SearchBar({ onSubmit }) {

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
    <StyledSearchBar>
      <StyledSearchForm onSubmit={handleSubmit}>
        <StyledSearchFormButton type="submit">
          <SearchIcon />
        </StyledSearchFormButton>

        <StyledSearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="searchName"
          value={searchQuery}
          onChange={handleChange}
        />
      </StyledSearchForm>
    </StyledSearchBar>
  )
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};