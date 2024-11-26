// Importar las dependencias necesarias
const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const http = require('http');  
const cors = require('cors');
const server = http.createServer(app);
// Middleware para parsear cuerpos de solicitudes en formato JSON
app.use(express.json());

// Middleware para servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'public')));

// Datos ficticios para salas y reservas (en una aplicación real usarías una base de datos)
let salas = [
  { id: 1, nombre: 'Sala 1', capacidad: 10, estado: 'activo' },
  { id: 2, nombre: 'Sala 2', capacidad: 20, estado: 'activo' },
  { id: 3, nombre: 'Sala 3', capacidad: 5, estado: 'inactivo' }
];

let reservas = [
  { id: 1, salaId: 1, nombreReservante: 'Juan Pérez', fechaInicio: '2024-12-01T10:00:00', fechaFin: '2024-12-01T12:00:00' },
  { id: 2, salaId: 2, nombreReservante: 'María López', fechaInicio: '2024-12-02T14:00:00', fechaFin: '2024-12-02T16:00:00' }
];

// Importar las rutas de salas y reservas
const salasRoutes = require('./routes/salas');
const reservasRoutes = require('./routes/reservas');

// Usar las rutas importadas
app.use('/salas', salasRoutes);
app.use('/reservas', reservasRoutes);

// Iniciar el servidor en el puerto 3000
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${port}`);
});
