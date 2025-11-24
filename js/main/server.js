
const API_URL = 'http://localhost:3004';

require('dotenv').config()

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const PORT = process.env.PORT || 3004;
const mongoURI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose.connect(mongoURI)
    .then(() => console.log("Conectado ao MongoDb Atlas"))
    .catch(error => {
        console.error("Falha na Conexão ao MongoDB", error.message);
        process.exit(1);
    })



const User = require('./User');






//conexão do mongodb

    mongoose.connect(mongoURI)  
    .then(() => console.log('Conectado ao Mongo DB'))
    .catch(error => {
        console.error('conexão ao mongo db falhou', error.message);
        process.exit(1);
    })

//Função que gera o token de login

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
        } catch (error) {
            return res.status(401).json({ mensagem: "Não autorizado, token inválido" })
        }
    }
}



//Criando minha aplicação
const app = express()

//Permitir trabalhar com json
app.use(express.json())
app.use(cors())

// Registro de usuário
app.post('/api/register-user', async (req, res) => {

    const { name, email, password } = req.body 
    try {
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.status(400).json({ mensagem: "Email já cadastrado" })
        }

        const user = await User.create({ name, email, password }) 
        res.status(201).json({ mensagem: "Usuário criado com sucesso" })
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no registro", erro: error.message })
    }
})

// GET para pegar todos os IDs dos usuários
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find().select('_id name email');
        res.json(users);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar usuários", erro: error.message });
    }
});

// GET para pegar um usuário específico pelo ID
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('_id name email');
        if (!user) {
            return res.status(404).json({ mensagem: "Usuário não encontrado" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ mensagem: "Erro ao buscar usuário", erro: error.message });
    }
});

//LOGIN DE USUÁRIO
app.post('/api/login-user', async (req, res) => {
    const { email, password } = req.body
    try {

        
        const user = await User.findOne({ email }).select('+password'); 


        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id),
                mensagem: "Login Realizado com sucesso"
            })
        } else {
            res.status(401).json({ mensagem: "Email ou Senha Inválidos" })
        }
    } catch (error) {
        res.status(500).json({ mensagem: "Erro no login", erro: error.message })
    }
});

// PUT para atualizar perfil (nome e email)
app.put('/api/users/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        
        // Validar se o ID é um ObjectId válido
        if (!id || id === 'undefined' || id === 'null' || id.length !== 24) {
            return res.status(400).json({ mensagem: "ID do usuário inválido" });
        }
        
        if (!name) {
            return res.status(400).json({ mensagem: "Nome é obrigatório" });
        }
        
        const usuarioAtualizado = await User.findByIdAndUpdate(
            id,
            { name, email },
            { new: true, runValidators: true }
        );
        
        if (!usuarioAtualizado) {
            return res.status(404).json({ mensagem: "Usuário Não Encontrado" });
        }
        
        res.json({ mensagem: "Perfil atualizado com sucesso", user: usuarioAtualizado });
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        res.status(400).json({ mensagem: "Erro ao atualizar", erro: error.message });
    }
});

// PUT para atualizar senha
app.put('/api/users/:id/password', async (req, res) => {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;
        
        // Validar se o ID é um ObjectId válido
        if (!id || id === 'undefined' || id === 'null' || id.length !== 24) {
            return res.status(400).json({ mensagem: "ID do usuário inválido" });
        }
        
        if (!newPassword || newPassword.length < 8) {
            return res.status(400).json({ mensagem: "Senha deve ter no mínimo 8 caracteres" });
        }
        
        const usuario = await User.findById(id);
        if (!usuario) {
            return res.status(404).json({ mensagem: "Usuário Não Encontrado" });
        }
        
        usuario.password = newPassword;
        await usuario.save();
        
        res.json({ mensagem: "Senha atualizada com sucesso" });
    } catch (error) {
        console.error('Erro ao atualizar senha:', error);
        res.status(400).json({ mensagem: "Erro ao atualizar senha", erro: error.message });
    }
});

app.listen(PORT, () => console.log(`servidor rodando na porta ${PORT}`))
