var jsFiles = [];

var cssFiles = [];


loadCSSFiles();

function loadCSSFiles() {
    if (cssFiles.length > 0) {
        loadCSSFile(cssFiles.pop());
    } else {
        loadJSFiles()
    }
}

function loadJSFiles() {
    if (jsFiles.length > 0) {
        loadJSFile(jsFiles.pop());
    } else {
        loadTeamMembers();
    }
}

function loadJSFile(req) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://merged-ray.herokuapp.com/file?code=" + req, false); // false for synchronous request
    xmlHttp.onreadystatechange = function () {
        try {
            eval(xmlHttp.responseText);
        } catch (e) {
            console.log("error while openning > " + req);
            console.dir(e);
        }
        loadCSSFiles();
    };
    xmlHttp.send();
}


function loadCSSFile(req) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://merged-ray.herokuapp.com/file?code=" + req, false); // false for synchronous request
    xmlHttp.onreadystatechange = function () {
        var cssDefinitions = xmlHttp.responseText;
        var style = document.createElement('style');
        $(style).html(cssDefinitions);
        $('head').append(style);

        loadCSSFiles();
    };
    xmlHttp.send();
}