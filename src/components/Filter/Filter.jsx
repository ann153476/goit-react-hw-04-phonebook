import React from 'react';

import PropTypes from 'prop-types';

const Filter = ({ onChange }) => (
  <div>
    <h2>Find contacts by name</h2>
    <label>
      <input type="name" onChange={onChange} />
    </label>
  </div>
);

Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Filter;
