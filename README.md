# SendMail

A simple email send using express, webpack and yarn.
It's general idea is get a form data from an user, and 
send an email to him based on some criteria

## Setup

First, you need to setup the mail server, there's a file in this project
called `mail.configs.js` (I've only tested configs with **gmail**),
you can open it and fill these information's :

* `auth.user` your user
* `auth.pass` your password 
(If you use 2 steps verification you need 
to go [here](https://myaccount.google.com/apppasswords) 
and generate a password to use)

Once you provided the right information's you can run
`yarn install` and everything that is needed will be 
installed and generated.
You  can start the server with `npm start` and acess it at [localhost:3000/](localhost:3000/)
