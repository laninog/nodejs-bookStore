'use strict';

let express = require('express');
let kraken = require('kraken-js');
let flash = require('connect-flash');
let helpers = require('dustjs-helpers');

let db = require('./lib/db');

let options, app;

/*
 * Create and configure application. Also exports application instance for use by tests.
 * See https://github.com/krakenjs/kraken-js#options for additional configuration options.
 */
options = {
    onconfig: function (config, next) {
        /*
         * Add any additional config setup or overrides here. `config` is an initialized
         * `confit` (https://github.com/krakenjs/confit/) configuration object.
         */
        db.config(config.get('databaseConfig'));
        next(null, config);
    }
};

app = module.exports = express();
app.use(kraken(options));

// Connect flash
app.use(flash());
app.use(function (req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
