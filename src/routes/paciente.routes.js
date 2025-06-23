const express = require('express');
const router = express.Router();
const Paciente = require('../models/pacienteModel');

// POST - Crear paciente
router.post('/pacientes', async (req, res) => {
  try {
    const nuevoPaciente = new Paciente(req.body);
    const guardado = await nuevoPaciente.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET - Obtener todos los pacientes
router.get('/pacientes', async (req, res) => {
  try {
    const pacientes = await Paciente.find();
    res.json(pacientes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Obtener paciente por ID
router.get('/pacientes/:id', async (req, res) => {
  try {
    const paciente = await Paciente.findById(req.params.id);
    if (!paciente) return res.status(404).json({ error: 'No encontrado' });
    res.json(paciente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Actualizar paciente por ID
router.put('/pacientes/:id', async (req, res) => {
  try {
    const actualizado = await Paciente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ error: 'No encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Eliminar paciente por ID
router.delete('/pacientes/:id', async (req, res) => {
  try {
    const eliminado = await Paciente.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Paciente eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;