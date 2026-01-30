import {login} from '../views/login.js'
import {adminDashboard} from '../views/admin-dashboard.js'
import {menu} from '../views/menu.js'
import {userProfile} from '../views/user-profile.js'

const routes = {
    '': login,
    'login': login,
    'adminDashboard': adminDashboard,
    'admin': adminDashboard,
    'menu': menu,
    'userProfile': userProfile
};

export async function router() {
    const hash = window.location.hash.slice(1) || ''
    const parts = hash.split('/')
    const routeName = parts[0] || 'login'
    const viewFn = routes[routeName];

    if (viewFn) {
        const app = document.getElementById('app');
        app.innerHTML = viewFn();

        // Inicializar listeners después de renderizar
        initializeViewListeners(routeName);
    } else {
        console.error('Ruta no encontrada:', routeName);
        window.location.hash = '#login';
    }
}

function initializeViewListeners(routeName) {
    if (routeName === 'login' || routeName === '') {
        const loginForm = document.getElementById('loginForm');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault(); // Prevenir el envío del formulario

                // Opcional: obtener valores del formulario
                const fullName = document.getElementById('fullName').value;
                const email = document.getElementById('email').value;
                const role = document.getElementById('role').value;

                // Validación básica (opcional)
                if (!fullName || !email) {
                    alert('Por favor completa todos los campos');
                    return;
                }

                // Guardar datos en sessionStorage o localStorage si es necesario
                sessionStorage.setItem('user', JSON.stringify({fullName, email, role}));

                // Navegar según el rol
                if (role === 'admin') {
                    window.location.hash = '#adminDashboard';
                } else {
                    window.location.hash = '#menu';
                }
            });
        }
    }
}
