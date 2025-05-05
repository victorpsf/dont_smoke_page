const { Router } = require('express');
const counter = require('./counter');

const route = Router();

route.use('/count', counter);

module.exports = route;