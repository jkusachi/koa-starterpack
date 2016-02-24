
import koa         from 'koa';
import serve       from 'koa-static';
import mount       from 'koa-mount';
import livereload  from 'koa-livereload';
import koaBody     from 'koa-body';
import handlebars  from "koa-handlebars";
import prettyjson  from 'prettyjson';

import passport from 'koa-passport';
import routes from './config/routes';

const app = koa();

import './auth';

// Enable live reload
app.use(livereload());

// Body
app.use(koaBody());

app.use(passport.initialize());
app.use(passport.session());

// Static Resources
app.use(serve(__dirname + '/public'));

// Handlebars Layouts
app.use(handlebars({
  root: './app',
  layoutsDir: 'views/layouts',
  defaultLayout: 'main',
}))

// Routes
app.use( routes.routes() );

// Distribition Files
app.use( mount('/static', serve(__dirname + '/dist')))


//...listen linda...
app.listen(5050, function () {
  console.log("HTTP server listening on", 5050);
});

export default app;