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

app.use(bodyParser.json());
app.use(cookieParser());

app.get('/api/book', (req,res)=>{
  let id = req.query.id;

  Book.findById(id, (err,doc)=>{
    if (err) {
return res.status(400).send(err.message);
}
    res.send(doc);
  });
});

app.get('/api/books', (req,res)=>{
  let skip = parseInt(req.query.skip);
  let limit = parseInt(req.query.limit);
  let order = req.query.order;

  Book.find().skip(skip).sort({
    _id: order
    }).limit(limit).exec((err, doc) => {
    if (err) {
      return res.status(400).send(err.message);
    }
    res.send(doc);
  });
});

app.post('/api/book', (req,res)=>{
  const book = new Book(req.body);

  book.save((err,doc)=>{
    if (err) {
      return res.status(400).send(err.message);
    }

    res.status(200).json({
      post:true,
      bookID:doc._id
    });
  });
});

app.post('/api/book', (req,res)=>{
  Book.findByIdAndUpdate(req.body._id, req.body, {
      new: true
    }, (err, doc)=>{
    if (err) {
      return res.status(400).send(err.message);
    }
    res.json({
      success: true,
      doc
    });
  });
});


app.delete('/api/book', (req,res)=>{

  let id = req.query.id;
  Book.findByIdAndRemove(id, (err, doc)=>{
    if (err) {
      return res.status(400).send(err.message);
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
