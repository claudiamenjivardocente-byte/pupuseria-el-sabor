// Menú hamburguesa
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(44, 62, 80, 0.95)';
    } else {
        navbar.style.background = 'var(--dark-color)';
    }
});

// Validación de formulario
const form = document.getElementById('reservationForm');
const successMessage = document.getElementById('successMessage');

// Establecer fecha mínima (hoy)
const today = new Date().toISOString().split('T')[0];
document.getElementById('fecha').setAttribute('min', today);

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    let isValid = true;
    
    // Limpiar errores previos
    document.querySelectorAll('.error').forEach(error => {
        error.textContent = '';
    });
    document.querySelectorAll('input, select').forEach(input => {
        input.classList.remove('error-border');
    });
    
    // Validar nombre
    const nombre = document.getElementById('nombre').value.trim();
    if (nombre.length < 3) {
        showError('nombre', 'El nombre debe tener al menos 3 caracteres');
        isValid = false;
    }
    
    // Validar teléfono (formato salvadoreño)
    const telefono = document.getElementById('telefono').value.trim();
    const phoneRegex = /^[0-9]{8}$/;
    if (!phoneRegex.test(telefono)) {
        showError('telefono', 'Ingrese un teléfono válido (8 dígitos)');
        isValid = false;
    }
    
    // Validar email (si se proporciona)
    const email = document.getElementById('email').value.trim();
    if (email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError('email', 'Ingrese un correo electrónico válido');
            isValid = false;
        }
    }
    
    // Validar fecha
    const fecha = document.getElementById('fecha').value;
    if (!fecha) {
        showError('fecha', 'Seleccione una fecha');
        isValid = false;
    }
    
    // Validar hora
    const hora = document.getElementById('hora').value;
    if (!hora) {
        showError('hora', 'Seleccione una hora');
        isValid = false;
    }
    
    // Validar número de personas
    const personas = document.getElementById('personas').value;
    if (!personas) {
        showError('personas', 'Seleccione el número de personas');
        isValid = false;
    }
    
    if (isValid) {
        // Simular envío exitoso
        successMessage.style.display = 'block';
        form.style.display = 'none';
        
        // Scroll al mensaje de éxito
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Resetear formulario después de 3 segundos
        setTimeout(() => {
            form.reset();
            form.style.display = 'block';
            successMessage.style.display = 'none';
        }, 5000);
    }
});

function showError(fieldId, message) {
    const errorElement = document.getElementById(`error-${fieldId}`);
    const inputElement = document.getElementById(fieldId);
    
    errorElement.textContent = message;
    inputElement.classList.add('error-border');
}

// Smooth scroll para los enlaces
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Animación simple al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos para animar
document.querySelectorAll('.menu-item, .feature').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
