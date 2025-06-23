const mongoose = require('mongoose');

const dentistaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  especialidad: { type: String },
  email: { type: String, required: true }
});

module.exports = mongoose.model('Dentista', dentistaSchema);