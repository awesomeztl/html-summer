var mongoose = require('mongoose');

var testDB = "mongodb://localhost/usersdb";
mongoose.connect(testDB, function (err) {
    if (err) {
        console.log('fail');
    } else {
        console.log('success');
    }
});
module.exports = mongoose;