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
  const [filter, setFilter] = useState(false);

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
      {1 === 0 ? (
        <Notification message="There is no contacts" />
      ) : (
        <ContactList contacts={items} onDeleteContact={deleteContact} />
      )}
    </>
  );
};

export default App;

// class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };
//   addContact = ({ name, number }) => {
//     const normalizedName = name.toLowerCase();

//     const alreadyInContacts = this.state.contacts.find(
//       el => el.name.toLowerCase() === normalizedName
//     );
//     if (alreadyInContacts) {
//       alert(`${name} is already in contacts`);

//       return;
//     }
//     const contact = {
//       id: nanoid(),
//       name: name,
//       number: number,
//     };

//     this.setState(({ contacts }) => ({
//       contacts: [...contacts, contact],
//     }));
//   };
//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };
//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };
//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };
//   ////////////////////////
//   componentDidMount() {
//     const contacts = JSON.parse(localStorage.getItem('contacts'));
//     if (contacts?.length) {
//       this.setState({ contacts });
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     const { contacts } = this.state;
//     if (contacts.length !== prevState.contacts.length) {
//       localStorage.setItem('contacts', JSON.stringify(contacts));
//     }
//   }
//   /////////////////
//   render() {
//     const { filter } = this.state;
//     const visibleContacts = this.getVisibleContacts();
//     return (
// <>
//   <h1>Phonebook</h1>
//   <ContactForm onSubmit={this.addContact} />
//   <Filter value={filter} onChange={this.changeFilter}></Filter>
//   {visibleContacts.length === 0 ? (
//     <Notification message="There is no contacts" />
//   ) : (
//     <ContactList
//       contacts={visibleContacts}
//       onDeleteContact={this.deleteContact}
//     />
//   )}
// </>
//     );
//   }
// }
