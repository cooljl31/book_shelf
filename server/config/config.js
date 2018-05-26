const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI
  },
  default: {
    SECRET: 'mycresaypass',
    DATABASE: 'mongodb://127.0.0.1:27017/booshelf'
  }
};

exports.get = function get(env) {
  return config[env] || config.default;
};
