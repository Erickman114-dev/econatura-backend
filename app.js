/*const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use('/libros',require('./rutas/libroRutas'));
app.use('/puestos',require('./rutas/puestoRutas'));
app.use('/categorias',require('./rutas/categoriasRutas'));
app.use('/clientes',require('./rutas/clientesRutas'));
app.use('/trabajadores',require('./rutas/trabajadoresRutas'));
app.use('/productos',require('./rutas/productosRutas'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});*/

// app.js
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./modelos');
const apiRutas = require('./rutas');
const path = require('path');

const app = express();

// Middlewares obligatorios
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servidor de contenido estático para la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Montaje de rutas API (http://localhost:3000/productos)
app.use(apiRutas);

const PORT = process.env.PORT || 3000;

// Autenticación, sincronización con MySQL e inicio del servidor
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión con MySQL/Sequelize establecida con éxito.');
    return sequelize.sync({ alter: false });
  })
  .then(() => {
    console.log('✅ Modelos sincronizados correctamente.');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor de EcoNatura corriendo en el puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error crítico al iniciar la aplicación:', error.message);
  });
