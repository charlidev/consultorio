const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  email: { type: String, required: true },
  fechaRegistro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Paciente', pacienteSchema);