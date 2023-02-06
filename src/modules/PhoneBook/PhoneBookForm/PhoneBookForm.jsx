import { Component } from 'react';
import PropTypes from 'prop-types';

import Box from 'shared/components/Box/Box';
import Input from 'shared/components/Input/Input.styled';

class PhoneBookForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  onSubmitForm = e => {
    e.preventDefault();

    const { onSubmit } = this.props;

    onSubmit(this.state);
    this.reset();
  };

  reset() {
    this.setState({ name: '', number: '' });
  }

  render() {
    const { name, number } = this.state;

    return (
      <Box
        mt={10}
        mb={10}
        display="flex"
        justifyContent="center"
        border="1px solid black"
        gridGap={50}
        pt={50}
        pb={50}
        as="form"
        onSubmit={this.onSubmitForm}
      >
        <label>
          name
          <Input
            onChange={this.onInputChange}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
          />
        </label>
        <label>
          phone number
          <Input
            onChange={this.onInputChange}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
          />
        </label>

        <button>Add contact</button>
      </Box>
    );
  }
}

export default PhoneBookForm;

PhoneBookForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
