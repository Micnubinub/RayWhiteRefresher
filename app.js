var express = require('express');
var app = express();

var CLIENT_ID = '593040901725-9r7dsorg990rv1d2t693diuipqo8lns2.apps.googleusercontent.com';
var apiKey = 'AIzaSyCiTpXcHtn4RbIt47ZmFqrWcu8jNftM-KE';
var CLIENT_SECRET = 'hUpUxBnduTiC5iFmBSvEQ00w-KE';
//Todo

//Refresher
var loadedFileID = "0ByAYq0kXNuoVd2NvZ2R5dlMxeXM";
var tkn, respon;

app.get('/', function (req, res) {
    //res.send('Hello World!');
    res.redirect(301, getAccessToken(oauth2Client));
});

app.use('/done', function (req, res) {
    tkn = req.param('code');
    getTkn(tkn);
    res.send("tkn > " + tkn + "respon > " + respon);
});

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');

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
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});

var readline = require('readline');
var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
var REDIRECT_URL = 'https://rayrefresher.herokuapp.com/done';

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
var drive = google.drive({version: 'v2', auth: oauth2Client});

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getAccessToken(oauth2Client) {
    // generate consent page url
    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline', // will return a refresh token
        scope: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/calendar'] // can be a space-delimited string or an array of scopes
    });
    return url;
}

function getTkn(code) {

    updateTKN(code);
}

// retrieve an access token


function updateTKN(tkn) {
    drive.files.update({
        resource: {
            fileId: loadedFileID,
            mimeType: 'text/javascript'
        },
        media: {
            mimeType: 'text/javascript',
            content: "console.log('logging in');tkn ='" + tkn + "';authGM(tkn);"
        }
    }, function () {
    });
}



