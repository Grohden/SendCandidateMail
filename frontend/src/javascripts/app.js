(function(){
    'use strict';
    /*global Materialize, $*/

    //const $ = require('jquery'); //it's already in global scope
    const partition = require('lodash/partition');

    let isWaitingRespose = false;

    $(document).ready(function(){
       const form = $('#main_form');
       const submit = $('#submit_button');

       form.on('submit', () => submitForm(form));
       submit.on('click', () => submitForm(form));
    });

    function toNormalizedObject(parseNumber) {
        return field => ({
            [field.name]: parseNumber
                ? Number(field.value)
                : field.value
        });
    }

    function submitForm(form) {


        //Review, i should use lodash..
        const data = partition(form.serializeArray(), field => field.name.includes('user'));

        fetch(location.origin + '/mail',{
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            /* jshint ignore:start */
            body: JSON.stringify({
                userData: { ...data[0].map(toNormalizedObject())},
                skillsData: { ...data[1].map(toNormalizedObject(true))}
            }),
            /* jshint ignore:end */
        }).then(showCallbackToUser);

        return false;
    }

    function showCallbackToUser(response){
        const time = 4000;
        if(response.ok){
            //Need a better way to use materialize, with require!
            Materialize.toast('Enviado, cheque a sua caixa de email e de spam.', time);
        } else {
            Materialize.toast('Erro ao enviar o email. revise o seu email por favor.', time);
        }
    }
}());