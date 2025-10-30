const moongose = require('mongoose');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const PORT = process.env.PORT || 3001;
const mongoURI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(mongoURI)
    .then(() => console.log("Conectado ao MongoDb Atlas"))
    .catch(error => {
        console.error("Falha na Conexão ao MongoDB", error.message);
        process.exit(1);
    })
const generateToken = (id) => {
    return jwt.sign({ id }, JWT_SECRET, { expiresIn: '1d' })
}

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            jwt.verify(token, JWT_SECRET);
            next()
        } catch(error) {
            return res.status(401).json({mensagem: "Não autorizado, token inválido"})
        }
    }

}