var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var logger = require('morgan');
var fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/api/users');
var reviewsRouter = require('./routes/api/reviews');
var eventsRouter = require('./routes/api/events');
var categoryRouter = require('./routes/api/categories');
var ticketRouter = require('./routes/api/tickets');
var orderRouter = require('./routes/api/orders');
var contactsRouter = require('./routes/api/contact');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({secret:"secretKey", saveUninitialized : true, resave : true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024},
    useTempFiles: true,
    tempFileDir: "/tmp/",
    createParentPath: true
}));

app.use('/', indexRouter);
app.use('/', adminRouter);
app.use('/api/users', usersRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/tickets', ticketRouter);
app.use('/api/orders', orderRouter);
app.use('/api/contacts', contactsRouter);

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
  res.render('404');
});

module.exports = app;
