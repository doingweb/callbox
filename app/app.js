var
  express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  swig = require('swig');

var app = express();

var env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

setupViewEngine();

setupRoutes();

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

forward404ToErrorHandler();

if (app.get('env') === 'development') {
  setupDevelopmentErrorHandler();
}

setupProductionErrorHandler();

module.exports = app;


function setupViewEngine() {
  app.engine('swig', swig.renderFile)
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'swig');
}

function setupRoutes() {
  app.use('/', require('./routes/root'));
  app.use('/users', require('./routes/user'));
  app.use('/gatekeeper', require('./routes/gatekeeper'));
}

function forward404ToErrorHandler() {
  app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });
}

function setupDevelopmentErrorHandler() {
  setupErrorHandler();
}

function setupProductionErrorHandler() {
  setupErrorHandler({});
}

function setupErrorHandler(errorDetails) {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: errorDetails || err,
          title: 'error'
      });
  });
}
