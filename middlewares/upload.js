const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configuración reutilizable del almacenamiento
const obtenerStorage = (carpetaEntidad) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      const rutaDestino = path.join(__dirname, `../uploads/${carpetaEntidad}`);
      if (!fs.existsSync(rutaDestino)) {
        fs.mkdirSync(rutaDestino, { recursive: true });
      }
      cb(null, rutaDestino);
    },
    filename: (req, file, cb) => {
      const sufijoUnico = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname).toLowerCase();
      cb(null, `${sufijoUnico}${extension}`);
    }
  });
};

// Filtro de tipos de archivo permitidos
const fileFilter = (req, file, cb) => {
  const tiposPermitidos = /jpeg|jpg|png|webp|gif/;
  const extValida = tiposPermitidos.test(path.extname(file.originalname).toLowerCase());
  const mimeValido = tiposPermitidos.test(file.mimetype);

  if (extValida && mimeValido) {
    return cb(null, true);
  }
  cb(new Error('Formato de archivo no válido. Solo se permiten imágenes (JPG, JPEG, PNG, WEBP, GIF)'));
};

/**
 * Middleware para MÚLTIPLES imágenes 
 */
const handleUploadMultiple = (carpetaEntidad, campoFormulario = 'imagenes', maxConteo = 3) => {
  const upload = multer({
    storage: obtenerStorage(carpetaEntidad),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
  }).array(campoFormulario, maxConteo);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
          data: null
        });
      }
      next();
    });
  };
};

/**
 * Middleware para UNA SOLA imagen 
 */
const handleUploadSingle = (carpetaEntidad, campoFormulario = 'imagen') => {
  const upload = multer({
    storage: obtenerStorage(carpetaEntidad),
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
  }).single(campoFormulario);

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
          data: null
        });
      }
      next();
    });
  };
};

module.exports = {
  handleUploadMultiple,
  handleUploadSingle
};