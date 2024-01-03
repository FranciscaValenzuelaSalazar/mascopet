// Array de servicios
const services = [
    { id: 1, name: 'Baño y Corte', description: 'Incluye baño y corte de pelo', price: 15000, image: 'images/banio.jpg' },
    { id: 2, name: 'Baño y Peinado', description: 'Incluye baño y peinado', price: 12000, image: 'images/peinado.jpg' },
    { id: 3, name: 'Corte de Uñas', description: 'Corte de uñas para mantener la higiene', price: 8000, image: 'images/corte.jpg' },
    { id: 4, name: 'Masaje Canino', description: 'Masaje relajante para tu mascota', price: 10000, image: 'images/masaje.jpg' },
    { id: 5, name: 'Limpieza de Oídos', description: 'Limpieza profunda de oídos', price: 6000, image: 'images/oidos.jpg' },
    { id: 6, name: 'Tratamiento Antipulgas', description: 'Tratamiento para eliminar pulgas', price: 12000, image: 'images/pulgas.jpg' },
    // Agrega más servicios según sea necesario
];

// Función para mostrar servicios en el catálogo
function displayServices(services) {
    const catalogContainer = document.getElementById('catalog-container');
	
	if (catalogContainer) {
        catalogContainer.innerHTML = '';

        // Mostrar servicios en el catálogo
    services.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.classList.add('service-card');

        // Crear elementos HTML para mostrar información del servicio
        const serviceName = document.createElement('h3');
        serviceName.textContent = service.name;

        const serviceDescription = document.createElement('p');
        serviceDescription.textContent = service.description;

        const servicePrice = document.createElement('p');
        servicePrice.textContent = `${service.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}`;

        // Crear la etiqueta de imagen y configurar su atributo src
        const serviceImage = document.createElement('img');
        serviceImage.src = service.image; // Asumiendo que la ruta de la imagen es correcta

        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Agregar al carrito';
        addToCartButton.addEventListener('click', () => addToCart(service));

        // Agregar elementos al contenedor del servicio
        serviceCard.appendChild(serviceImage);
        serviceCard.appendChild(serviceName);
        serviceCard.appendChild(serviceDescription);
        serviceCard.appendChild(servicePrice);
        serviceCard.appendChild(addToCartButton);

        // Agregar el servicio al catálogo
        catalogContainer.appendChild(serviceCard);
    });
    } else {
        console.error('Elemento con id "catalog-container" no encontrado.');
    }
}

// Función para agregar un servicio al carrito
function addToCart(service) {
    const existingServiceIndex = selectedServices.findIndex(item => item.service.id === service.id);

    if (existingServiceIndex !== -1) {
        selectedServices[existingServiceIndex].quantity++;
    } else {
        selectedServices.push({ service, quantity: 1 });
    }

    updateCartSummary();
    saveCartToLocalStorage();
}

// Función para guardar el carrito en localStorage
function saveCartToLocalStorage() {
	localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
}

function updateCartSummary() {
    const cartSummaryText = document.getElementById('cart-summary');
    const totalItems = selectedServices.reduce((total, item) => total + item.quantity, 0);

    // Actualizar el texto del resumen del carrito
    cartSummaryText.textContent = `Carrito: ${totalItems} productos`;
}

function displayAllServices() {
    displayServices(services);
}

// Función para mostrar servicios filtrados por nombre
function searchServices() {
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (searchTerm === '') {
        // Si el término de búsqueda está vacío, mostrar todos los servicios
        displayAllServices(services);
    } else {
        // Filtrar y mostrar servicios que coincidan con el término de búsqueda
        const filteredServices = services.filter(service => service.name.toLowerCase().includes(searchTerm));
        displayServices(filteredServices);
    }
}

// Llama a la función para mostrar los servicios cuando la página se carga
// Actualiza la llamada inicial para cargar todos los servicios
document.addEventListener('DOMContentLoaded', () => {
    displayServices(services);
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.addEventListener('click', updateCartSummary);
	updateCartSummary();
});

document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.addEventListener('click', showCartSummary);
});
