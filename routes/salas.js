const express = require('express');
const router = express.Router();

// Datos ficticios (en un caso real usarías una base de datos)
let salas = [
  { id: 1, nombre: 'Sala 1', capacidad: 10, estado: 'activo' },
  { id: 2, nombre: 'Sala 2', capacidad: 20, estado: 'activo' },
  { id: 3, nombre: 'Sala 3', capacidad: 5, estado: 'inactivo' }
];

// Obtener todas las salas
router.get('/', (req, res) => {
  res.json(salas);
});

// Crear una nueva sala
router.post('/', (req, res) => {
  const { nombre, capacidad, estado } = req.body;
  if (!nombre || !capacidad) {
    return res.status(400).json({ error: 'Nombre y capacidad son requeridos' });
  }

  const nuevaSala = {
    id: salas.length + 1, // Generar un nuevo ID
    nombre,
    capacidad,
    estado: estado || 'activo' // Estado por defecto es 'activo'
  };

  salas.push(nuevaSala);
  res.status(201).json(nuevaSala);
});

// Editar una sala existente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, capacidad, estado } = req.body;

  let sala = salas.find(s => s.id === parseInt(id));
  if (!sala) {
    return res.status(404).json({ error: 'Sala no encontrada' });
  }

  sala.nombre = nombre || sala.nombre;
  sala.capacidad = capacidad || sala.capacidad;
  sala.estado = estado || sala.estado;

  res.json(sala);
});

// Eliminar una sala
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = salas.findIndex(s => s.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Sala no encontrada' });
  }

  salas.splice(index, 1);
  res.status(204).send(); // No content
});

module.exports = router;

