require('dotenv').config();
const express = require('express');

const router = require('./routes/index');
const { sequelize } = require('./models');

const app = express();

app.use(express.json());

app.use('/api', router);

const PORT = process.env.NODE_DOCKER_PORT || 8080;

const start = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
  } catch (e) {
    console.log(e);
  }
};

start();
