
const twilio = require('twilio');
const keys = require('./keys.js');
let client = new twilio(keys.twilio.accountSid, keys.twilio.authToken);

console.log("Twilio service connected");

// Our Twilio phone number - '+1902220114'

// client.messages.create({
//   body: 'Hello from Node',
//   to: '+17049062487',  // Text this number
//   from: '+19802220114' // From a valid Twilio number
// })
// .then((message) => console.log(message.sid));

module.exports = client;