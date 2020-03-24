const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
var cors = require('cors');
const app = express();

mongoose.connect('mongodb+srv://mdbuser:2Nq2IQhb7XW6dx5R@m220-1bwmi.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex: true });
mongoose.connection.on('error', error => console.log(error) );
mongoose.Promise = global.Promise;

require('./auth/auth');

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const routes = require('./routes/routes');
const apiRoutes = require('./routes/api');
app.use('/', routes);
app.use('/api/v1', passport.authenticate('jwt', { session : false }), apiRoutes );
//app.use('/api', apiRoutes );

//Handle errors
app.use(function(err, req, res, next) {
  //console.log('Handle errors', err)
  res.status(err.status || 500);
  res.json({ error : err.message });
});

app.listen(3000, () => {
  console.log('Server started. port 3000')
});
