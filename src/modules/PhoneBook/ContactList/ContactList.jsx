import PropTypes from 'prop-types';

import ContactListItem from '../ContsctListItem/ContactListItem';
import Box from 'shared/components/Box/Box';

const ContactList = ({ filteredContacts, onDelBtnClick }) => {
  return (
    <Box display="flex" flexDirection="column" gridGap={10} mt={10} as="ul">
      {filteredContacts.map(({ name, id, number }) => (
        <ContactListItem
          key={id}
          name={name}
          number={number}
          onDelBtnClick={onDelBtnClick}
          id={id}
        />
      ))}
    </Box>
  );
};

export default ContactList;

ContactList.defaultProps = {
  filteredContacts: [],
};

ContactList.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDelBtnClick: PropTypes.func.isRequired,
};
