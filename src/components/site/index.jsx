
import React, { PropTypes } from 'react';
import Nav from '../nav';

const Site = props => {
  return (
    <div>
      <Nav />
      {props.children}
    </div>
  );
};

Site.propTypes = {
  children: PropTypes.node
};

export default Site;
