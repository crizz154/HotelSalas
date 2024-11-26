// Función para cargar las salas
function cargarSalas() {
    fetch('/salas')
        .then(response => response.json())
        .then(salas => {
            const listaSalas = document.getElementById('listaSalas');
            listaSalas.innerHTML = '';
            salas.forEach(sala => {
                const li = document.createElement('li');
                li.textContent = `${sala.nombre} (Capacidad: ${sala.capacidad})`;
                listaSalas.appendChild(li);
            });
        });
}

// Función para cargar las reservas
function cargarReservas() {
    fetch('/reservas')
        .then(response => response.json())
        .then(reservas => {
            const listaReservas = document.getElementById('listaReservas');
            listaReservas.innerHTML = '';
            reservas.forEach(reserva => {
                const li = document.createElement('li');
                li.textContent = `${reserva.nombreReservante} reservó la sala ${reserva.salaId} de ${reserva.fechaInicio} a ${reserva.fechaFin}`;
                listaReservas.appendChild(li);
            });
        });
}

// Función para cargar las salas en el formulario de reserva
function cargarSelectSalas() {
    fetch('/salas')
        .then(response => response.json())
        .then(salas => {
            const selectSala = document.getElementById('selectSalaReserva');
            salas.forEach(sala => {
                const option = document.createElement('option');
                option.value = sala.id;
                option.textContent = `${sala.nombre} (Capacidad: ${sala.capacidad})`;
                selectSala.appendChild(option);
            });
        });
}

// Enviar el formulario para crear una nueva sala
document.getElementById('formSala').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombre = document.getElementById('nombreSala').value;
    const capacidad = document.getElementById('capacidadSala').value;

    fetch('/salas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, capacidad })
    })
    .then(response => response.json())
    .then(() => {
        cargarSalas(); // Actualizar la lista de salas
    });
});

// Enviar el formulario para crear una nueva reserva
document.getElementById('formReserva').addEventListener('submit', function(event) {
    event.preventDefault();

    const nombreReservante = document.getElementById('nombreReservante').value;
    const fechaInicio = document.getElementById('fechaInicio').value;
    const fechaFin = document.getElementById('fechaFin').value;
    const salaId = document.getElementById('selectSalaReserva').value;

    fetch('/reservas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombreReservante, fechaInicio, fechaFin, salaId })
    })
    .then(response => response.json())
    .then(() => {
        cargarReservas(); // Actualizar la lista de reservas
    });
});

// Cargar salas, reservas y el select de salas al inicio
cargarSalas();
cargarReservas();
cargarSelectSalas();
