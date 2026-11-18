const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// Importamos el modelo Trabajador (ya no Administrador)
const { Trabajador } = require('../modelos'); 

module.exports = {
  loginAdmin: async (req, res) => {
    try {
      const { correo, contrasena } = req.body;

      // 1. Buscar al trabajador por correo y que esté ACTIVO
      const trabajador = await Trabajador.findOne({ 
        where: { correo: correo, estado: 'ACTIVO' } 
      });

      if (!trabajador) {
        return res.status(404).json({ 
          success: false, 
          message: 'Usuario no encontrado o inactivo' 
        });
      }

      // 2. Verificar que su puesto sea de Administrador (puesto_id === 1)
      if (trabajador.puesto_id !== 1) {
        return res.status(403).json({ 
          success: false, 
          message: 'Acceso denegado. Se requieren permisos de administrador.' 
        });
      }

      // 3. Comparar la contraseña ingresada con la encriptada en la BD
      const passwordValida = await bcrypt.compare(contrasena, trabajador.contrasena);
      
      if (!passwordValida) {
        return res.status(401).json({ 
          success: false, 
          message: 'Correo o contraseña incorrectos' 
        });
      }

      // 4. Generar el Token JWT
      const token = jwt.sign(
        { 
          id: trabajador.id, 
          rol: 'ADMIN',
          puesto: trabajador.puesto_id 
        }, 
        process.env.JWT_SECRET || 'mi_clave_secreta_super_segura', 
        { expiresIn: '8h' }
      );

      // 5. Enviar respuesta exitosa
      return res.status(200).json({
        success: true,
        message: 'Bienvenido al panel de administración',
        token: token,
        admin: { 
          id: trabajador.id, 
          nombre: trabajador.nombre,
          apellido: trabajador.apellido,
          correo: trabajador.correo 
        }
      });

    } catch (error) {
      return res.status(500).json({ 
        success: false, 
        message: 'Error en el servidor al intentar iniciar sesión', 
        error: error.message 
      });
    }
  }
};