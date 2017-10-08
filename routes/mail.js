import {TransporterConfigs} from 'mail.configs';

const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

const transporter = nodemailer.createTransport(TransporterConfigs);

router.get('/', handleSayHello); // handle the route at yourdomain.com/sayHello

function handleSayHello(req, res) {
    // Not the movie transporter!

    var text = 'Hello world from \n\n'; //+ req.body.name;

    const mailOptions = {
        from: TransporterConfigs.auth.user,
        to: 'gabrielrodhem@gmail.com', // list of receivers
        subject: 'Email Example', // Subject line
        text: text
    };

    transporter.sendMail(mailOptions, sentCallback(res));
}

function sentCallback(res) {

    return function (error, info) {
        if (error) {
            console.log(error);
            res.json({yo: 'error'});
        } else {
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        }
    }
}

module.exports = router;