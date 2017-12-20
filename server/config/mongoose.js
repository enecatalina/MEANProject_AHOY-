var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var models_path = path.join(__dirname, './../models');

mongoose.connect('mongodb://localhost/Ahoy')
    .then(() => console.log('connection AHOY! successful'))
    .catch((err) => console.error(err));
fs.readdirSync(models_path).forEach(function (file) {
    if (file.indexOf('.js') >= 0) {
        require(models_path + '/' + file);
    }
});