import PropTypes from 'prop-types';

import Box from 'shared/components/Box/Box';

const ContactListItem = ({ name, number, onDelBtnClick, id }) => {
  return (
    <Box display="flex" gridGap={10} justifyContent="center" as="li">
      {name}: {number}
      <button onClick={() => onDelBtnClick(id)} type="button">
        delete
      </button>
    </Box>
  );
};

export default ContactListItem;

ContactListItem.propTypes = {
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onDelBtnClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
