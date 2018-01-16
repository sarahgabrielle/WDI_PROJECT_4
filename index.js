require('newrelic');

const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const sockets = require('./lib/sockets');
sockets.connect(server);

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.plugin(require('./lib/globalToJSON'));
mongoose.plugin(require('mongoose-unique-validator'));

const morgan = require('morgan');
const bodyParser = require('body-parser');
const { port, dbURI, env } = require('./config/environment');
const routes = require('./config/routes');
const customResponses = require('./lib/customResponses');
const errorHandler = require('./lib/errorHandler');

mongoose.connect(dbURI, { useMongoClient: true });

if('test' !== env) app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json({ limit: '50mb' }));

app.use(customResponses);

app.use('/api', routes);
app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));

app.use(errorHandler);

if (env !== 'test') {
  server.listen(port, () => console.log(`Express is up and running on port ${port}`));
} else {
  module.exports = app;
}
