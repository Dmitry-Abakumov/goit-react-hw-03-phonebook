import PropTypes from 'prop-types';

import Box from 'shared/components/Box/Box';
import Input from 'shared/components/Input/Input.styled';

const PhoneBookFilter = ({ onChange, filter }) => {
  return (
    <Box mb={10} as="label">
      Find contacs by name
      <Input onChange={onChange} name="filter" value={filter} />
    </Box>
  );
};

export default PhoneBookFilter;

PhoneBookFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};
