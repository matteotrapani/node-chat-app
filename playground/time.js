var moment = require('moment');

// var date = new Date();
// var months = ['Jan', 'Feb'];
// console.log(date.getMonth());

// var date = moment();

// date.subtract(1, 'year');
// console.log(date.format('MMM Do, YYYY'));

var timestamp = moment().valueOf();
console.log(timestamp);

var createdAt = 1234;
var dateTime = moment(1234);
console.log(dateTime.format('h:mm a'));
