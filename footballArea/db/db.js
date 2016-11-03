var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/football');


exports.picModel = require('./pic');


