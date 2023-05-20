import React, { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Header, Form, Input, Button } from './styled';
import { ImSearch } from 'react-icons/im';

/* Компонент приймає один проп onSubmit – функцію для передачі
значення інпута під час сабміту форми */

const PLACEHOLDER = 'Search images and photos';
const QUERY_EMPTY_ERR = 'Your query is empty!';

export function Searchbar({onSubmit}) {
  const [value, setValue] = useState('');

  const handleChange = e => setValue(e.currentTarget.value.toLowerCase());

  const handleSubmit = e => {
    e.preventDefault();

    const query = value.trim();
    if (query === '') {
      toast.error(QUERY_EMPTY_ERR);
      return;
    }
    onSubmit(query);
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <Button type="submit">
          <ImSearch size="28" />
        </Button>
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={PLACEHOLDER}
        />
      </Form>
    </Header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
