document.addEventListener('DOMContentLoaded', () => {
    // Obtener el ID del dispositivo desde el almacenamiento local
    const dispositivoId = localStorage.getItem('selectedDeviceId');

    // Datos ficticios de los dispositivos
    const data = [
        {
            contacto: {
                nombre: "Benjamin Ureta",
                email: "benjamin.ureta@ug.uchile.cl",
                telefono: "123456789"
            },
            id: "1",
            tipo: "Teclado",
            dispositivo: "Teclado Mecánico Redragon Kumara Black K552RGB-1",
            estado: "Nuevo",
            comuna: "Puerto Varas",
            foto: `${imgBaseUrl}/teclado.png`,
            comentarios: [
                { fecha: "2024-08-26", nombre: "Juan", comentario: "Comentario 1" },
                { fecha: "2024-08-27", nombre: "Ana", comentario: "Comentario 2" }
            ]
        },
        {
            contacto: {
                nombre: "Lionel Messi",
                email: "leomessi@gmail.com",
                telefono: "191030911"
            },
            id: "2",
            tipo: "Tablet",
            dispositivo: "iPad Air 4",
            estado: "Usado",
            comuna: "Santiago",
            foto: `${imgBaseUrl}/ipad.png`,
            comentarios: [
                { fecha: "2024-08-26", nombre: "Juan", comentario: "Comentario 1" },
                { fecha: "2024-08-27", nombre: "Ana", comentario: "Comentario 2" }
            ]
        },
        {
            contacto: {
                nombre: "Emilio Ureta",
                email: "emilio.ureta@hotmail.cl",
                telefono: "987654321"
            },
            id: "3",
            tipo: "Consola",
            dispositivo: "Nintendo Switch",
            estado: "Usado",
            comuna: "Puerto Varas",
            foto: `${imgBaseUrl}/nintendo.png`,
            comentarios: [
                { fecha: "2024-08-26", nombre: "Juan", comentario: "Comentario 1" },
                { fecha: "2024-08-27", nombre: "Ana", comentario: "Comentario 2" }
            ]
        },
        {
            contacto: {
                nombre: "Martin Aravena",
                email: "martincito@gmail.com",
                telefono: "314265789"
            },
            id: "4",
            tipo: "Parlante",
            dispositivo: "JBL Go Essential",
            estado: "Usado",
            comuna: "Peñaflor",
            foto: `${imgBaseUrl}/jbl.png`,
            comentarios: [
                { fecha: "2024-08-26", nombre: "Juan", comentario: "Comentario 1" },
                { fecha: "2024-08-27", nombre: "Ana", comentario: "Comentario 2" }
            ]
        },
        {
            contacto: {
                nombre: "Nicolas Maduro",
                email: "nmaduro@gmail.com",
                telefono: "777981459"
            },
            id: "5",
            tipo: "Celular",
            dispositivo: "Iphone 14",
            estado: "Usado",
            comuna: "Pedro Aguirre Cerda",
            foto: `${imgBaseUrl}/iphone14.png`,
            comentarios: [
                { fecha: "2024-08-26", nombre: "Juan", comentario: "Comentario 1" },
                { fecha: "2024-08-27", nombre: "Ana", comentario: "Comentario 2" }
            ]
        },
    ];

    // Encontrar el dispositivo seleccionado
    const dispositivo = data.find(device => device.id === dispositivoId);

    if (dispositivo) {
        const infoDiv = document.getElementById('info-dispositivo');
        infoDiv.innerHTML = `
            <div class="form-container">
                <h1>Información de Contacto</h1>
                <p><strong>Nombre:</strong> ${dispositivo.contacto.nombre}</p>
                <p><strong>Email:</strong> ${dispositivo.contacto.email}</p>
                <p><strong>Teléfono:</strong> ${dispositivo.contacto.telefono}</p>
                <h1>Información del Dispositivo</h1>
                <p><strong>Tipo:</strong> ${dispositivo.tipo}</p>   
                <p><strong>Dispositivo:</strong> ${dispositivo.dispositivo}</p>
                <p><strong>Estado:</strong> ${dispositivo.estado}</p>
                <p><strong>Comuna:</strong> ${dispositivo.comuna}</p>
            </div>
            <img src="${dispositivo.foto}" class="imagen-640x480" alt="Foto del dispositivo">
            <div class="popup-image"><img src="${dispositivo.foto}" alt="Foto del dispositivo"></div>
            <h3>Comentarios</h3>
            <ul id="comentarios-list">
                ${dispositivo.comentarios.map(comentario => `
                    <li><strong>${comentario.fecha} - ${comentario.nombre}:</strong> ${comentario.comentario}</li>
                `).join('')}
            </ul>
            <h3>Agregar un nuevo comentario</h3>
            <form id="comentario-form">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" minlength="3" maxlength="80" required>
                <br>
                <label for="comentario">Comentario:</label>
                <textarea id="comentario" name="comentario" rows="4" cols="50" minlength="5" required></textarea>
                <br>
                <button type="submit">Agregar comentario</button>
            </form>
            <p id="mensaje" style="color: red;"></p>`;

        // COMENTARIOS
        const comentarioForm = document.getElementById('comentario-form');
        const comentariosList = document.getElementById('comentarios-list');
        const mensaje = document.getElementById('mensaje');

        comentarioForm.addEventListener('submit', (event) => {
            event.preventDefault();

            // Obtener valores del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const comentarioTexto = document.getElementById('comentario').value.trim();

            // Validar que se cumplen las reglas
            if (nombre.length >= 3 && nombre.length <= 80 && comentarioTexto.length >= 5) {
                // Crear un nuevo comentario
                const nuevoComentario = {
                    fecha: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
                    nombre: nombre,
                    comentario: comentarioTexto
                };

                // Añadir comentario al html
                dispositivo.comentarios.push(nuevoComentario);
                comentariosList.innerHTML += `
                    <li><strong>${nuevoComentario.fecha} - ${nuevoComentario.nombre}:</strong> ${nuevoComentario.comentario}</li>
                `;

                
                mensaje.style.color = 'green';
                mensaje.textContent = 'Comentario agregado exitosamente.';

                
                comentarioForm.reset();
            } else {
                
                mensaje.style.color = 'red';
                mensaje.textContent = 'Por favor, asegúrate de que los campos cumplen con las reglas establecidas.';
            }
        });

        // Agregar funcionalidad para cambiar el tamaño de la imagen al hacer clic
        document.querySelectorAll('.imagen-640x480').forEach(image => {
            image.onclick = () => {
                document.querySelector('.popup-image').style.display = 'block';
                document.querySelector('.popup-image img').src = image.getAttribute('src');
            }
        });

        document.querySelector('.popup-image').onclick = () => {
            document.querySelector('.popup-image').style.display = 'none';
        }
    }
});