function loadGmailApi() {
    gapi.client.load('gmail', 'v1', sendEmail);
}

/**
 * Print files.
 */
function sendEmail() {
    var name = document.querySelector("#name").value;
    var subject = document.querySelector("#subject").value;
    var body = document.querySelector("#body").value;

//        sendMessage('lindelwencube@yahoo.com', name + " " + subject, body);
    sendMessage('lindelwe.ncube@my.jcu.edu.au', name + " " + subject, body);
}

function sendMessage(toEmail, subject, body, attachment) {
    if (!attachment)
        return;

    var callback = function (resp) {
        console.dir(resp);
    };

    var email_lines = [];

    email_lines.push('Content-type: multipart/mixed; boundary="314159265358979323846d"');
    email_lines.push('MIME-Version: 1.0');
    //todo
    email_lines.push("From: lindelwencube.ln@gmail.com");
    email_lines.push("To: " + toEmail);
    email_lines.push("Subject: " + subject);
    email_lines.push("\n");
    email_lines.push('--314159265358979323846d');

    email_lines.push('Content-type: text/plain; charset=\"UTF-8\"');
    email_lines.push(body);
    email_lines.push("\n");
    email_lines.push('--314159265358979323846d');

    var reader = new FileReader();
    reader.onloadend = function (e) {
        // The relevant base64-encoding comes after "base64,"
        var result = e.target.result.split('base64,')[1];

        email_lines.push('Content-Type: ' + attachment.type);
        email_lines.push('MIME-Version: 1.0');
        email_lines.push('Content-Transfer-Encoding: base64');
        email_lines.push('Content-Disposition: attachment; filename="' + attachment.name + '"\n\n');
        email_lines.push("\n");
        email_lines.push(result);
        email_lines.push('--314159265358979323846d--');
        goGetEm();
    };

    reader.readAsDataURL(attachment);

    function goGetEm() {
        var email = email_lines.join("\r\n").trim();
        var base64EncodedEmail = btoa(email);

        var request = gapi.client.gmail.users.messages.send({
                    'userId': 'me',
                    'raw': base64EncodedEmail
                }
            )
            ;
        request.execute(callback);
    }
}