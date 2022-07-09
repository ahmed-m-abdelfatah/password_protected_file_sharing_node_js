const rateLimit = require('express-rate-limit');

function runningRateLimit(app) {
  console.log('~ runningRateLimit');

  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 50, // Limit each IP to 50 requests per `window` (here, per 10 minutes)
    message: 'You have exceeded the 50 requests in 10 minutes limit!',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  app.use('/', limiter);
}

module.exports = runningRateLimit;
