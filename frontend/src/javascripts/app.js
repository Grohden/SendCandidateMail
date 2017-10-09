(function () {
    'use strict';
    /*global Materialize, $*/

    //const $ = require('jquery'); //it's already in global scope
    const partition = require('lodash/partition');
    const toasterTime = 4000;

    let isWaitingResponse = false;

    $(document).ready(function () {
        const form = $('#main_form');
        const submit = $('#submit_button');

        form.on('submit', () => submitForm(form));
        submit.on('click', () => submitForm(form));
    });

    function toNormalizedObject(field, parseNumber) {
        return {
            [field.name]: parseNumber
                ? Number(field.value)
                : field.value
        };
    }

    function objectReducer(parse) {
        return (acc, x) => Object.assign(acc, toNormalizedObject(x, parse));
    }


    function submitForm(form) {
        if(isWaitingResponse){
            Materialize.toast('Aguarde o envio do email.', toasterTime);
            return;
        }


        //Review, i should use lodash..
        const formData = partition(form.serializeArray(), field => field.name.includes('user'));

        const userData = formData[0].reduce(objectReducer(), {});
        const skillsData = formData[1].reduce(objectReducer(true), {});

        if (!userData.userName || !userData.userEmail) {
            Materialize.toast('Erro ao informação invalida no formulario.', toasterTime);
        } else {

            isWaitingResponse = true;
            fetch(location.origin + '/mail', {
                method: 'POST',
                headers: new Headers({'Content-Type': 'application/json'}),
                /* jshint ignore:start */
                body: JSON.stringify({skillsData, userData}),
                /* jshint ignore:end */
            }).then(showCallbackToUser);
        }

        return false;
    }

    function showCallbackToUser(response) {
        isWaitingResponse = false;
        if (response.ok) {
            //Need a better way to use materialize, with require!
            Materialize.toast('Enviado, cheque a sua caixa de email e de spam.', toasterTime);
        } else {
            console.error(response);
            Materialize.toast('Erro ao enviar o email. revise o seu email por favor.', toasterTime);
        }
    }
}());