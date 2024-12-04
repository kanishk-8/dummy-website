document
  .getElementById("bookingForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const service = document.getElementById("service").value;
    const raand = document.getElementById("raand").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    const confirmation = document.getElementById("confirmation");
    const details = document.getElementById("confirmationDetails");

    details.innerHTML = `
    Thank you, <strong>${name}</strong>!<br>
    Your appointment for <strong>${service}</strong> is confirmed on <strong>${date}</strong> at <strong>${time}</strong> with raand <strong>${raand}</strong>.
  `;

    confirmation.classList.remove("hidden");

    this.reset();
  });

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    // Booking form handling
    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');

            // Clear previous error messages
            form.querySelectorAll('.error-message').forEach(msg => msg.remove());

            // Validate required fields
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showError(field, `${field.name} is required`);
                }
            });

            // Phone number validation
            const phone = form.querySelector('#phone');
            if (phone && phone.value) {
                const phoneRegex = /^[0-9]{10}$/;
                if (!phoneRegex.test(phone.value.trim())) {
                    isValid = false;
                    showError(phone, 'Please enter a valid 10-digit phone number');
                }
            }

            // Date validation
            const date = form.querySelector('#date');
            if (date && date.value) {
                const selectedDate = new Date(date.value);
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (selectedDate < today) {
                    isValid = false;
                    showError(date, 'Please select a future date');
                }
            }

            if (isValid) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.classList.add('success-message');
                successMsg.textContent = 'Booking submitted successfully! We will contact you shortly.';
                form.appendChild(successMsg);

                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                    successMsg.remove();
                }, 3000);
            }
        });

        // Remove error message on input
        form.querySelectorAll('input, select, textarea').forEach(field => {
            field.addEventListener('input', () => {
                const error = field.parentElement.querySelector('.error-message');
                if (error) {
                    error.remove();
                }
                field.classList.remove('error');
            });
        });

        // Update price based on service selection
        const serviceSelect = form.querySelector('#service');
        const providerSelect = form.querySelector('#provider');
        
        if (serviceSelect && providerSelect) {
            serviceSelect.addEventListener('change', updatePrice);
            providerSelect.addEventListener('change', updatePrice);
        }
    }
});

// Helper function to show error messages
function showError(field, message) {
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error-message');
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
}

// Helper function to update price based on selections
function updatePrice() {
    const form = document.getElementById('bookingForm');
    const service = form.querySelector('#service').value;
    const provider = form.querySelector('#provider').value;
    
    let basePrice = 0;
    switch (service) {
        case 'backshot':
        case 'blowjob':
            basePrice = 40;
            break;
        case 'full':
            basePrice = 80;
            break;
        case 'combo':
            basePrice = 150;
            break;
    }

    // Apply provider-specific adjustments
    if (provider === 'mayur') {
        basePrice = Math.floor(basePrice * 0.8); // 20% discount for budget option
    }

    // Update price display if it exists
    const priceDisplay = document.querySelector('#price-display');
    if (priceDisplay) {
        priceDisplay.textContent = basePrice > 0 ? `₹${basePrice}` : '';
    }
}

// Form validation and price calculation
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const serviceSelect = document.getElementById('service');
    const providerSelect = document.getElementById('provider');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                showSuccessMessage('Booking submitted successfully! We will contact you shortly.');
                bookingForm.reset();
            }
        });
    }

    // Dynamic price calculation
    if (serviceSelect && providerSelect) {
        [serviceSelect, providerSelect].forEach(select => {
            select.addEventListener('change', updateTotalPrice);
        });
    }
});

// Form validation
function validateForm() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const service = document.getElementById('service').value;
    const provider = document.getElementById('provider').value;

    // Clear previous error messages
    clearErrors();

    let isValid = true;

    // Name validation
    if (name.trim().length < 2) {
        showError('name', 'Please enter a valid name');
        isValid = false;
    }

    // Email validation
    if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Phone validation
    if (!phone.match(/^[0-9]{10}$/)) {
        showError('phone', 'Please enter a valid 10-digit phone number');
        isValid = false;
    }

    // Date validation
    if (!date) {
        showError('date', 'Please select a date');
        isValid = false;
    } else {
        const selectedDate = new Date(date);
        const today = new Date();
        if (selectedDate < today) {
            showError('date', 'Please select a future date');
            isValid = false;
        }
    }

    // Service validation
    if (!service) {
        showError('service', 'Please select a service');
        isValid = false;
    }

    // Provider validation
    if (!provider) {
        showError('provider', 'Please select a provider');
        isValid = false;
    }

    return isValid;
}

// Helper functions
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
    field.classList.add('error');
}

function clearErrors() {
    document.querySelectorAll('.error-message').forEach(error => error.remove());
    document.querySelectorAll('.error').forEach(field => field.classList.remove('error'));
}

function isValidEmail(email) {
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
}

function showSuccessMessage(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    const form = document.getElementById('bookingForm');
    form.parentNode.insertBefore(successDiv, form.nextSibling);
    
    setTimeout(() => {
        successDiv.remove();
    }, 5000);
}

function updateTotalPrice() {
    const serviceSelect = document.getElementById('service');
    const providerSelect = document.getElementById('provider');
    
    if (!serviceSelect || !providerSelect) return;

    const servicePrices = {
        'backshot': 40,
        'blowjob': 40,
        'full': 80,
        'combo': 150
    };

    const providerRates = {
        'ayush': 80,
        'mayur': 40
    };

    const selectedService = serviceSelect.value;
    const selectedProvider = providerSelect.value;

    if (selectedService && selectedProvider) {
        const servicePrice = servicePrices[selectedService];
        const providerRate = providerRates[selectedProvider];
        const totalPrice = servicePrice;

        // Update price display if it exists
        const priceDisplay = document.getElementById('totalPrice');
        if (priceDisplay) {
            priceDisplay.textContent = `Total: ₹${totalPrice}`;
        }
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
