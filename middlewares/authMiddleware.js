// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const verificarTokenAdmin = (req, res, next) => {
  // El token normalmente viaja en los headers como: "Bearer eyJhbGci..."
  const authHeader = req.header('Authorization');

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Acceso denegado. Se requiere token de administrador.' });
  }

  const token = authHeader.split(' ')[1]; // Extraer solo el token sin la palabra "Bearer"

  try {
    const decodificado = jwt.verify(token, process.env.JWT_SECRET || 'mi_clave_secreta_super_segura');
    req.admin = decodificado; // Guardar los datos del admin en la request
    next(); // Permitir el paso a la ruta
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Token inválido o expirado.' });
  }
};

module.exports = { verificarTokenAdmin };