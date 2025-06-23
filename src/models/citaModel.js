const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
  pacienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Paciente', required: true },
  dentistaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dentista', required: true },
  fecha: { type: Date, required: true },
  motivo: { type: String },
  estado: { type: String, enum: ['pendiente', 'confirmada', 'cancelada', 'completada'], default: 'pendiente' }
});

module.exports = mongoose.model('Cita', citaSchema);