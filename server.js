const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const port = process.env.PORT | 8080;
const clientPath = path.join(__dirname, 'client/build');

app.use(express.static(clientPath));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(path.join(clientPath, 'index.html'));
});

app.get('/api', (req, res) => {
  res.json({
    message: 'Welcome to my API!',
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});