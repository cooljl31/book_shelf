import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserPost} from '../../actions/index';
import moment from 'moment-js';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

class UserPosts extends Component {

componentWillMount() {
  this.props.dispatch(getUserPost(this.props.user.login.id));
}

showUserPosts = (user) => (
  user.userPosts ?
    user.userPosts.map((item,i) => (
      <tr key={i}>
        <td>
         <Link to={`/user/edit-post/${item._id}`} >{item.name}</Link></td>
        <td>{item.author}</td>
        <td>{moment(item.createdAt).format('MM/DD/YY')}</td>
      </tr>
    ))
    :null
)

  render() {
    let user = this.props.user;
    return (
      <div className="user_posts" >
        <h4>Your reviews:</h4>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {this.showUserPosts(user)}
          </tbody>
        </table>
      </div>
    );
  }
}

UserPosts.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.shape({
    login: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

const mapStateToProps = (state) => {

  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(UserPosts);
