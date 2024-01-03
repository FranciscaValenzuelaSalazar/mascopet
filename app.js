let cartItems = [];

function addToCart(serviceName, description, image) {
    const newItem = { serviceName, description, image };
    cartItems.push(newItem);
    updateCart();
}

function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateCart();
}

function updateCart() {
    const cartBody = document.getElementById('cart-body');
    cartBody.innerHTML = '';

    cartItems.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.serviceName}</td>
            <td>${item.description}</td>
            <td><button onclick="removeFromCart(${index})">Eliminar</button></td>
        `;
        cartBody.appendChild(row);
    });
}

function completeReservation() {
    // Aquí puedes agregar la lógica para enviar el correo de confirmación y procesar la reserva.
    alert('Reserva completada. Se ha enviado un correo de confirmación.');
}
