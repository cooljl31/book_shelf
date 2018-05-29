import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Home from './components/Home/index';
import Layout from './hoc/layout';
import Book from './components/Books/index';
import Login from './containers/Admin/login';
import auth from './hoc/auth';
import User from './components/Admin/index';
import AddReview from './containers/Admin/add';
import UserPosts from './containers/Admin/userPosts';
import EditReview from './containers/Admin/edit';
import register from './containers/Admin/register';
import Logout from './containers/Admin/logout';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={auth(Home,null)} />
        <Route path="/login" exact component={auth(Login,false)} />
        <Route path="/user/logout" exact component={auth(Logout,true)} />
        <Route path="/user" exact component={auth(User,true)} />
        <Route path="/user/user-reviews" exact component={auth(UserPosts,true)} />
        <Route path="/user/register" exact component={auth(register,true)} />
        <Route path="/user/add" exact component={auth(AddReview,true)} />
        <Route path="/user/edit-post/:id" exact component={auth(EditReview,true)} />
        <Route path="/book/:id" exact component={auth(Book,null)} />
      </Switch>
    </Layout>
  );
};

export default Routes;
