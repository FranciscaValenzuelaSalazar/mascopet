// cart.js

// Función para obtener selectedServices de localStorage o inicializarlo como un array vacío
function getSelectedServices() {
    return JSON.parse(localStorage.getItem('selectedServices')) || [];
}

function displayCartServices() {
    const cartContainer = document.getElementById('cart-item-container');
    cartContainer.innerHTML = '';

    let totalAmount = 0; // Variable para almacenar el total general

    selectedServices.forEach(item => {
        const { name, price, image } = item.service;
        let quantity = item.quantity || 1;

        // Crear un contenedor para cada servicio en el carrito
        const cartItemContainer = document.createElement('div');
        cartItemContainer.classList.add('cart-item-container');

        // Crear una etiqueta de imagen para la imagen del servicio
        const serviceImage = document.createElement('img');
        serviceImage.src = image; // Asumiendo que la ruta de la imagen es correcta
        serviceImage.alt = name; // Alt con el nombre del servicio para accesibilidad
        serviceImage.classList.add('service-image'); // Nueva clase para la imagen

        // Crear un elemento de párrafo para mostrar el resumen en línea
        const cartItemParagraph = document.createElement('p');
        cartItemParagraph.textContent = `${name} - ${price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })} x `;

        // Crear un input para la cantidad
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.value = quantity;
        quantityInput.min = 1;
        quantityInput.addEventListener('change', () => {
            updateQuantity(item, quantityInput.value);
            updateCartSummary();
            displayCartServices();
        });

        // Crear botones de incremento y decremento
        const decreaseButton = document.createElement('button');
        decreaseButton.textContent = '-';
        decreaseButton.addEventListener('click', () => {
            if (quantity > 1) {
                quantity--;
                updateQuantity(item, quantity);
                updateCartSummary();
                displayCartServices();
            }
        });

        const increaseButton = document.createElement('button');
        increaseButton.textContent = '+';
        increaseButton.addEventListener('click', () => {
            quantity++;
            updateQuantity(item, quantity);
            updateCartSummary();
            displayCartServices();
        });

        // Crear botón de eliminación con icono de basura
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>'; // Font Awesome icono de basura
        deleteButton.addEventListener('click', () => {
            removeServiceFromCart(item.service);
            updateCartSummary();
            displayCartServices();
        });

        // Estilos para alinear los botones a la derecha
        decreaseButton.style.float = 'right';
        increaseButton.style.float = 'right';
        deleteButton.style.float = 'right';

        // Calcular el precio total por servicio
        const totalPrice = quantity * price;
        totalAmount += totalPrice; // Acumular al total general

        // Agregar la imagen, párrafo, input y botones al contenedor
        cartItemContainer.appendChild(serviceImage);
        cartItemContainer.appendChild(cartItemParagraph);
        cartItemContainer.appendChild(quantityInput);
        cartItemContainer.appendChild(decreaseButton);
        cartItemContainer.appendChild(increaseButton);
        cartItemContainer.appendChild(deleteButton);

        // Agregar el contenedor al contenedor principal del carrito
        cartContainer.appendChild(cartItemContainer);

        // Actualizar la cantidad en el servicio seleccionado
        item.quantity = quantity;
    });

    // Mostrar el total general al final del carrito
    const totalContainer = document.createElement('div');
    totalContainer.classList.add('total-container');

    const totalParagraph = document.createElement('p');
    totalParagraph.textContent = `Total: ${totalAmount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}`;

    totalContainer.appendChild(totalParagraph);
    cartContainer.appendChild(totalContainer);
}

// ...

function updateQuantity(item, newQuantity) {
    // Actualizar la cantidad en el servicio seleccionado
    item.quantity = parseInt(newQuantity);
}

// ...

function updateCartSummary() {
    const cartSummaryText = document.getElementById('cart-item-container');
    const totalItems = selectedServices.reduce((total, item) => total + item.quantity, 0);

    // Actualizar el texto al lado del icono del carrito
    cartSummaryText.textContent = `Carrito: ${totalItems} ${totalItems === 1 ? 'producto' : 'productos'}`;
}

function removeServiceFromCart(service) {
    // Filtrar los servicios seleccionados para eliminar el servicio específico
    selectedServices = selectedServices.filter(item => item.service !== service);
}

// Muestra los servicios del carrito al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Recupera selectedServices de localStorage al cargar la página
    selectedServices = getSelectedServices();

    // Muestra los servicios del carrito
    displayCartServices();
});

// Resto del código en cart.js
