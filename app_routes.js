const express = require('express');
const path = require('path');
const indexRouter = require('./modules/index_router.js');

function appRoutes(app) {
  console.log('~ appRoutes');

  app.set('views', 'views');
  app.set('view engine', 'ejs');
  app.use(express.urlencoded({ extended: true }));
  app.use('/', express.static(path.join(__dirname, './views'))); // for reading css, js and any static files
  app.use('/download/:id', express.static(path.join(__dirname, './views'))); // for reading css, js and any static files
  app.use('/uploads', express.static(path.join(__dirname, './uploads'))); // for reading uploaded files

  app.use('/', indexRouter.uploadRouter);
}

module.exports = appRoutes;
