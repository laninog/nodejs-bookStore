'use strict';

let mongoose = require('mongoose');

let db = function(){
    return {
        config: function(conf){

            mongoose.connect('mongodb://localhost/bookStore', {useMongoClient: true});

            let db = mongoose.connection;

            db.on('error', console.error.bind(console, 'Connection Error'));

            db.once('open', function(){
                console.log('Connection Open');
            });
        }
    };
};

module.exports = db();