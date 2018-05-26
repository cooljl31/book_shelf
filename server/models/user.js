import Mongoose, {Schema} from 'mongoose';
import bcrypt from 'mongoose-bcrypt';
import timestamps from 'mongoose-timestamp';
import jwt from 'jsonwebtoken';
import mongooseStringQuery from 'mongoose-string-query';

const UserSchema = new Schema({
  email: {
    type:String,
    required:true,
    trim:true,
    unique:1
  },
  password:{
    type:String,
    required:true,
    minlength:6
  },
  name:{
    type:String,
    maxlength:100,
  },
  lastname:{
    type:String,
    maxlength:100
  },
  role:{
    type:Number,
    default:0
  },
  token:{
    type:String
  }
});

UserSchema.plugin(bcrypt);
UserSchema.plugin(timestamps);
UserSchema.plugin(mongooseStringQuery);
UserSchema.index({email: 1});

const User = Mongoose.model('User', UserSchema);

module.exports = {User}
;
