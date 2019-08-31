var mongoose = require('mongoose');

var testDB = "mongodb://114.115.247.10/usersdb";
mongoose.connect(testDB, function (err) {
    if (err) {
        console.log('fail');
    } else {
        console.log('success');
    }
});
module.exports = mongoose;