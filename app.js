var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var vm = require('vm');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var CLIENT_ID = '593040901725-9r7dsorg990rv1d2t693diuipqo8lns2.apps.googleusercontent.com';
var apiKey = 'AIzaSyCiTpXcHtn4RbIt47ZmFqrWcu8jNftM-KE';
var CLIENT_SECRET = 'hUpUxBnduTiC5iFmBSvEQ00w-KE';
var scopes = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/calendar'];
//Todo
var devFolderID = '';
var tkn = "";
//Refresher
var parentOfLoadedFile = "0ACAYq0kXNuoVUk9PVA";
var loadedFileID = "0ByAYq0kXNuoVd2NvZ2R5dlMxeXM";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

module.exports = app;


//include('js/github.js');
//include('js/client.js');
include('js/accountManager.js');


function include(path) {
  var code = fs.readFileSync(path, 'utf-8');
  vm.runInThisContext(code, path);
}

var readline = require('readline');

var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
var plus = google.plus('v1');

// Client ID and client secret are available at
// https://code.google.com/apis/console
var REDIRECT_URL = 'YOUR REDIRECT URL HERE';

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function getAccessToken(oauth2Client, callback) {
  // generate consent page url
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // will return a refresh token
    scope: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/calendar'] // can be a space-delimited string or an array of scopes
  });

  console.log('Visit the url: ', url);
  rl.question('Enter the code here:', function(code) {
    // request access token
    oauth2Client.getToken(code, function(err, tokens) {
      // set tokens to the client
      // TODO: tokens should be set by OAuth2 client.
      oauth2Client.setCredentials(tokens);
      callback();
    });
  });
}

// retrieve an access token
getAccessToken(oauth2Client, function() {
  // retrieve user profile
  plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, profile) {
    if (err) {
      console.log('An error occured', err);
      return;
    }
    console.log(profile.displayName, ':', profile.tagline);
  });
});