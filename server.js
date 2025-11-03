require('dotenv').config()

const API_URL = 'http://localhost:3004/server.js';
const moongose = require('mongoose');
const cors = require ('cors');
const express = require ('express');
const jwt = require ('jsonwebtoken');

const User = require ('User');
const { default: mongoose } = require('mongoose');

//conexão do mongodb

mongoose.connect(mongoURI)  
    .then(() => console.log('Conectado ao Mongo DB'))




