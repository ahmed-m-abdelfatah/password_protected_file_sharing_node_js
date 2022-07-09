require('dotenv').config();
const express = require('express');
const runningRateLimit = require('./services/rate_limit.js');
const appRoutes = require('./app_routes.js');
const connectDB = require('./DB/connect_db.js');
const { connectFlash } = require('./services/connect_flash.js');
const runningCors = require('./services/cors.js');

const port = process.env.PORT;
const app = express();
runningCors(app);

const localDB = process.env.DB_LOCAL_URI;
const globalDB = process.env.DB_GLOBAL_URI;

runningRateLimit(app);
// connectFlash(app, localDB);
connectFlash(app, globalDB);
appRoutes(app);
// connectDB(localDB);
connectDB(globalDB);

app.listen(port, () => {
  console.log('running......', port);
});
