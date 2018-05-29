import React from 'react';
import {SideNav} from 'react-simple-sidenav';
import PropTypes from 'prop-types';
import SidenavItems from './sidenav_items';

const Nav = (props) => {
  return (
    <SideNav
      showNav={props.showNav}
      onHideNav={props.onHideNav}
      navStyle={{
        background: '#242424',
        maxWidth:'220px'
      }}
    >
      <SidenavItems />
    </SideNav>
  );
};

Nav.propTypes = {
  showNav: PropTypes.bool,
  onHideNav: PropTypes.func,
};
export default Nav;
