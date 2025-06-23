const express = require('express');
const router = express.Router();
const Cita = require('../models/citaModel');

// POST - Crear cita
router.post('/citas', async (req, res) => {
  try {
    const nuevaCita = new Cita(req.body);
    const guardada = await nuevaCita.save();
    res.status(201).json(guardada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET - Obtener todas las citas con datos de paciente y dentista
router.get('/citas', async (req, res) => {
  try {
    const citas = await Cita.find()
      .populate('pacienteId', 'nombre email')
      .populate('dentistaId', 'nombre especialidad');
    res.json(citas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Obtener cita por ID
router.get('/citas/:id', async (req, res) => {
  try {
    const cita = await Cita.findById(req.params.id)
      .populate('pacienteId', 'nombre email')
      .populate('dentistaId', 'nombre especialidad');

    if (!cita) return res.status(404).json({ error: 'No encontrada' });
    res.json(cita);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Actualizar cita
router.put('/citas/:id', async (req, res) => {
  try {
    const actualizada = await Cita.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizada) return res.status(404).json({ error: 'No encontrada' });
    res.json(actualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Eliminar cita
router.delete('/citas/:id', async (req, res) => {
  try {
    const eliminada = await Cita.findByIdAndDelete(req.params.id);
    if (!eliminada) return res.status(404).json({ error: 'No encontrada' });
    res.json({ mensaje: 'Cita eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;