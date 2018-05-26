
import Mongoose, {Schema} from 'mongoose';
import timestamps from 'mongoose-timestamp';
import mongooseStringQuery from 'mongoose-string-query';


const bookSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  author:{
    type:String,
    required:true
  },
  review:{
    type:String,
    default:'n/a'
  },
  pages:{
    type:String,
    default: 'n/a'
  },
  rating:{
    type:Number,
    minlength:1,
    maxlength:5
  },
  price:{
    type:String,
    default:'n/a'
  },
  ownerID:{
    type:String,
    required:true
  }
});


bookSchema.plugin(timestamps);
bookSchema.plugin(mongooseStringQuery);
bookSchema.index({name: 1});
bookSchema.index({ownerID: 1});
bookSchema.index({rating: 1});

const Book = Mongoose.model('Book', bookSchema);

module.exports = {Book};
