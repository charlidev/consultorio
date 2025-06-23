const express = require('express');
const router = express.Router();
const Dentista = require('../models/dentistaModel');

// POST - Crear dentista
router.post('/dentistas', async (req, res) => {
  try {
    const nuevoDentista = new Dentista(req.body);
    const guardado = await nuevoDentista.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET - Obtener todos
router.get('/dentistas', async (req, res) => {
  try {
    const dentistas = await Dentista.find();
    res.json(dentistas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET - Obtener por ID
router.get('/dentistas/:id', async (req, res) => {
  try {
    const dentista = await Dentista.findById(req.params.id);
    if (!dentista) return res.status(404).json({ error: 'No encontrado' });
    res.json(dentista);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT - Actualizar por ID
router.put('/dentistas/:id', async (req, res) => {
  try {
    const actualizado = await Dentista.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ error: 'No encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE - Eliminar por ID
router.delete('/dentistas/:id', async (req, res) => {
  try {
    const eliminado = await Dentista.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'No encontrado' });
    res.json({ mensaje: 'Dentista eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;