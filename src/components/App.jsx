import { useState, useEffect, useRef } from 'react';

import { nanoid } from 'nanoid';

import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Notification from './Notification/Notification';

import { getInitialValue } from '../utils/localStorage.js';

const App = () => {
  const [contacts, setContacts] = useState(() =>
    getInitialValue('contacts', [])
  );
  const [filter, setFilter] = useState('');

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const isDublicate = ({ name, number }) => {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const dublicate = contacts.find(contact => {
      return (
        contact.name.toLowerCase() === normalizedName &&
        contact.number.toLowerCase() === normalizedNumber
      );
    });

    return Boolean(dublicate);
  };

  const handleFilter = ({ target }) => setFilter(target.value);

  const addContact = ({ name, number }) => {
    if (isDublicate({ name, number })) {
      return alert(`${name} - ${number} is already exist`);
    }
    setContacts(prevs => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      return [...prevs, newContact];
    });
  };

  const deleteContact = id => {
    setContacts(prevs => prevs.filter(item => item.id !== id));
  };

  const getFiltered = () => {
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLowerCase();
    const result = contacts.filter(({ name }) => {
      return name.toLowerCase().includes(normalizedFilter);
    });

    return result;
  };

  const items = getFiltered();

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <Filter value={filter} onChange={handleFilter}></Filter>
      {contacts.lenght === 0 ? (
        <Notification message="There is no contacts" />
      ) : (
        <ContactList contacts={items} onDeleteContact={deleteContact} />
      )}
    </>
  );
};

export default App;
