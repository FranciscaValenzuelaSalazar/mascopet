// Definir una variable para almacenar los servicios seleccionados
let selectedServices = [];

// Funciones para navegar entre páginas
function goToCatalog() {
    window.location.href = 'catalog.html';
}

function goToCart() {
    window.location.href = 'cart.html';
}

function goToReservation() {
    window.location.href = 'reservation.html';
}

// Función para mostrar el resumen del carrito desde cualquier página
function showCartSummary() {
    const cartSummary = document.getElementById('cart-summary');
    const totalItems = selectedServices.reduce((total, item) => total + item.quantity, 0);

    // Actualizar el resumen del carrito
    cartSummary.textContent = `Carrito: ${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}`;

    // Alerta con el resumen detallado
    let detailedSummary = "Resumen del carrito:\n";

    selectedServices.forEach(item => {
        const { name, price } = item.service;
        const quantity = item.quantity;
        detailedSummary += `${name} - ${price} CLP x${quantity}\n`;
    });

    alert(detailedSummary);
}

function getSelectedServices() {
    return JSON.parse(localStorage.getItem('selectedServices')) || [];
}
