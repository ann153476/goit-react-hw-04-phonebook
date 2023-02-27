import React, { useState } from 'react';
import initialState from './initialState';

import PropTypes from 'prop-types';
import s from '../App.module.css';

const ContactForm = ({ onSubmit }) => {
  const [state, setState] = useState({ ...initialState });

  const onInputChange = ({ target }) => {
    setState(prevState => {
      return { ...prevState, [target.name]: target.value };
    });
  };

  const onFormSubmit = e => {
    e.preventDefault();

    onSubmit({ ...state });

    setState({ ...initialState });
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <label>
          Name
          <input
            value={state.name}
            onChange={onInputChange}
            type="text"
            name="name"
            placeholder="enter name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label>
          Number
          <input
            value={state.number}
            onChange={onInputChange}
            type="tel"
            name="number"
            placeholder="enter number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={s.btn} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ContactForm;
