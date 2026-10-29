# 🍃 EcoNatura - Backend API

API RESTful desarrollada con **Node.js**, **Express** y **Sequelize ORM** conectada a **MySQL** para la gestión integral del sistema EcoNatura.

---

## 🚀 Requisitos Previos

Asegúrate de contar con lo siguiente instalado en tu equipo:

* [Node.js](https://nodejs.org/) (v18 o superior)
* [MySQL Server](https://www.mysql.com/) / XAMPP / WAMP
* [Git](https://git-scm.com/)

---

## 🛠️ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone [https://github.com/Erickman114/econatura-backend.git](https://github.com/Erickman114/econatura-backend.git)
cd econatura-backend

### 2. Instalar dependencias
Bash
npm install

### 3. Configurar la Base de Datos
Inicia tu servicio de MySQL.

Crea la base de datos econatura_db:

SQL
CREATE DATABASE econatura_db;
Revisa la configuración de conexión en config/database.js y ajusta tu usuario y contraseña de MySQL si es necesario.

### 4. Iniciar el servidor
Para arrancar el servidor en modo desarrollo con recarga automática:

Bash
npm run dev
O ejecuta directamente: npx nodemon app.js

El backend estará escuchando en: http://localhost:3000

Módulo,Métodos Disponibles,Rutas Base
Categorías,"GET, POST, PUT, DELETE",/categorias / /categorias/:id
Productos,"GET, POST, PUT, DELETE",/productos / /productos/:id
Clientes,"GET, POST, PUT, DELETE",/clientes / /clientes/:id
Trabajadores,"GET, POST, PUT, DELETE",/trabajadores / /trabajadores/:id
Puestos,"GET, POST, PUT, DELETE",/puestos / /puestos/:id
Pedidos,"GET, POST, PUT, DELETE",/pedidos / /pedidos/:id
Facturas,"GET, POST, PUT, DELETE",/facturas / /facturas/:id

Tecnologías Utilizadas
Node.js - Entorno de ejecución

Express.js - Framework para la creación de rutas e API REST

Sequelize - ORM para modelado y consultas a MySQL

MySQL - Base de datos relacional

CORS - Middleware de seguridad para peticiones entre dominios