const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

const flashKeys = {
  fileError: 'fileError',
  fileDownloadLink: 'fileDownloadLink',
  fileNotFound: 'fileNotFound',
  passwordIncorrect: 'passwordIncorrect',
  oldInputs: 'oldInputs',
};

function connectFlash(app, uri) {
  console.log('~ connectFlash');

  const store = new MongoDBStore({
    uri,
    collection: 'mySessions',
  });

  app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      store,
    }),
  );

  app.use(flash());
}

module.exports = { connectFlash, flashKeys };
