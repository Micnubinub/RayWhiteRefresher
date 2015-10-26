/**
 * Created by linde on 26-Oct-15.
 */

var jsFiles = ["old_web/js/modernizr.js",
    "old_web/js/underscore-min.js",
    "old_web/js/upload.js",
    "old_web/js/load_team_members.js",
    "old_web/bootstrap/js/bootstrap.min.js",
    "old_web/owl-carousel/owl.carousel.min.js",
    "old_web/masterslider/masterslider.min.js",
    "old_web/js/jquery.stellar.min.js",
    "old_web/js/jquery.scrollTo.min.js",
    "old_web/js/jquery.inview.min.js",
    "old_web/js/jquery.countTo.js",
    "old_web/js/isotope.pkgd.min.js",
    "old_web/js/placeholder-fallback.js",
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
console.log("we in bwa");
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
        if (runLoadPages) {
            loadPages();
        }
    }
}

function loadJSFile(req) {
    console.dir(req);
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "https://merged-ray.herokuapp.com/file?code=" + req, false); // false for synchronous request
    xmlHttp.onreadystatechange = function () {
        eval(xmlHttp.responseText);
        //var fileref = document.createElement('script');
        //fileref.setAttribute("type", "text/javascript");
        //fileref.setAttribute("innerHTML", file);
        //document.getElementsByTagName("head")[0].appendChild(fileref);
        loadCSSFiles();
    };

    xmlHttp.send();
}

var htmlPages = [
    {ref: "#development_div", link: "old_web/ext/dev.html", newID: "development"},
    {ref: "#welcome_div", link: "old_web/ext/welc.html", newID: "welcome"},
    {ref: "#projects_div", link: "old_web/ext/projects.html", newID: "projects"},
    {ref: "#hr_div", link: "old_web/ext/hr.html", newID: "hr"},
    {ref: "#team_div", link: "old_web/ext/team.html", newID: "team"}
];

function loadPages() {
    if (htmlPages.length > 0) {
        var req = htmlPages.pop();
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "https://merged-ray.herokuapp.com/html?code=" + req.link, false); // false for synchronous request
        xmlHttp.onreadystatechange = function () {
            var html = xmlHttp.responseText;
            console.log("laodignthis html > ");
            console.dir(html);
            $(req.ref).load(req.newID, html);
            loadPages();
        };
        xmlHttp.send();
    } else {
        loadTeamMembers();
    }
}


function loadCSSFile(req) {
    console.dir(req);
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