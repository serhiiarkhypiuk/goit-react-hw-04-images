import React, { useState } from 'react';
import {
  SearchHeader,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  Input,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [imageQuery, setImageQuery] = useState('');

  const handleChange = event => {
    setImageQuery(event.currentTarget.value.toLowerCase());
    console.log(imageQuery);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (imageQuery.trim() === '') {
      alert('Please enter your search query');
      return;
    }

    onSubmit(imageQuery);
    setImageQuery('');
  };

  return (
    <SearchHeader>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit" onClick={handleSubmit}>
          <SearchFormButtonLabel></SearchFormButtonLabel>
        </SearchFormButton>

        <Input
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={imageQuery}
          onChange={handleChange}
        />
      </SearchForm>
    </SearchHeader>
  );
};

export default Searchbar;
