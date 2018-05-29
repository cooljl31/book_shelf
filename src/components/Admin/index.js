import React from 'react';
import PropTypes from 'prop-types';

const User = (props) => {

  return (
    <div>
      <div className="user_container">
        <div className="avatar">
          <img src="/images/avatar.png" alt=""/>
        </div>
        <div className="nfo">
        <div><span>Name: </span> {props.user.login.name}</div>
        <div><span>Lastname: </span>{props.user.login.lastname} </div>
        <div><span>Email: </span> {props.user.login.email}</div>
        </div>
      </div>
    </div>
  );
};


User.propTypes = {
  user: PropTypes.shape({
    login: PropTypes.shape({
      name: PropTypes.string,
      lastname: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
};

export default User;
