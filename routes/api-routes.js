// require the Twilio API SMS notification service
const sms = require('../config/twilio');
const senderNumber = '+19802220114';

//========================================| API Routes |========================================

module.exports = function(app) {
  // placeholder code
  console.log("API routes have connected");

  app.get('/api', (req, res) => {
    console.log("ROUTED");
    sms.messages.create({
      body: 'HI DZMITRY :D',
      to: '+17046146046',  // For testing - replace this with data from the user account later
      from: senderNumber
    })
    .then((message) => res.send(message.sid));
  })

}