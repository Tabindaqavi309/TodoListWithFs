/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable quote-props */
const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const productRoutes = require('./todoaccess');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/todoaccess', productRoutes);
app.get('/', (req, res, result) => {
  res.status(200).json({
    message: 'Use /todoacces to get and post the todo List.\nUse /todoaccess/id to update and delete the todo List.\nUse /todoaccess/id to get see what is in it',
  });
});

module.exports = app;
