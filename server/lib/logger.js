
const bunyan = require('bunyan');

module.exports = bunyan.createLogger({
  name: 'MEC search',
  src: true,
});
