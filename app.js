if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');
var flash = require('express-flash');
var session = require('express-session');
var passport = require('passport');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var app = express();
var db = require('./models/db');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

//use express ejs layouts
app.disable('view cache')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressLayouts);

app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false
}))
app.use(passport.initialize());
app.use(passport.session());

//Check if authenticated
app.use(function(req,res,next){
  res.locals.login = req.isAuthenticated();
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth',authRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{layout:false});
});

module.exports = app;
