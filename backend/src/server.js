const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const connectDB = require('./db');

const app = express();


connectDB();

app.use(express.json());
app.use(cors());
app.use(routes);

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});
