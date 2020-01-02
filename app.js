require('express-async-errors');
const express = require('express');
const { logger } = require('./app/utils/logger');

process.on('unhandledException', (ex) => {
  logger.error('Got an unhandled exception', ex);
  process.exit(1);
});

process.on('unhandledRejection', (ex) => {
  logger.error('Got an unhandled rejection', ex);
  process.exit(1);
});

require('./startup/config')();
const app = express();
require('./startup/express-config')(app);
require('./startup/routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    logger.info(`listening on http://localhost:${PORT}!`);
});