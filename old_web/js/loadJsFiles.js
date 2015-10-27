var jsFiles = [
    "old_web/js/modernizr.js",
    "old_web/js/underscore-min.js",
    "old_web/js/upload.js",
    "old_web/js/load_team_members.js",
    "old_web/owl-carousel/owl.carousel.min.js",
    "old_web/masterslider/masterslider.min.js",
    "old_web/js/jquery.countTo.js",
    "old_web/js/jquery.inview.min.js",
    "old_web/js/jquery.scrollTo.min.js",
    "old_web/js/jquery.stellar.min.js",
    "old_web/js/placeholder-fallback.js",
    "old_web/bootstrap/js/bootstrap.min.js",
    "old_web/js/custom.js"];

var cssFiles = [
    "old_web/font-awesome/font-awesome/css/font-awesome.min.css",
    "old_web/bootstrap/css/bootstrap.min.css",
    "old_web/owl-carousel/owl.carousel.css",
    "old_web/masterslider/style/masterslider.css",
    "old_web/masterslider/skins/light-6/style.css",
    "old_web/styles/main.css",
    "old_web/styles/custom.css",
    "old_web/styles/skews.css",
    "old_web/styles/modal.css",
    "old_web/styles/login.css",
    "old_web/styles/sweetalert.css"
];


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