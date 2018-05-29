import {User} from '../models/user';

let auth = (req,res,next) =>  {
  let token = req.cookies.auth;

  User.findByToken(token,(err,user)=>{
    if (err) {
      return res.status(400).json({message: err.message});
    }
    if (!user) {
      return res.json({
        isAuth:false,
        message: 'You\'re not login'
      });
    }
    req.token = token;
    req.user = user;
    next();
    });
};

module.exports = {auth};
