'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const server = express();
server.use(cors());
const PORT = process.env.PORT;

//connection to the test database on our locally running instance of MongoDB.
mongoose.connect('mongodb://localhost:27017/bookData', {useNewUrlParser: true, useUnifiedTopology: true});

const BookSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  email:String,
});

const Books = mongoose.model('Kitten', BookSchema );








server.get('/test', (req, res) => {
  res.send('Test Connected!')
})

server.listen(PORT, () => console.log(`listening on ${PORT}`));


