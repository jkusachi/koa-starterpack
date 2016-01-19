'use strict';

var koa         = require('koa');
var app         = koa();
var serve       = require('koa-static');
var mount       = require('koa-mount');
var livereload  = require('koa-livereload');
var koaBody     = require('koa-body');
var handlebars  = require("koa-handlebars");
var prettyjson  = require('prettyjson');

var passport = require('koa-passport');
var routes = require('./config/routes');


var d = function(item){
  console.log(prettyjson.render(item));
}

require('./auth')

/* Enable live reload */
app.use(livereload());

/* Body */
app.use(koaBody());

app.use(passport.initialize());
app.use(passport.session());

/* Static Resources */
app.use(serve(__dirname + '/public'));

/* Handlebars Layouts */
app.use(handlebars({
  root: './app',
  layoutsDir: 'views/layouts',
  defaultLayout: 'main',
}))

/* Routes */
app.use( routes.routes() );


/* Distribition Files */
app.use( mount('/static', serve(__dirname + '/dist')))


//shhh.... listen
app.listen(5050, function () {
  console.log("HTTP server listening on", 5050);
});