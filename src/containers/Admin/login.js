
/*eslint no-console: ['error', { allow: ['warn','log'] }] */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginUser} from '../../actions/index';
import PropTypes from 'prop-types';

class Login extends Component {

  state = {
    email:'',
    password:'',
    error:'',
    succes:false

  }

  submitForm = (event) => {
    event.preventDefault();
    this.props.dispatch(loginUser(this.state));
  }
  handleIputEmail = (event) => {

    this.setState({
      email: event.target.value
    });
  }

  handleIputPassword = (event) => {
    this.setState({
      password: event.target.value
    });
  }

componentWillReceiveProps(nextProps) {
  if (nextProps.user.login.isAuth) {
    this.props.history.push('/user');
  }
}

  render() {
    let user = this.props.user;

    return (
      <div className="rl_container">
        <form onSubmit={this.submitForm}>
          <h2>Log in here</h2>
          <div className="form_element">
          <input type="email"
            value={this.state.email}
            onChange={this.handleIputEmail}
            placeholder="Enter you email"/>
          </div>
          <div className="form_element">
          <input type="password"
            value={this.state.password}
            onChange={this.handleIputPassword}
            placeholder="Enter you password"/>
          </div>
          <button type="submit">Log In</button>
          <div className="error">
            { user.login ?
              <div>{user.login.message} </div>
              :null
            }
          </div>
        </form>
      </div>
    );
  }
}


Login.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.shape({
    login: PropTypes.shape({
      isAuth: PropTypes.bool,
    }),
  }),
  history: PropTypes.object,
};
const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Login);
