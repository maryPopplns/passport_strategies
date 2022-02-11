require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const { logger } = require(path.join(__dirname, '../logger'));

// [ MONGO CONNECTION ]
mongoose
  .connect(process.env.MONGO_STRING_LOCAL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => logger.info('DB connection successful'))
  .catch((error) => logger.error(error));
