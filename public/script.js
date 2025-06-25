// Variables de control
let modoEdicion = false;
let idPacienteEditar = null;
let idDentistaEditar = null;

// CODIGO PARA LA PÁGINA DE PACIENTES
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('pacientes.html')) {
    cargarPacientes();
  }
  if (window.location.pathname.includes('dentistas.html')) {
    cargarDentistas();
  }
});

function cargarPacientes() {
  fetch('http://localhost:3000/api/pacientes')
    .then(res => res.json())
    .then(pacientes => {
      const tbody = document.getElementById('tabla-pacientes');
      tbody.innerHTML = '';

      pacientes.forEach(p => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${p.nombre}</td>
            <td>${p.telefono}</td>
            <td>${p.email}</td>
            <td>
                <button class="btn-editar" data-id="${p._id}">Editar</button>
                <button class="btn-eliminar" data-id="${p._id}">Eliminar</button>
            </td>
         `;
        tbody.appendChild(fila);
      });

      const botonesEliminar = document.querySelectorAll('.btn-eliminar');
      botonesEliminar.forEach(boton => {
        boton.addEventListener('click', () => {
          const id = boton.dataset.id;
          if (confirm('¿Estás seguro de eliminar este paciente?')) {
            fetch(`http://localhost:3000/api/pacientes/${id}`, {
              method: 'DELETE'
            })
              .then(res => res.json())
              .then(() => cargarPacientes());
          }
        });
      });

      const botonesEditar = document.querySelectorAll('.btn-editar');
      botonesEditar.forEach(boton => {
        boton.addEventListener('click', () => {
          const id = boton.dataset.id;
          fetch(`http://localhost:3000/api/pacientes/${id}`)
            .then(res => res.json())
            .then(paciente => {
              form.nombre.value = paciente.nombre;
              form.telefono.value = paciente.telefono;
              form.email.value = paciente.email;
              modoEdicion = true;
              idPacienteEditar = paciente._id;
              form.querySelector('button[type="submit"]').textContent = 'Actualizar';
              modal.style.display = 'block';
            });
        });
      });
    })
    .catch(error => console.error('Error al cargar pacientes:', error));
}

const btnAgregar = document.getElementById('btn-agregar');
const modal = document.getElementById('modal');
const cerrar = document.querySelector('.cerrar');
const form = document.getElementById('form-paciente');

if (btnAgregar) {
  btnAgregar.addEventListener('click', () => {
    form.reset();
    modoEdicion = false;
    idPacienteEditar = null;
    form.querySelector('button[type="submit"]').textContent = 'Guardar';
    modal.style.display = 'block';
  });
}

if (cerrar) cerrar.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', e => { if (e.target === modal) modal.style.display = 'none'; });

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const datos = {
      nombre: form.nombre.value,
      telefono: form.telefono.value,
      email: form.email.value
    };

    const url = modoEdicion
      ? `http://localhost:3000/api/pacientes/${idPacienteEditar}`
      : 'http://localhost:3000/api/pacientes';

    const method = modoEdicion ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    })
      .then(res => res.json())
      .then(() => {
        modal.style.display = 'none';
        form.reset();
        cargarPacientes();
        modoEdicion = false;
        idPacienteEditar = null;
        form.querySelector('button[type="submit"]').textContent = 'Guardar';
      })
      .catch(err => console.error('Error al guardar/editar paciente:', err));
  });
}

// CODIGO PARA LA PÁGINA DE DENTISTAS

function cargarDentistas() {
  fetch('http://localhost:3000/api/dentistas')
    .then(res => res.json())
    .then(dentistas => {
      const tbody = document.getElementById('tabla-dentistas');
      tbody.innerHTML = '';

      dentistas.forEach(d => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
          <td>${d.nombre}</td>
          <td>${d.especialidad || 'N/A'}</td>
          <td>${d.email}</td>
          <td>
            <button class="btn-editar-dentista" data-id="${d._id}">Editar</button>
            <button class="btn-eliminar-dentista" data-id="${d._id}">Eliminar</button>
          </td>
        `;
        tbody.appendChild(fila);
      });

      const btnsEliminar = document.querySelectorAll('.btn-eliminar-dentista');
      btnsEliminar.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          if (confirm('¿Seguro que deseas eliminar este dentista?')) {
            fetch(`http://localhost:3000/api/dentistas/${id}`, {
              method: 'DELETE'
            })
              .then(res => res.json())
              .then(() => cargarDentistas());
          }
        });
      });

      const btnsEditar = document.querySelectorAll('.btn-editar-dentista');
      btnsEditar.forEach(btn => {
        btn.addEventListener('click', () => {
          const id = btn.dataset.id;
          fetch(`http://localhost:3000/api/dentistas/${id}`)
            .then(res => res.json())
            .then(dentista => {
              const formDentista = document.getElementById('form-dentista');
              formDentista.nombre.value = dentista.nombre;
              formDentista.especialidad.value = dentista.especialidad || '';
              formDentista.email.value = dentista.email;
              idDentistaEditar = dentista._id;
              document.getElementById('modal-dentista').style.display = 'block';
              formDentista.querySelector('button[type="submit"]').textContent = 'Actualizar';
            });
        });
      });
    })
    .catch(err => console.error('Error al cargar dentistas:', err));
}

// Modal dentista
const btnAgregarDentista = document.getElementById('btn-agregar-dentista');
const modalDentista = document.getElementById('modal-dentista');
const cerrarDentista = document.querySelector('.cerrar-dentista');
const formDentista = document.getElementById('form-dentista');

if (btnAgregarDentista) {
  btnAgregarDentista.addEventListener('click', () => {
    formDentista.reset();
    idDentistaEditar = null;
    formDentista.querySelector('button[type="submit"]').textContent = 'Guardar';
    modalDentista.style.display = 'block';
  });
}

if (cerrarDentista) {
  cerrarDentista.addEventListener('click', () => modalDentista.style.display = 'none');
}

window.addEventListener('click', (e) => {
  if (e.target === modalDentista) modalDentista.style.display = 'none';
});

if (formDentista) {
  formDentista.addEventListener('submit', (e) => {
    e.preventDefault();

    const datos = {
      nombre: formDentista.nombre.value,
      especialidad: formDentista.especialidad.value,
      email: formDentista.email.value
    };

    const url = idDentistaEditar
      ? `http://localhost:3000/api/dentistas/${idDentistaEditar}`
      : 'http://localhost:3000/api/dentistas';

    const method = idDentistaEditar ? 'PUT' : 'POST';

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    })
      .then(res => res.json())
      .then(() => {
        modalDentista.style.display = 'none';
        formDentista.reset();
        cargarDentistas();
        idDentistaEditar = null;
        formDentista.querySelector('button[type="submit"]').textContent = 'Guardar';
      })
      .catch(err => console.error('Error al guardar/editar dentista:', err));
  });
}
