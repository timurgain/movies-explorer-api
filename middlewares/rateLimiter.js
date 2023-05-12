const rateLimiter = require('express-rate-limit');

module.exports = rateLimiter({
  max: 5,
  windowMS: 5000, // 5 seconds
  message: { message: 'You have exceeded the allowed request limit. Try again later.'},
});
