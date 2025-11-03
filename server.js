const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // Para Tokens
const bcrypt = require('bcryptjs'); //Para criptografia