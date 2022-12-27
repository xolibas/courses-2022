const express = require('express');
const router = require('./routes/index');

const app = express();

app.use('/api', router);
app.use(express.json());

const PORT = process.env.NODE_DOCKER_PORT || 8080;

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
  } catch (e) {
    console.log(e);
  }
};

start();
