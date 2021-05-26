const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/users', require('./routes/user-route.js'));
app.use('/api', require('./routes/auth-route.js'));
app.use('/api/categories', require('./routes/category-route'));
app.use('/api/articles', require('./routes/article-route'));

module.exports = app;
