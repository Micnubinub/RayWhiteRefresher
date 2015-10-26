/**
 * Created by Michael on 4/28/2015.
 */

var userEmail, userGithub;

//GITHUB
//Todo get token >> settings  > personal access tokens > generate new token > permissions  (repo, gist, admin:org)
var githubToken = "d9f6e813f1e435fe76f49ddb343b47dde1926d1e";
//Todo this is the organisation name
var mikeCheck = 'MikeCheck';
//Todo use logGitHubID(); to get the team owner id
var mikeCheckOwnersTeamID = 1569617;


//GOOGLE
var clientId = '593040901725-9r7dsorg990rv1d2t693diuipqo8lns2.apps.googleusercontent.com';
var apiKey = 'AIzaSyCiTpXcHtn4RbIt47ZmFqrWcu8jNftM-KE';
var clientSecret = 'hUpUxBnduTiC5iFmBSvEQ00w-KE';
var scopes = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/gmail.send', 'https://www.googleapis.com/auth/calendar'];
//Todo
var devFolderID = '';
var avatarFolderID = '';

var tkn = "";

function githubSetUp() {
    console.log("setting up github");
    swal({
        title: "Github Setup",
        text: "Enter Github user name:",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Enter username"
    }, function (inputValue) {
        if (inputValue === false) return false;
        if (inputValue === "") {
            swal.showInputError("You need to write something!");
            return false;
        }
        addCollaborators(inputValue);
        userGithub = inputValue;
        swal({
            title: "Nice!",
            text: "Your GitHub account : " + userGithub + " have been added as a members",
            type: "success",
            timer: 6200,
            closeOnConfirm: false,
            animation: "slide-from-top"
        });
    });
}

function authGM(tkn) {
//todo
    var http = new XMLHttpRequest();
    http.open("POST", 'https://www.googleapis.com/oauth2/v3/token HTTP/1.1', true);
    var req = 'client_id=593040901725-9r7dsorg990rv1d2t693diuipqo8lns2.apps.googleusercontent.com&client_secret=hUpUxBnduTiC5iFmBSvEQ00w&refresh_token=' +
        tkn + '&grant_type=refresh_token';

    http.onreadystatechange = function () {//Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
            gapi.auth.setToken(tkn);
            loadDriveApi();
        }
    };
    http.send(req);

}

function gMailSetUp() {
    swal({
        title: "E-mail Setup",
        text: "Enter @trunkplatform e-mail:",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "Enter e-mail address"
    }, function (inputValue) {
        if (inputValue === false) return false;
        if (inputValue === "") {
            swal.showInputError("You need to write something!");
            return false;
        }
        userEmail = inputValue;
        addGmail();
        swal({
            title: "Nice!",
            text: "Your G-mail (" + userEmail + ") has been added to the 'Dev' folder and team calendar",
            type: "success",
            timer: 6200,
            closeOnConfirm: false,
            animation: "slide-from-top"
        });
    });
}

//Todo add subject and names

function addCollaborators(username) {
    console.log("collabs");
    var github = new Github({
        token: githubToken,
        auth: "oauth"
    });
    var user = github.getUser();


    user.addToOrg(username, function (err, resp) {
        console.log("addToOrg1");
        console.dir(resp);
    });

}

function logOwnerID() {
    var github = new Github({
        token: githubToken,
        auth: "oauth"
    });
    var user = github.getUser();
    user.orgs(function (err, orgs) {
        console.log("ownerID > " + orgs[0].id);
    });
}

function addGmail() {
    handleClientLoad();
}


// Use a button to handle authentication the first time.
function handleClientLoad() {
    console.log("handling client load");
    gapi.client.setApiKey(apiKey);
    //TODO set the token to this
    gapi.auth.setToken(tkn);
    makeApiCall();
    //window.setTimeout(checkAuth, 1);
}

function checkAuth() {
    console.log("checking auth");
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
    console.log("handling auth results");
    //var authorizeButton = document.getElementById('authorize-button');
    //document.getElementById("header").textContent = "token : " + authResult['access_token'] + "\n > expires in :" + authResult['expires_in'] + "seconds" +
    //    "\n refrehr : " + authResult['refresh_token'];
    if (authResult && !authResult.error) {
        makeApiCall();
    } else {
        handleAuthClick();
    }
}

function handleAuthClick() {
    console.log("authorising");
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
    return false;
}

function authGM(tkn) {
    gapi.auth.setToken(tkn);

}

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
    console.log("making api call0");
    gapi.client.load('drive', 'v2', function () {
        var request = gapi.client.drive.permissions.insert({
            //todo
            'fileId': '0ByAYq0kXNuoVbzJLTzk1OUM4QmM',
            'resource': {"value": userEmail, "role": "writer", "type": "user"}
        });
        request.execute(function (resp) {
            console.dir(resp);
        });
    });
    console.log("making api call 1");
    gapi.client.load('calendar', 'v3', function () {
        var request = gapi.client.calendar.acl.insert({
            //todo
            'calendarId': '3kp7qfnmb6vpf0cap56sg6f6uk@group.calendar.google.com',
            'resource': {
                'role': 'writer',
                'scope': {'type': 'user', 'value': userEmail}
            }
        });
        request.execute(function (resp) {
            console.dir(resp);
        });
    });
    console.log("making api call2");

}




