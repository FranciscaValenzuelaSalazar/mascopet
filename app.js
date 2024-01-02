document.addEventListener("DOMContentLoaded", function () {
    const carrito = [];

    function actualizarCarritoResumen() {
        const carritoResumen = document.getElementById('carrito-resumen');
        carritoResumen.textContent = `Carrito: ${carrito.length} artículos`;
    }

    function agregarAlCarrito(producto) {
        carrito.push({ ...producto, cantidad: 1 });
        actualizarCarritoResumen();
        mostrarCarrito();
    }

    function actualizarUnidades(index, unidades) {
        if (unidades > 0) {
            carrito[index].cantidad = unidades;
        } else {
            eliminarDelCarrito(index);
        }
        mostrarCarrito();
    }

    function eliminarDelCarrito(index) {
        carrito.splice(index, 1);
        actualizarCarritoResumen();
        mostrarCarrito();
    }

    function mostrarCarrito() {
        const carritoContainer = document.getElementById('carrito');
        carritoContainer.innerHTML = '';

        carrito.forEach((producto, index) => {
            const item = document.createElement('div');
            item.innerHTML = `<span>${producto.nombre} - ${producto.precio}€ x ${producto.cantidad} unidades</span>
                              <button onclick="actualizarUnidades(${index}, ${producto.cantidad - 1})">-</button>
                              <button onclick="actualizarUnidades(${index}, ${producto.cantidad + 1})">+</button>
                              <button onclick="eliminarDelCarrito(${index})">Eliminar</button>`;
            carritoContainer.appendChild(item);
        });
    }

    // Evento de clic para agregar productos al carrito
    document.getElementById('catalogo').addEventListener('click', function (event) {
        if (event.target.tagName === 'BUTTON') {
            const producto = {
                nombre: event.target.dataset.nombre,
                precio: parseFloat(event.target.dataset.precio)
            };
            agregarAlCarrito(producto);
        }
    });

    // Evento de clic para finalizar la compra (simulado)
    document.getElementById('finalizar-compra').addEventListener('click', function () {
        if (carrito.length > 0) {
            const clienteNombre = prompt("Ingrese su nombre:");
            const clienteEmail = prompt("Ingrese su correo electrónico:");

            // Aquí deberías enviar la información del pedido al servidor para procesar y enviar un correo electrónico

            alert(`¡Gracias por su compra, ${clienteNombre}! Se ha enviado un correo de confirmación a ${clienteEmail}`);
            carrito.length = 0; // Limpiar el carrito después de la compra
            actualizarCarritoResumen();
            mostrarCarrito();
        } else {
            alert("El carrito está vacío. Agregue productos antes de finalizar la compra.");
        }
    });

    // Inicializar
    actualizarCarritoResumen();
});
