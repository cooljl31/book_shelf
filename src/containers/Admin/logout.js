import React from 'react';
import Axios from 'axios';

const Logout = (props) => {
  Axios.get('/api/user/logout')
  .then(() => {
    setTimeout(() => {
      props.history.push('/');
    }, 2000);
  });

  return (
    <div className="logout_container">
      <h1>Sorry to see you goo :(</h1>
    </div>
  );
};

export default Logout;
