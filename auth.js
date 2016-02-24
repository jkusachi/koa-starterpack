'use strict';

import passport from 'koa-passport';

import {Strategy} from 'passport-local';

import co from 'co';
import bcrypt from 'bcrypt';
import {User} from './app/models/models';

passport.use(new Strategy(
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

