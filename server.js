const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./src/models/index');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

db.sequelize.authenticate()
  .then(() => {
    console.log('Connecting to the database...');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => console.log('Unable to connect to the database. Error: ' + err));
