var express = require('express');
var app = express();

const CLIENT_ID = '593040901725-9r7dsorg990rv1d2t693diuipqo8lns2.apps.googleusercontent.com';
var google = require('googleapis');
var loadedFileID = "0ByAYq0kXNuoVd2NvZ2R5dlMxeXM";
var OAuth2Client = google.auth.OAuth2;
var oauth2Client = new OAuth2Client(CLIENT_ID, 'hUpUxBnduTiC5iFmBSvEQ00w', 'https://raywhiterefresher.herokuapp.com/done');
var http = require('http');
var drive = google.drive('v2');
var fs = require('fs');
var html_dir = 'old_web/';

app.get('/', function (req, res) {
    fs.readFile('html/login.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': data.length});
        res.write(data);
        res.end();
    });
});

app.use('/auth', function (req, res) {
    if (checkCode(req.param('code'))) {
        //fs.readFile('old_web/index.html', function (err, data) {
        //    res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': data.length});
        //    res.write(data);
        //    res.end();
        //});

        res.sendFile(html_dir);
        res.end();
    } else {
        res.send({failed: 'true'});
        res.end();
    }
});

function checkCode(code) {
    return code === 'JCUTrunk!';
}

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

//function getAccessToken(oauth2Client) {
//    // generate consent page url
//    var url = oauth2Client.generateAuthUrl({
//        access_type: 'offline',
//        approval_prompt: 'force',
//        scope: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/calendar']
//    });
//    return url;
//}
//
//function updateTKN(tkn) {
//    if (!tkn)
//        return;
//    drive.files.update({
//        fileId: loadedFileID,
//        media: {
//            mimeType: 'text/javascript',
//            body: "console.log('logging in');tkn ='" + tkn + "';authGM(tkn);"
//        },
//        auth: oauth2Client
//    }, function (err, resp) {
//    });
//}



