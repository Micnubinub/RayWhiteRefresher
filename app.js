var express = require('express');
var app = express();
var done = express();

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


app.get('/', function (req, res) {
    res.send('Hello World!');
    res.redirect(getAccessToken(oauth2Client, updateTKN));
});

app.use('/done', function (req, res) {
    res.send('Hello World done!');
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
    return url;
}

// retrieve an access token


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



