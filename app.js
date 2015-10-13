var express = require('express');
var app = express();

const CLIENT_ID = '593040901725-9r7dsorg990rv1d2t693diuipqo8lns2.apps.googleusercontent.com';
var apiKey = 'AIzaSyCiTpXcHtn4RbIt47ZmFqrWcu8jNftM-KE';
var readline = require('readline');
var google = require('googleapis');
var loadedFileID = "0ByAYq0kXNuoVd2NvZ2R5dlMxeXM";
var OAuth2Client = google.auth.OAuth2;
var oauth2Client = new OAuth2Client(CLIENT_ID, 'hUpUxBnduTiC5iFmBSvEQ00w', 'https://raywhiterefresher.herokuapp.com/done');
var drive = google.drive('v2');
var tkn, respon, refrTKN, testVa;

app.get('/', function (req, res) {
    //res.send('Hello World!');
    res.redirect(301, getAccessToken(oauth2Client));
});

app.use('/done', function (req, res) {
    oauth2Client.getToken(req.params[0], function (err, tokens) {
        // set tokens to the client
        oauth2Client.setCredentials(tokens);
        refrTKN = JSON.stringify(err) + "\n , code > " + req.params[0] + "\n , " + tokens;
        //updateTKN(tokens);
    });

    setTimeout(function () {
        res.send('testVa > ' + testVa + " \n tkn >  " + tkn + "\n respon > " + respon + '\n  reftkn > ' + refrTKN);
    }, 7000)

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

function getAccessToken(oauth2Client) {
    // generate consent page url
    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/calendar']
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



