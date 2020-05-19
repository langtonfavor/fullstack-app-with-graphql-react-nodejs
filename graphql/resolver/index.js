const authResolver = require('./auth');
const eventsResolver = require('./events');
const bookingResolver = require('./booking');
const userResolver = require('./userInfor');


const rootResolver = {
  ...authResolver,
  ...eventsResolver,
  ...bookingResolver,
  ...userResolver

};

module.exports = rootResolver;