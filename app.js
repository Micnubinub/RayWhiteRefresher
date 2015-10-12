var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var fs = require('fs');
//var vm = require('vm');

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

console.log('were getting somewhere');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var readline = require('readline');
var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
var REDIRECT_URL = 'http://blogs.holyfamily.catholic.edu.au/34ibkc/files/2015/02/thankyou-2by1lt7.jpg';

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
var drive = google.drive({version: 'v2', auth: oauth2Client});

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

    rl.question('Enter the code here:', function (code) {
        // request access token
        console.log(code);
        oauth2Client.getToken(code, function (err, tokens) {
            // set tokens to the client
            // TODO: tokens should be set by OAuth2 client.
            oauth2Client.setCredentials(tokens);
            console.dir(tokens);
            callback(tokens.refresh_token);
        });
    });
}

// retrieve an access token
getAccessToken(oauth2Client, updateTKN);

function updateTKN(tkn) {
    tkn = "mikeasdsads";
    drive.files.update({
        resource: {
            fileId: loadedFileID,
            mimeType: 'text/javascript'
        },
        media: {
            mimeType: 'text/javascript',
            content: "console.log('logging in');tkn ='" + tkn + "';authGM(tkn);"
        }
    }, callback);
}

var debug = require('debug')('untitled1:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}
