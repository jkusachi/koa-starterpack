'use strict';

import Router from 'koa-router';
import passport from 'koa-passport';
//var Post = require('../../app/models/models').Post;

var router = Router();

router
  .get('/login', function *(next){

    //var data = yield Post.where('id', 1).fetch();
    //var post = data.toJSON();

    yield this.render('login/index',{
      title: 'The Login Page',
      body: 'the body'
    })
  })


  .get('/register', function *(next){
    yield this.render('login/register',{
      title: 'Register Page'
    })
  })

  .post('/login', passport.authenticate('local'), function *(next){
    console.log('we got a user');
  })

  .get('/logout', function *(next){
    yield this.render('pages/content',{
      title: 'The Logout Page',
      body: 'This is the logout page'
    })
  });

export default  router;