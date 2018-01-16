var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);


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
writeToDataBase();

function writeToDataBase()
{
  var fs = require('fs');
  var obj;
  fs.readFile('./sensors', 'utf8', function (err, data) {
    if (err) throw err;
    obj = JSON.parse(data);
  //  console.log(obj);

    var request = require('request');

    var sensor;

    for (var i in obj.measure)
    {



      sensor =obj.measure[i]
      //console.log(sensor.name);
      var toWrite = ""+sensor.name+",time="+obj.date;
          toWrite+=" name="+sensor.desc;
          toWrite+=" desc="+sensor.unit;
          toWrite+=" value="+sensor.value;
          console.log(toWrite);
      request.post(
      'http://localhost:8086/write?db=forecast '+toWrite,function (error, response, body)
      {
          if (error) {
              console.log(error)
          }
      }
    //insert temperatures
);

}
})
}

module.exports = app;
