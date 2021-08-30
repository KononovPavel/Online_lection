const config = require('./db'); //будем использовать данные
const User = require('../models/user');


var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;//подключение двух библиотек

module.exports = function(passport){//экспортируется в индекс 
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();//тип авторизации идет по умолчанию
  opts.secretOrKey = config.secret;//наш секретный ключ = password;
                    //указание стратегии из библиотеки passport.js
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
      User.findOne({id: jwt_payload.sub/* это наш id */}, function(err, user) {
            //просто проверка на наличии в базе данных нашего пользователя  
        if (err) {
              return done(err, false);
          }

          if (user) {       // не передаем ошибку, а передаем пользователя в стратегию
              return done(null, user);
          }
           else {
              return done(null, false);
              // or you could create a new account
          }
      });
  }));
}