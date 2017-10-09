const TransporterConfigs = require('../mail.configs.js');
const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();

const transporter = nodemailer.createTransport(TransporterConfigs);

router.post('/', sendEmailToCandidate);

/**
 * @typedef {Object} Skills
 * @property {Number} html
 * @property {Number} css
 * @property {Number} javascript
 * @property {Number} python
 * @property {Number} django
 * @property {Number} ios
 * @property {Number} android
 */

/**
 * Mail main route handler
 * @param {{body:{skillsData:Skills}}}request
 * @param {Object} response
 */
function sendEmailToCandidate(request, response) {
    if (!request.body.skillsData || !request.body.userData) {
        response.status(500).json({success: false, message: 'Invalid body'});
        return;
    }

    MailSender(
        request.body.skillsData,
        request.body.userData.userEmail
    ).sendAll(response);

}


/**
 * @return {string}
 */
function MailContentTemplate(type) {
    return (
        'Obrigado por se candidatar, assim que tivermos uma vaga disponível ' +
        'para programador ' + (type || '') + ' entraremos em contato.'
    ).replace(/\s+/g, ' ');
}


function MailConfiguration(userEmail) {
    return (type) => ({
        from: TransporterConfigs.auth.user,
        to: userEmail,
        subject: 'Obrigado por se candidatar',
        text: MailContentTemplate(type)
    });
}


/**
 *  @param {Skills} form
 *  @param {String} userEmail
 */
function MailSender(form, userEmail) {
    const userMail = MailConfiguration(userEmail);
    const minimum = x => x >= 7;
    const isFront = minimum(form.javascript) && minimum(form.css) && minimum(form.html);
    const isBack = minimum(form.python) && minimum(form.django);
    const isMobile = minimum(form.ios) && minimum(form.android);
    const isNone = !isBack && !isFront && !isMobile;

    const sentEmails = [];

    if (isNone) {
        sentEmails.push(userMail());
    }
    else {
        if (isFront) {
            sentEmails.push(userMail('Front-End'));
        }
        if (isMobile) {
            sentEmails.push(userMail('Mobile'));
        }
        if (isBack) {
            sentEmails.push(userMail('Back-end'));
        }
    }

    return {
        sendAll(response) {
            Promise
                .all(sentEmails.map(toPromises))
                .then(function () {
                    response.status(200).json({success: true});
                })
                .catch(function (error) {
                    response.status(500).json({
                        success: false,
                        message: 'Error sending one email',
                        error: error
                    });
                });
        }
    };
}

function toPromises(mailOptions) {
    return new Promise(getMailResolver(mailOptions));
}

function getMailResolver(mailOptions) {
    return (resolve, reject) => {
        function errorHandler(error, info) {
            if (error) {
                reject(error);
            } else {
                resolve(info.response);
            }
        }

        transporter.sendMail(mailOptions, errorHandler);
    };

}


module.exports = router;