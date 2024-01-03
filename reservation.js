// Variables para almacenar los datos del formulario
let customerName = '';
let serviceDate = '';
let selectedProfessional = '';
let petName = ''; // Nuevo campo
let petAge = ''; // Nuevo campo
let petAge2 = ''; // Nuevo campo
let petBreed = ''; // Nuevo campo
let addressAutocomplete;

// Función para mostrar el formulario de reserva y el resumen de servicios
function displayReservationForm() {
	const summaryContainer = document.getElementById('summary-container');
    const reservationForm = document.getElementById('reservation-form');

    // Limpiar el contenido antes de agregar nuevos elementos
    summaryContainer.innerHTML = '';
    reservationForm.innerHTML = '';

    // Llamar a la función para mostrar el resumen de servicios seleccionados
    displaySummary();

    // Crear elementos HTML para el formulario
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Nombre del Cliente:';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.addEventListener('input', (event) => customerName = event.target.value);

    const dateLabel = document.createElement('label');
    dateLabel.textContent = 'Fecha del Servicio:';
    const dateInput = document.createElement('input');
    dateInput.type = 'date';
    dateInput.addEventListener('input', (event) => serviceDate = event.target.value);

    const professionalLabel = document.createElement('label');
    professionalLabel.textContent = 'Seleccionar Profesional:';
    const professionalSelect = document.createElement('select');
    const professionals = ['Profesional 1', 'Profesional 2', 'Profesional 3']; // Lista de profesionales
    professionals.forEach(professional => {
        const option = document.createElement('option');
        option.value = professional;
        option.textContent = professional;
        professionalSelect.appendChild(option);
    });
    professionalSelect.addEventListener('change', (event) => selectedProfessional = event.target.value);

	// Crear elementos para los nuevos campos
    const petNameLabel = document.createElement('label');
    petNameLabel.textContent = 'Nombre de la Mascota:';
    const petNameInput = document.createElement('input');
    petNameInput.type = 'text';
    petNameInput.addEventListener('input', (event) => petName = event.target.value);

    const petAgeLabel = document.createElement('label');
    petAgeLabel.textContent = 'Edad de la Mascota:';
    const petAgeInput = document.createElement('input');
    petAgeInput.type = 'number';
    petAgeInput.addEventListener('input', (event) => petAge = event.target.value);
	
	const petAgeLabel2 = document.createElement('label');
    petAgeLabel2.textContent = '';
    const petAgeInput2 = document.createElement('select');
    const options = ['Años', 'Meses']; 
    options.forEach(options => {
        const option = document.createElement('option');
        option.value = options;
        option.textContent = options;
        petAgeInput2.appendChild(option);
    });
    petAgeInput2.addEventListener('change', (event) => petAge2 = event.target.value);

    const petBreedLabel = document.createElement('label');
    petBreedLabel.textContent = 'Raza de la Mascota:';
    const petBreedInput = document.createElement('input');
    petBreedInput.type = 'text';
    petBreedInput.addEventListener('input', (event) => petBreed = event.target.value);
	
	// Crear el campo de autocompletar para la dirección
    const addressLabel = document.createElement('label');
    addressLabel.textContent = 'Dirección:';
    const addressInput = document.createElement('input');
    addressInput.type = 'text';
    addressInput.placeholder = 'Escribe tu dirección';
    addressInput.id = 'address';
		
    // Botón para finalizar la reserva
    const finalizeButton = document.createElement('button');
    finalizeButton.textContent = 'Finalizar Reserva';
    finalizeButton.addEventListener('click', finalizeReservation);

    // Agregar elementos al formulario
    reservationForm.appendChild(nameLabel);
    reservationForm.appendChild(nameInput);
    
    reservationForm.appendChild(document.createElement('br'));

    reservationForm.appendChild(dateLabel);
    reservationForm.appendChild(dateInput);

    reservationForm.appendChild(document.createElement('br'));

    reservationForm.appendChild(professionalLabel);
    reservationForm.appendChild(professionalSelect);

    reservationForm.appendChild(document.createElement('br'));

	// Agregar nuevos campos al formulario
    reservationForm.appendChild(petNameLabel);
    reservationForm.appendChild(petNameInput);
	
	reservationForm.appendChild(document.createElement('br'));
		
    reservationForm.appendChild(petAgeLabel);
    reservationForm.appendChild(petAgeInput);
	reservationForm.appendChild(petAgeLabel2);
    reservationForm.appendChild(petAgeInput2);
		
	reservationForm.appendChild(document.createElement('br'));
	
    reservationForm.appendChild(petBreedLabel);
    reservationForm.appendChild(petBreedInput);
		
	reservationForm.appendChild(document.createElement('br'));
	
	reservationForm.appendChild(finalizeButton);
}

function getSelectedServices() {
    return JSON.parse(localStorage.getItem('selectedServices')) || [];
}

// Función para mostrar el resumen de servicios
function displaySummary() {
    const summaryContainer = document.getElementById('summary-container');
	
	selectedServices = getSelectedServices();
    // Limpiar el contenido antes de agregar nuevos elementos
    summaryContainer.innerHTML = '';

    // Verificar si hay servicios seleccionados
    if (selectedServices.length > 0) {
        // Crear un contenedor para el resumen
        const summaryWrapper = document.createElement('div');
        summaryWrapper.classList.add('summary-wrapper'); // Agregar una clase para el estilo

        // Iterar sobre los servicios seleccionados
        selectedServices.forEach(item => {
            const { name, price } = item.service;
            const quantity = item.quantity;

            // Crear un elemento de párrafo para cada servicio en el resumen
            const serviceSummary = document.createElement('p');
            serviceSummary.textContent = `${name} - Cantidad: ${quantity} - Precio Total: ${calculateTotalPrice(price, quantity).toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}`;

			// Agregar márgenes inferiores para crear espacio entre los servicios
            serviceSummary.style.marginBottom = '5px';
			serviceSummary.style.marginTop = '10px';
			
            // Agregar el párrafo al contenedor del resumen
            summaryWrapper.appendChild(serviceSummary);
        });

        // Calcular y mostrar el precio total general
        const totalAmount = calculateTotalAmount();
        const totalParagraph = document.createElement('h3');
        totalParagraph.textContent = `Total a Pagar: ${totalAmount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}`;

		totalParagraph.style.marginTop = "10px";
		
        // Agregar el párrafo al contenedor del resumen
        summaryWrapper.appendChild(totalParagraph);

        // Agregar el contenedor del resumen al contenedor principal
        summaryContainer.appendChild(summaryWrapper);
    } else {
        // Mostrar un mensaje si no hay servicios seleccionados
        const noServicesMessage = document.createElement('p');
        noServicesMessage.textContent = 'No hay servicios seleccionados.';

        // Agregar el mensaje al contenedor principal
        summaryContainer.appendChild(noServicesMessage);
    }
}

// Función para calcular el precio total por servicio
function calculateTotalPrice(price, quantity) {
    return price * quantity;
}

// Función para calcular el precio total general
function calculateTotalAmount() {
    return selectedServices.reduce((total, item) => total + calculateTotalPrice(item.service.price, item.quantity), 0);
}

// Función para finalizar la reserva
function finalizeReservation() {
    // Puedes agregar lógica adicional aquí, como enviar los datos a un servidor o realizar acciones específicas
    alert(`Reserva finalizada:\nCliente: ${customerName}\nFecha: ${serviceDate}\nProfesional: ${selectedProfessional}`);
    // Puedes redirigir a otra página si es necesario
}

// Llama a la función para mostrar el formulario cuando la página se carga
document.addEventListener('DOMContentLoaded', displayReservationForm);