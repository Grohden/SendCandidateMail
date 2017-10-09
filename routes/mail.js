const TransporterConfigs = require('../mail.configs.js');
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

const transporter = nodemailer.createTransport(TransporterConfigs);

router.post('/', sendEmailToCandidate);

function sendEmailToCandidate(request, response) {
    if(!request.body.skillsData || !request.body.userData){
        response.status(500).json({success: false, error: "Invalid body"});
        return;
    }

    const suits = Suits(request.body.skillsData);
    if (suits.forFrontend()) {
        //send frontend email
    } else if(suits.forMobile()){
        //send mobile email
    } else if(suits.forBackend()){
        //send backend email
    }
    return;

    const text = 'Hello there';

    const mailOptions = {
        from: TransporterConfigs.auth.user,
        to: 'gabrielrodhem@gmail.com', // list of receivers
        subject: 'Hey, we just sent you an email!', // Subject line
        text: text
        //html: '' use pug view here
    };

    transporter.sendMail(mailOptions, sentCallback(response));
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
    };
}

/**
 * @typedef {Object} SentForm
 * @property {Number} python
 * @property {Number} ios
 * @property {Number} android
 * @property {Number} css
 * @property {Number} javascript
 */

/** @param {SentForm} form */
function Suits(form) {

    return {
        /** @return boolean */
        forFrontend() {
            return form.javascript > 7;
        },

        /** @return boolean */
        forBackend() {
            return form.javascript > 7;
        },

        /** @return boolean */
        forMobile() {
            return form.javascript > 7;
        }
    };
}

module.exports = router;