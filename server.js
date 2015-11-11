'use strict';

var koa         = require('koa');
var app         = koa();
var views       = require('koa-views');
var router      = require('koa-router')();
var serve       = require('koa-static');
var mount       = require('koa-mount');
var livereload  = require('koa-livereload');
var koaBody     = require('koa-body');


app.use(livereload());

/* Views */
app.use(views('public/views', {
  map: { html: "handlebars" }
}));


app.use( router.routes() );

app.use(koaBody());

//mount
app.use( mount('/static', serve(__dirname + '/dist')))
 

// Statics
app.use(serve(__dirname + '/public/app'));


/* Routes */
router.get('/login', function *(next){
  yield this.render('login/index',{
    title: 'The Login Page'
  })
});

//shhh.... listen
app.listen(4040, function () {
  console.log("HTTP server listening on", 4040);
});