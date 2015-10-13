var express = require('express');
var app = express();

var CLIENT_ID = '593040901725-9r7dsorg990rv1d2t693diuipqo8lns2.apps.googleusercontent.com';
var apiKey = 'AIzaSyCiTpXcHtn4RbIt47ZmFqrWcu8jNftM-KE';
var CLIENT_SECRET = 'hUpUxBnduTiC5iFmBSvEQ00w-KE';
var readline = require('readline');
var google = require('googleapis');
//var rl = readline.createInterface({
//    input: process.stdin,
//    output: process.stdout
//});
//Todo

//Refresher
var loadedFileID = "0ByAYq0kXNuoVd2NvZ2R5dlMxeXM";
var tkn, respon, refrTKN, testVa = "didn't";

app.get('/', function (req, res) {
    //res.send('Hello World!');
    res.redirect(301, getAccessToken(oauth2Client));
});

app.use('/done', function (req, res) {

    oauth2Client.getToken(req.param('code'), function (err, tokens) {
        // set tokens to the client
        oauth2Client.setCredentials(tokens);
        refrTKN = err + " , " + tokens;
        //updateTKN(tokens);
    });

    setTimeout(function () {
        res.send('testVa > ' + testVa + " \n tkn >  " + tkn + "\n respon > " + respon + '\n  reftkn > ' + refrTKN);
    }, 10000)

});

var port = normalizePort(process.env.PORT || '3000');

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});


var OAuth2Client = google.auth.OAuth2;
var REDIRECT_URL = 'https://rayrefresher.herokuapp.com/done';

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
var drive = google.drive('v2');


function getAccessToken(oauth2Client) {
    // generate consent page url
    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline', // will return a refresh token
        scope: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/calendar'] // can be a space-delimited string or an array of scopes
    });
    return url;
}


function updateTKN(tkn) {
    drive.files.update({
        fileId: loadedFileID,
        media: {
            mimeType: 'text/javascript',
            body: "console.log('logging in');tkn ='" + tkn + "';authGM(tkn);"
        },
        auth: oauth2Client
    }, function (err, resp) {
        respon = err + " , " + resp;
    });
}



