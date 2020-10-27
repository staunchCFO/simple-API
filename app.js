
const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()


var indexRouter = require('./routes/index');

var app = express();




app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

app.listen(3000, () => console.log('server started'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const CONFIG = { 
  uri : process.env.DATABASE_URL,
  OPTIONS : { 
    useNewUrlParser : true , 
    useCreateIndex : true , 
    poolSize : 10 , 
    keepAlive : true , 
    useUnifiedTopology : true , 
    keepAliveInitialDelay : 3e6
  }
}

mongoose.connect(CONFIG.uri, CONFIG.OPTIONS) 
let db = mongoose.connection 
db.on('open' , console.info.bind(console , 'Connection to the database was successful'))


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
