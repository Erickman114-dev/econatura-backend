const fs = require('fs');
const path = require('path');

/**
 * Elimina un archivo del servidor si existe.
 * @param {string} rutaRelativa 
 */
const borrarImagen = (rutaRelativa) => {
if (!rutaRelativa) return;

  // Limpiar el / inicial para construir la ruta absoluta correcta
const rutaLimpia = rutaRelativa.startsWith('/') ? rutaRelativa.substring(1) : rutaRelativa;
const rutaAbsoluta = path.join(__dirname, '..', rutaLimpia);

if (fs.existsSync(rutaAbsoluta)) {
    fs.unlink(rutaAbsoluta, (err) => {
if (err) {
        console.error(`Error al eliminar el archivo ${rutaAbsoluta}:`, err);
}
    });
}
};

module.exports = { borrarImagen };