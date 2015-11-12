'use strict';

var koa         = require('koa');
var app         = koa();
var router      = require('koa-router')();
var serve       = require('koa-static');
var mount       = require('koa-mount');
var livereload  = require('koa-livereload');
var koaBody     = require('koa-body');
var handlebars  = require("koa-handlebars");


app.use(livereload());

/* Body */
app.use(koaBody());


/* Static Resources */
app.use(serve(__dirname + '/app/public'));

/* Handlebars Layouts */
app.use(handlebars({
  root: './app',
  layoutsDir: 'views/layouts',
  defaultLayout: 'main',
}))

/* Routes */

app.use( router.routes() );

router.get('/login', function *(next){
  yield this.render('login/index',{
    title: 'The Login Page'
  })
});

router.get('/logout', function *(next){
  yield this.render('pages/content',{
    title: 'The Logout Page',
    body: 'This is the logout page'
  })
});


/* Distribition Files */
app.use( mount('/static', serve(__dirname + '/dist')))


//shhh.... listen
app.listen(4040, function () {
  console.log("HTTP server listening on", 4040);
});