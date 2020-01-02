const express = require('express');
const bodyParser = require("body-parser");
require ('./database/mongoose');
//declaring dotenv inorder to read .env file necessary for token gen
const dotenv = require('dotenv').config();

const app = express();
const user = require('./routers/userrouter');
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.json());
app.use(user);
app.listen(4000);