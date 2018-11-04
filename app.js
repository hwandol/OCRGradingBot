var createError = require('http-errors');
var express = require('express');
var http = require('http');
// var logger = require('morgan');
var bodyParser = require('body-parser');

var keyboardRouter = require('./routes/keyboard');
var messageRouter = require('./routes/message');

var app = express();

// app.use(logger('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/keyboard', keyboardRouter);
app.use('/message', messageRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.writeHead(404,{

    })
    res.end('404 Not Found');
    next(createError(404));
  });

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.end('ERROR 500');
    // res.render('error');
  });

  http.createServer(app).listen(3000,()=>{
      console.log('서버실행중..');
  })

module.exports = app;
