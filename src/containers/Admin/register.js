import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getUsers, getUserRegister} from '../../actions/index';

class Register extends PureComponent {
  state = {
    name:'',
    lastname:'',
    email:'',
    password:'',
    error:''
  }

  componentWillMount() {
    this.props.dispatch(getUsers());
  }

  handleInputEmail = (event) =>  {
    this.setState({email: event.currentTarget.value});
  }
  handleInputPassword = (event) => {
   this.setState({password: event.currentTarget.value});
  }

  handleInputName = (event) =>  {
   this.setState({name: event.currentTarget.value});
  }

  handleInputLastname = (event) =>  {
   this.setState({lastname: event.currentTarget.value});
  }

  submitForm = (event) => {
    event.preventDefault();
    this.setState({error: ''});

    this.props.dispatch(getUserRegister({
      name:this.state.name,
      lastname:this.state.lastname,
      email: this.state.email,
      password: this.state.password
    }, this.props.user.users));
  }

  showUsers(users){
    return users ?
     users.map(item=>(
       <tr key={item._id} >
         <td>{item.name}</td>
         <td>{item.lastname}</td>
         <td>{item.email}</td>
       </tr>
     ))
     :null;
  }

  componentWillReceiveProps(nextProps) {
    let error = nextProps.user.register ? nextProps.user.register.message : null;
    let success = nextProps.user.register ? nextProps.user.register.success : null;

    this.setState({error: error});

    if (success) {
      this.setState({
        name:'',
        lastname:'',
        email:'',
        password:''
      });
    }
  }

  render() {
    let user = this.props.user.users;
    return (
      <div>
        <div className="rl_container">
        <form onSubmit={this.submitForm}>
        <h2>Add Admin</h2>
        <div className="form_element">
          <input type="text" placeholder="Enter name"
            value={this.state.name}
            onChange={this.handleInputName}
          />
        </div>
        <div className="form_element">
          <input type="text" placeholder="Enter lastname"
            value={this.state.lastname}
            onChange={this.handleInputLastname}
          />
        </div>
        <div className="form_element">
          <input type="text" placeholder="Enter email"
            value={this.state.email}
            onChange={this.handleInputEmail}
          />
        </div>
        <div className="form_element">
          <input type="password" placeholder="Enter password"
            value={this.state.password}
            onChange={this.handleInputPassword}
          />
        </div>
        <button type="submit">Add user</button>
        <div className="error">
            {
             this.state.error
            }
        </div>
        </form>
          <div className="current_users">
            <h4>Current user:</h4>
            <table>
              <thead>
                  <tr>
                    <th>Name</th>
                    <th>Lastname</th>
                    <th>Email</th>
                  </tr>
              </thead>
              <tbody>
                  {this.showUsers(user)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}


Register.propTypes = {
  name: PropTypes.string,
  lastname: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  dispatch: PropTypes.func,
  user: PropTypes.shape({
    users: PropTypes.array,
    register: PropTypes.object,
  }),
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};
export default connect(mapStateToProps)(Register);


