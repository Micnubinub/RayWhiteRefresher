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

app.get('/', function (req, res) {
    fs.readFile('html/login.html', function (err, data) {
        res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': data.length});
        res.write(data);
        res.end();
    });
});

app.use('/auth', function (req, res) {
    if (checkCode(req.param('code'))) {
        fs.readFile('old_web/index.html', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': data.length});
            res.write(data);
            res.end();
        });
    } else {
        res.send({failed: 'true'});
        res.end();
    }
});

app.use('/file', function (req, res) {
    var code = req.param('code');
    if ('load' === code) {
        fs.readFile('old_web/js/loadJsFiles.js', function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/javascript', 'Content-Length': data.length});
            res.write(data);
            res.end();
        });
    } else if (code === 'choice') {
        fs.readFile('old_web/files/Super%20Choice%20Form%20-%20Standard.pdf', function (err, data) {
            res.writeHead(200, {'Content-Type': 'application/pdf', 'Content-Length': data.length});
            res.write(data);
            res.end();
        });
    } else if (code === 'employ') {
        fs.readFile('old_web/files/Trunk%20Platform%20Pty%20Ltd%20-%20Employee%20Details%20Form.pdf', function (err, data) {
            res.writeHead(200, {'Content-Type': '*/*', 'Content-Length': data.length});
            res.write(data);
            res.end();
        });
    } else if (code === 'tax') {
        fs.readFile('old_web/files/Tax%20Declaration%20Form.pdf', function (err, data) {
            res.writeHead(200, {'Content-Type': 'application/pdf', 'Content-Length': data.length});
            res.write(data);
            res.end();
        });
    } else {

        fs.readFile(req.param('code'), function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/plain', 'Content-Length': data.length});
            res.write(data);
            res.end();
        });
    }
});

app.use('/master', function (req, res) {
    fs.readFile('old_web/masterslider/style/' + greq.param('code'), function (err, data) {
        res.writeHead(200, {'Content-Type': '*/*', 'Content-Length': data.length});
        res.write(data);
        res.end();
    });
});


app.use('/font', function (req, res) {
    fs.readFile(getFont(req.param('code')), function (err, data) {
        res.writeHead(200, {'Content-Type': '*/*', 'Content-Length': data.length});
        res.write(data);
        res.end();
    });
});

function getFont(type) {
    switch (type.toLowerCase()) {
        case 'oft':
            return 'old_web/font-awesome/font-awesome/font/FontAwesome.otf';
            break;
        case 'eot':
            return 'old_web/font-awesome/font-awesome/font/fontawesome-webfont.eot';
            break;
        case 'svg':
            return 'old_web/font-awesome/font-awesome/font/fontawesome-webfont.svg';
            break;
        case 'ttf':
            return 'old_web/font-awesome/font-awesome/font/fontawesome-webfont.ttf';
            break;
        case 'woff':
            return 'old_web/font-awesome/font-awesome/font/fontawesome-webfont.woff';
            break;
    }
}

app.use('/html', function (req, res) {
    if (req.param('code')) {
        fs.readFile(req.param('code'), function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': data.length});
            res.write(data);
            res.end();
        });
    }
});

app.use('/image', function (req, res) {
    if (req.param('code')) {
        fs.readFile('old_web/images/' + req.param('code'), function (err, data) {
            res.writeHead(200, {'Content-Type': 'image/*', 'Content-Length': data.length});
            res.write(data);
            res.end();
        });
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



