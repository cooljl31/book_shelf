import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header/header';

const Layout = (props) => {
  return (
    <div>
      <Header />
      <div>
        {props.children}
      </div>
    </div>
  );
};
Layout.propTypes = {
 children: PropTypes.object,
};
export default Layout;
