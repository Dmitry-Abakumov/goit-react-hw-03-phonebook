import { Component } from 'react';
import { nanoid } from 'nanoid';
import toastr from 'toastr';

import PhoneBookForm from './PhoneBookForm/PhoneBookForm';
import ContactList from './ContactList/ContactList';
import PhoneBookFilter from './PhoneBookFilter/PhoneBookFilter';
import Box from 'shared/components/Box/Box';

import 'shared/utils/toastr-config';
import 'toastr/build/toastr.min.css';

class PhoneBook extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    if (contacts?.length) {
      this.setState({ contacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    const prevContacts = prevState.contacts;

    if (prevContacts.length !== contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  isDublicate(enteredName) {
    const { contacts } = this.state;
    return contacts.some(
      ({ name }) => name.toLowerCase() === enteredName.toLowerCase()
    );
  }

  addContact = ({ name, number }) => {
    if (this.isDublicate(name))
      return toastr.warning(`${name} is already in contacts`);

    this.setState(({ contacts }) => ({
      contacts: [{ id: nanoid(), name, number }, ...contacts],
    }));
  };

  deleteContact = id => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== id),
    }));
  };

  onFilterChange = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;

    const normilizedEnteredName = filter.toLowerCase();

    if (!filter) return contacts;

    return contacts.filter(({ name }) =>
      name.toLowerCase().includes(normilizedEnteredName)
    );
  }

  render() {
    const { filter, contacts } = this.state;
    const filteredContacts = this.getFilteredContacts();

    return (
      <Box pt={50} pl={15} pr={15} textAlign="center" as="section">
        <h2>Phonebook</h2>
        <PhoneBookForm onSubmit={this.addContact} />
        {contacts.length ? (
          <Box border="1px solid black" pt={50} pb={50}>
            <PhoneBookFilter onChange={this.onFilterChange} filter={filter} />
            <h3>Contacts</h3>
            <ContactList
              filteredContacts={filteredContacts}
              onDelBtnClick={this.deleteContact}
            />
            {Boolean(filter && !filteredContacts.length) && (
              <p>No matches found</p>
            )}
          </Box>
        ) : (
          <p>You haven`t any contacts added yet</p>
        )}
      </Box>
    );
  }
}

export default PhoneBook;
