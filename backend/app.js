const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();
const routes = require('./src/routes');

const notFoundMiddleware = require('./src/middlewares/not-found');
const handleErrorMiddleware = require('./src/middlewares/handle-error');

require('dotenv').config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

console.log('[+] Server Running [+]');
console.log(`[+] Port: ${process.env.SERVER_PORT} [+]`);

module.exports = app;
