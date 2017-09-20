// require the Twilio API SMS notification service
const sms = require('../config/twilio');
const senderNumber = '+19802220114';

//========================================| API Routes |========================================

module.exports = function(app) {
  // placeholder code
  console.log("API routes have connected");

  app.get('/test', (req, res) => {
    console.log("Test SMS sent");
    sms.messages.create({
      body: 'Richard: your turn!',
      to: '+17049062487',  // For testing - replace this with data from the user account later
      from: senderNumber
    })
    .then((message) => res.send(message.sid));
  })

}