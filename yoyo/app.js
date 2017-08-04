var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash=require('connect-flash');
var validator=require('express-validator');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
var mongoose=require('mongoose');
var session=require('express-session')
var MongoStore=require('connect-mongo')(session);
var passport=require('passport')
mongoose.connect('mongodb://localhost:27017/myapp');
require('./passport.js')


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));

app.use(cookieParser('somesecret'));
app.use(session({
    secret: 'somesecret',
    resave: false,
    saveUninitialized: false,
    store:new MongoStore({mongooseConnection:mongoose.connection}),
    cookie:{maxAge:24*60*60*1000}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

var index = require('./routes/index');

app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req,res,next) {
    res.locals.login=req.isAuthenticated();
    res.locals.session=req.session;
    next();
})
app.get('/logout',function (req,res,next) {
    req.logout();
    res.redirect('/');
});
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



app.get('/signup',index);
app.post('/signup',index);
app.get('/signin',index);
app.post('/signin',index);

app.listen(27017,function () {
    console.log("server @ https://localhost:27017");
});

