const express = require('express');
const cors = require('cors');
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

//Endpoint para pacientes
const pacienteRoutes = require('./routes/paciente.routes');
app.use('/api', pacienteRoutes);

//Enbpoint para citas
const citaRoutes = require('./routes/cita.routes');
app.use('/api', citaRoutes);

// Endpoint para dentistas
const dentistaRoutes = require('./routes/dentista.routes');
app.use('/api', dentistaRoutes);

module.exports = app;