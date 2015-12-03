var passport = require('koa-passport'),
    LocalStrategy = require('passport-local').Strategy;

var co = require('co');
var bcrypt = require('bcrypt');
var User = require('./app/models/models').User;

passport.use(new LocalStrategy(
  function(username, password, done) {
    co(function *(){
      console.log('lets try to match the pw');
      var result = yield User.where('username', username).fetch(),
          user = result.toJSON(),
          hash = user.password;
        console.log(user);

      console.log('comparing ', hash, password);
      bcrypt.compare(password, hash, function(err, res) {
          // res == true
          console.log('res', res);
      });
    });    
  }
));
