/**
 * Created by linde on 22-Sep-15.
 */
var accessToken, currentModal, loadedFiles = {}, avatar;

function handleFileSelect(evt) {
    loadDriveApi();
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files;
    var file = files[files.length - 1]; // FileList object.

    resize(file);
}
function loadDriveApi() {
    gapi.client.load('drive', 'v2', null);
}

function resize(file) {
    if (!file.type.match(/image.*/)) {
        alert("The chosen file is not an image: " + file.type);
        console.log("Te dropped file is not an image: ", file.type);
        return;
    }

    var reader = new FileReader();
    reader.onload = function (e) {
        render(e.target.result);
    };
    reader.readAsDataURL(file);

    function render(file) {
        var image = new Image();
        image.onload = function () {
            canvas = document.createElement('canvas'),
                context = null,

                canvas.id = "hiddenCanvas";
            canvas.width = 500;
            canvas.height = 500;
            //    canvas.style.visibility   = "hidden";
            document.body.appendChild(canvas);

            if (image.height > 500) {
                image.width *= (500 / image.height);
                image.height = 500;
            }

            if (image.width > 500) {
                image.height *= (500 / image.width);
                image.width = 500;
            }
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0, image.width, image.height);

            var dataURL = canvas.toDataURL("image/png");
            document.getElementById('avatarDialogIcon').src = dataURL;
            avatar = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

        };
        image.src = file;
    }
}

function uploadToGoogleDrive(fileData) {
    console.log('uploading to gdrive');
    var callback = function callbasck(resp) {
        console.dir(resp);
    };
    const boundary = '-------314159265358979323846';
    const delimiter = "\r\n--" + boundary + "\r\n";
    const close_delim = "\r\n--" + boundary + "--";

    var contentType = fileData.type || 'application/octet-stream';
    var metadata = {
        //Todo get their name and add it to the avatar
        'title': 'avatar.jpg',
        'mimeType': contentType,
        //Todo 'parents': [{
        //    "kind": "drive#fileLink",
        //    "id": "0Bz0bd074"
        //}]
    };

    var base64Data = fileData;

    var multipartRequestBody =
        delimiter +
        'Content-Type: application/json\r\n\r\n' +
        JSON.stringify(metadata) +
        delimiter +
        'Content-Type: ' + contentType + '\r\n' +
        'Content-Transfer-Encoding: base64\r\n' +
        '\r\n' +
        base64Data +
        close_delim;

    var request = gapi.client.request({
        'path': '/upload/drive/v2/files',
        'method': 'POST',
        'params': {'uploadType': 'multipart'},
        'headers': {
            'Content-Type': 'multipart/mixed; boundary="' + boundary + '"'
        },
        'body': multipartRequestBody
    });
    if (!callback) {
        callback = function (file) {
            console.log(file)
        };
    }
    request.execute(callback);
}

function showFormSubmissionDialog(name) {
    //todo
    currentModal = name;
    switch (name) {
        case 'super':
            title.innerHTML = "Submit Super Choice Form";
            break;
        case 'details':
            title.innerHTML = "Submit Employee Details";
            break;
        case 'tax':
            title.innerHTML = "Submit Tax Form";
            break;
    }

    document.getElementById('files').addEventListener('change', handleFileSelectClick, false);
    disableScroll();
    window.open('#formSubmissionDialog', '_self');
}

function showAvatarDialog() {
    //todo
    document.getElementById('avatar').addEventListener('change', handleAvatar, false);
    disableScroll();
    window.open('#avatarDialog', '_self');
}

function handleAvatar(evt) {
    console.log("handleChange");
    var files = evt.target.files;
    var file = files[files.length - 1]; // FileList object.

    resize(file);
}
function handleFileSelectClick(evt) {
    var files = evt.target.files;
    var file = files[files.length - 1]; // FileList object.

    switch (name) {
        case 'super':
            loadedFiles.super = file;
            break;
        case 'details':
            loadedFiles.details = file;
            break;
        case 'tax':
            loadedFiles.tax = file;
            break;
    }
}

//todo get all the necessary details subject, to email and body text
function submitForm() {
    switch (currentModal) {
        case 'super':
            sendMessage("to.email@email.com", 'Super form submission', "Here it is: ", loadedFiles.super);
            break;
        case 'details':
            sendMessage("to.email@email.com", 'Employee details form submission', "Here it is: ", loadedFiles.super);
            break;
        case 'tax':
            sendMessage("to.email@email.com", 'Tax form submission', "Here it is: ", loadedFiles.super);
            break;
    }
    closeDialog();
}


var keys = {38: 1, 40: 1, 27: 1, 33: 1, 34: 1, 32: 1};

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;

}
function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;

}

function disableScrollBar() {
    window.addEventListener('scroll', resetScroll);
}

function enableScrollBar() {
    window.removeEventListener('scroll', resetScroll);
}

function resetScroll() {
    window.scrollTo(0, 0);
}
function closeDialog() {
    enableScroll();
    window.open('#close', '_self');
}


function uploadAvatar() {
    uploadToGoogleDrive(avatar);
    closeDialog();
}
