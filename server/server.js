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

    if (user.email !== '') {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(user.email)) {
        return res.json({
          success:false,
          message: 'This is not an email try agains'
        });
      }
    }

    if (err) {
      if (err.name === 'MongoError') {
        return res.json({
          success:false,
          message: `This ${user.email} email is already taken`
        });
      } else if (err.errors.password.value !== 6) {
        return res.json({
          success:false,
          message: 'password is shorter than the minimum allowed length (6)'
        });
      } else {
        return null;
      }
    }

    res.status(200).json({
      success:true,
      doc
    });

  });
});

app.delete('/api/user', (req,res)=>{
  let id = req.query.id;
  User.findByIdAndRemove(id, (err)=>{
    if (err) {
      return res.status(400).json({message: err.message});
    }
    res.json({
      success: true
    });
  });
});

app.post('/api/login', (req,res)=>{

  User.findOne({'email':req.body.email}, (err, user)=>{
    if (!user) {
      return res.json({
        isAuth:false,
        message: 'Auth failed, user not found'
      });
    }

    user.verifyPassword(req.body.password, (err,isMatch)=>{
      if (!isMatch) {
        return res.json({
          isAuth:false,
          message: 'Wrong password'
        });
      }
      user.generateToken(user,(err,user)=>{
        if (err) {
          return res.status(400).json({message:err});
        }
        res.cookie('auth',user.token).json({
          isAuth:true,
          id:user._id,
          email:user.email
        });
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
  let userID = req.query.id;

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

app.get('/api/auth',auth,(req,res)=>{

  res.json({
    isAuth:true,
    id:req.user._id,
    email:req.user.email,
    name:req.user.name,
    lastname:req.user.lastname
  });
});

// Books

app.get('/api/reviewer', (req,res)=>{
  let id = req.query.id;

  User.findById(id, (err,doc)=>{


    if (err) {
      return res.status(400).json({
        message: `This ${doc._id} id does not exist`
      });
    }
    res.json({
      name: doc.name,
      lastname: doc.lastname
    });
  });
});

app.get('/api/books', (req,res)=>{
  let skip = parseInt(req.query.start || '');
  let limit = parseInt(req.query.limit || 5);
  let order = req.query.order || 'desc';
  let bookID = req.query.id;

  let query = bookID ? {_id:bookID} : {};

  Book.find(query).skip(skip).sort({
    _id: order
  }).limit(limit).exec((err, doc) => {
    if (err) {
      return res.status(400).json({message: err.message});
    }

    res.json(doc);
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
    }, (err, doc) => {
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
