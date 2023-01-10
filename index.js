require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const router = require('./routes/index');
const { sequelize } = require('./models/postgresql');

const app = express();

app.use(express.json());

app.use('/api', router);

const PORT = process.env.NODE_DOCKER_PORT || 8080;

mongoose.set('strictQuery', false);

const start = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log('Successfully connected with mongo database.');
        app.emit('db-connected');
      })
      .catch((e) => console.log(e));
    await sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}.`));
  } catch (e) {
    console.log(e);
  }
};

start();
