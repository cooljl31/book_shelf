import React, {Component} from 'react';
import {connect} from 'react-redux';
import {auth} from '../actions/index';
import PropTypes from 'prop-types';

 export default (ComposeClass,reload) =>  {

   class AuthenticateCheck extends Component {
      state = {
        loading:true
      }

      componentWillMount() {
        this.props.dispatch(auth());
      }

      componentWillReceiveProps (nextProps) {
        this.setState({loading: false});
        if (nextProps.user.login.isAuth) {
          if (reload===false) {
            this.props.history.push('/user');
          }
        } else {
          if (reload) {
            this.props.history.push('/login');
          }
        }

      }

    render() {
      if (this.state.loading) {
        return <div className="loader" > Loding... </div>;
      }

      return (
         <div>
           <ComposeClass {...this.props} user={this.props.user} />
         </div>
       );
     }
   }

   AuthenticateCheck.propTypes = {
     user: PropTypes.shape({
       login: PropTypes.shape({
         isAuth: PropTypes.bool,
       }),
     }),
     dispatch: PropTypes.func,
     history: PropTypes.object,
   };

   const mapStateToProps = (state) => {

     return {
       user: state.user
     };
   };

   return connect(mapStateToProps)(AuthenticateCheck);

 };
