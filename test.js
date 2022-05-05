const accountSid = 'AC6160e0d56d4aed01922c1af740a8af2f';
const authToken = '3b25ac376c492d698b81cc1b91321264';
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
    from: 'whatsapp:+14155238886',
    body: 'Hello there!',
    to: 'whatsapp:+918448245365',
  })
  .then((message) => console.log(message.sid));
