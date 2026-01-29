// Importar vistas
import { login } from './views/login.js';
import { menu } from './views/menu.js';
import { adminDashboard } from './views/admin-dashboard.js';
import { userProfile } from './views/user-profile.js';

// Estado de la aplicación
const appState = {
    currentView: 'login',
    user: null
};

// Router simple basado en hash
function router() {
    const hash = window.location.hash.slice(1) || 'login';

    switch(hash) {
        case 'login':
            renderLogin();
            break;
        case 'menu':
            menu();
            break;
        case 'admin-dashboard':
            adminDashboard();
            break;
        case 'user-profile':
            userProfile();
            break;
        default:
            renderLogin();
    }
}

// Renderizar vista de login
function renderLogin() {
    const app = document.getElementById('app');
    app.innerHTML = login();

    // Event listener para el formulario
    const form = document.querySelector('.login-form');
    form.addEventListener('submit', handleLogin);
}

// Manejar inicio de sesión
function handleLogin(e) {
    e.preventDefault();

    const role = document.querySelector('.form-select').value;

    // Simular login y redireccionar según rol
    if (role === 'admin') {
        window.location.hash = 'admin-dashboard';
    } else {
        window.location.hash = 'menu';
    }
}

// Inicializar aplicación
document.addEventListener('DOMContentLoaded', () => {
    router();

    // Escuchar cambios en el hash
    window.addEventListener('hashchange', router);
});
