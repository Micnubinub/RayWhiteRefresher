/**
 * Created by linde on 22-Sep-15.
 */
var accessToken;
function uploadR() {
    console.log("upload");
    gapi.savetodrive.go('container');
    function loadClient(callback) {
        gapi.client.load('drive', 'v2', callback);
    }


    //var content = new Blob(["Hello world"], {"type": "text/plain"});
    //var uploader = new MediaUploader({
    //    file: content,
    //    token: accessToken,
    //    onComplete: function (data) {
    //        console.log("completed successfully: ");
    //        console.dir(data);
    //
    //    },
    //    onError: function (data) {
    //        console.log("failed: ");
    //        console.dir(data);
    //    }
    //});
    //uploader.upload();
}