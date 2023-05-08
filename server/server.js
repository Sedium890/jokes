const express = require('express');
const mongoose = require('mongoose');
const jokesRouter = require('./routes/jokes.routes');

const app = express();
require('./config/mongoose.config')

app.use(express.json());
app.use('/api', jokesRouter);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});