const express = require('express');
const bodyParser = require('body-parser');

const router = require('./routes/index');
const { sequelize } = require('./models');

const app = express();

app.use('/api', router);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.json());

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
