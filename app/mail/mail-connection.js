const config = require('config');

const mail = require('mail').Mail({
    host: config.get('mail.host'),
    username: config.get('mail.username'),
    port: config.get('mail.port'),
    password: config.get('mail.password')
});

function sendMail(from, to, subject, body) {
    return new Promise((resolve, reject) => {
        mail.message({
            from: from,
            to: to,
            subject: subject
        })
        .body(body)
        .send(function(err) {
            if (err) reject(err);
            resolve('Sent!');
        });
    });
}

module.exports.sendMail = sendMail;