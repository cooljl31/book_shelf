/*eslint no-console: ['error', { allow: ['warn','log'] }] */

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
const app = express();
const config = require('./config/config').get(process.env.NODE_ENV);

mongoose.connect(config.DATABASE);
import {User} from './models/user';
import {Book} from './models/book';
import {auth} from './middleware/auth';
app.use(bodyParser.json());
app.use(cookieParser());

// User
app.post('/api/register', (req,res)=>{
  const user = new User(req.body);

  user.save((err,doc)=>{
    if (err) {
      return res.status(400).json({
        message: `This ${user.email} email is already taken`
      });
    }
    res.status(200).json({
      post:true,
      userID:doc._id
    });
  });
});

app.post('/api/login', (req,res)=>{

  User.findOne({'email':req.body.email}, (err, user)=>{
    if (!user) {
      res.json({
        message: 'Auth failed, user not found'
      });
    }

    user.verifyPassword(req.body.password, (err,isMatch)=>{
      if (err) {
        throw err;
      }
      if (!isMatch) {
        return res.status(400).json({
          message: 'Wrong password'
        });
      }
      user.generateToken(user,(err,user)=>{
        if (err) {
          return res.status(400).json({message:err});
        }
        res.cookie('auth',user.token).json({message:'Ok'});
      });
    });
  });
});

app.get('/api/users', (req,res)=>{
  let skip = parseInt(req.query.skip || '');
  let limit = parseInt(req.query.limit || 5);
  let order = req.query.order || 'desc';
  let userID = req.query.id;

  let query = userID ? {_id:userID} : {};

  User.find(query).skip(skip).sort({
    _id: order
    }).limit(limit).exec((err, doc) => {
    if (err) {
      return res.status(400).json({message: err.message});
    }
    res.send(doc);
  });
});

app.get('/api/user/posts', (req,res)=>{
  let limit = parseInt(req.query.limit || 5);
  let order = req.query.order || 'desc';
  let userID = req.query.user;

  Book.find({ownerID:userID}).sort({
    _id: order
    }).limit(limit).exec((err, doc) => {
    if (err) {
      return res.status(400).json({message: err.message});
    }
    res.send(doc);
  });
});

app.get('/api/user/logout', auth, (req,res)=>{
  req.user.deleteToken(req.token, (err)=>{
    if (err) {
      return res.status(400).json({message: err.message});
    }
    res.send(200);
  });
});
// Books
app.get('/api/book', (req,res)=>{
  let id = req.query.id;

  Book.findById(id, (err,doc)=>{
    if (err) {
      return res.status(400).json({
        message: err.message
      });
    }
    res.send(doc);
  });
});

app.get('/api/books', (req,res)=>{
  let skip = parseInt(req.query.skip || '');
  let limit = parseInt(req.query.limit || 5);
  let order = req.query.order || 'desc';

  Book.find().skip(skip).sort({
    _id: order
    }).limit(limit).exec((err, doc) => {
    if (err) {
      return res.status(400).json({message: err.message});
    }
    res.send(doc);
  });
});

app.post('/api/book', (req,res)=>{
  const book = new Book(req.body);

  book.save((err,doc)=>{
    if (err) {
      return res.status(400).json({message:err.message});
    }

    res.status(200).json({
      post:true,
      bookID:doc._id
    });
  });
});

app.put('/api/book', (req,res)=>{
  Book.findByIdAndUpdate(req.body._id, req.body, {
      new: true
    }, (err, doc)=>{
    if (err) {
      return res.status(400).json({message: err.message});
    }
    res.json({
      success: true,
      doc
    });
  });
});


app.delete('/api/book', (req,res)=>{
  let id = req.query.id;
  Book.findByIdAndRemove(id, (err)=>{
    if (err) {
      return res.status(400).json({message: err.message});
    }
    res.json({
      success: true
    });
  });
});


const port = process.env.PORT || 3001;
app.listen(port, ()=> {
  console.log(`Server start at ${port}`);
});
