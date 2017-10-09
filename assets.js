const path = require('path');
const modules = pathArg => path.resolve(__dirname, `./node_modules/${pathArg}`);
const build = pathArg => path.resolve(__dirname, `frontend/build/${pathArg}`);

//'materialize-css/dist/*.min.*'

//Need to  look at this : https://github.com/webpack-contrib/copy-webpack-plugin/issues/141
module.exports = [
    {
        from: modules('materialize-css/dist/**/*.min.*'),
        to: build('materialize-css')
    },
    {
        from: modules('materialize-css/dist/fonts/**/*'),
        to: build('materialize-css')
    },
    {
        from: modules('jquery/dist/jquery.min.js'),
        to: build('node_modules/jquery/dist/')
    }
];