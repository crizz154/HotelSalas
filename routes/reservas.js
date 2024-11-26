const express = require('express');
const router = express.Router();

// Datos ficticios (en un caso real usarías una base de datos)
let reservas = [
  { id: 1, salaId: 1, nombreReservante: 'Juan Pérez', fechaInicio: '2024-12-01T10:00:00', fechaFin: '2024-12-01T12:00:00' },
  { id: 2, salaId: 2, nombreReservante: 'María López', fechaInicio: '2024-12-02T14:00:00', fechaFin: '2024-12-02T16:00:00' }
];

// Obtener todas las reservas
router.get('/', (req, res) => {
  res.json(reservas);
});

// Crear una nueva reserva
router.post('/', (req, res) => {
  const { salaId, nombreReservante, fechaInicio, fechaFin } = req.body;

  if (!salaId || !nombreReservante || !fechaInicio || !fechaFin) {
    return res.status(400).json({ error: 'SalaId, nombreReservante, fechaInicio y fechaFin son requeridos' });
  }

  const nuevaReserva = {
    id: reservas.length + 1, // Generar nuevo ID
    salaId,
    nombreReservante,
    fechaInicio,
    fechaFin
  };

  reservas.push(nuevaReserva);
  res.status(201).json(nuevaReserva);
});

// Editar una reserva existente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { salaId, nombreReservante, fechaInicio, fechaFin } = req.body;

  let reserva = reservas.find(r => r.id === parseInt(id));
  if (!reserva) {
    return res.status(404).json({ error: 'Reserva no encontrada' });
  }

  reserva.salaId = salaId || reserva.salaId;
  reserva.nombreReservante = nombreReservante || reserva.nombreReservante;
  reserva.fechaInicio = fechaInicio || reserva.fechaInicio;
  reserva.fechaFin = fechaFin || reserva.fechaFin;

  res.json(reserva);
});

// Eliminar una reserva
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = reservas.findIndex(r => r.id === parseInt(id));

  if (index === -1) {
    return res.status(404).json({ error: 'Reserva no encontrada' });
  }

  reservas.splice(index, 1);
  res.status(204).send(); // No content
});

module.exports = router;

