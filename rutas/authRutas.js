const express = require('express');
const router = express.Router();
const authController = require('../controladores/authController');

// Ruta para que el administrador inicie sesión
// URL final será algo como: POST http://localhost:3000/api/auth/login
router.post('/login', authController.loginAdmin);

module.exports = router;