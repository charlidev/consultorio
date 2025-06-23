// Variables de control
let modoEdicion = false;
let idPacienteEditar = null;

// CODIGO PARA LA PÁGINA DE PACIENTES
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.pathname.includes('pacientes.html')) {
    cargarPacientes();
  }
});

function cargarPacientes() {
  fetch('http://localhost:3000/api/pacientes')
    .then(res => res.json())
    .then(pacientes => {
      const tbody = document.getElementById('tabla-pacientes');
      tbody.innerHTML = ''; // Limpiar tabla

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

      // Eventos de eliminar
      const botonesEliminar = document.querySelectorAll('.btn-eliminar');
      botonesEliminar.forEach(boton => {
        boton.addEventListener('click', () => {
          const id = boton.dataset.id;

          if (confirm('¿Estás seguro de eliminar este paciente?')) {
            fetch(`http://localhost:3000/api/pacientes/${id}`, {
              method: 'DELETE'
            })
              .then(res => res.json())
              .then(() => {
                cargarPacientes(); // Refrescar tabla
              })
              .catch(err => console.error('Error al eliminar:', err));
          }
        });
      });

      // Eventos de editar
      const botonesEditar = document.querySelectorAll('.btn-editar');
      botonesEditar.forEach(boton => {
        boton.addEventListener('click', () => {
          const id = boton.dataset.id;

          fetch(`http://localhost:3000/api/pacientes/${id}`)
            .then(res => res.json())
            .then(paciente => {
              // Llenar el formulario
              form.nombre.value = paciente.nombre;
              form.telefono.value = paciente.telefono;
              form.email.value = paciente.email;

              modoEdicion = true;
              idPacienteEditar = paciente._id;

              // Cambiar texto del botón
              form.querySelector('button[type="submit"]').textContent = 'Actualizar';

              // Mostrar modal
              modal.style.display = 'block';
            });
        });
      });
    })
    .catch(error => {
      console.error('Error al cargar pacientes:', error);
    });
}

// Modal para agregar/editar paciente
const btnAgregar = document.getElementById('btn-agregar');
const modal = document.getElementById('modal');
const cerrar = document.querySelector('.cerrar');
const form = document.getElementById('form-paciente');

if (btnAgregar) {
  btnAgregar.addEventListener('click', () => {
    // Limpiar formulario y activar modo agregar
    form.reset();
    modoEdicion = false;
    idPacienteEditar = null;
    form.querySelector('button[type="submit"]').textContent = 'Guardar';
    modal.style.display = 'block';
  });
}

if (cerrar) {
  cerrar.addEventListener('click', () => modal.style.display = 'none');
}

window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

// Enviar paciente (agregar o editar)
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
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    })
      .then(res => res.json())
      .then(() => {
        modal.style.display = 'none';
        form.reset();
        cargarPacientes();

        // Reiniciar estado
        modoEdicion = false;
        idPacienteEditar = null;
        form.querySelector('button[type="submit"]').textContent = 'Guardar';
      })
      .catch(err => {
        console.error('Error al guardar/editar paciente:', err);
      });
  });
}
