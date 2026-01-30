// ============================================
// ROUTER DE LA APLICACIÓN
// ============================================

import { ROUTES, USER_ROLES } from '../utils/constants.js';
import { showNotification, clearElement } from '../utils/helpers.js';
import AuthService from '../services/AuthService.js';
import Navbar from '../components/Navbar.js';

import LoginView from '../views/LoginView.js';
import MenuView from '../views/MenuView.js';
import OrdersView from '../views/OrdersView.js';
import ProfileView from '../views/ProfileView.js';
import AdminView from '../views/AdminView.js';

class Router {
    constructor() {
        this.views = {
            [ROUTES.LOGIN]: LoginView,
            [ROUTES.MENU]: MenuView,
            [ROUTES.ORDERS]: OrdersView,
            [ROUTES.PROFILE]: ProfileView,
            [ROUTES.ADMIN]: AdminView
        };
    }

    init() {
        window.addEventListener('hashchange', () => this.handleRoute());
        this.handleRoute();
    }

    handleRoute() {
        const hash = window.location.hash || ROUTES.LOGIN;

        if (!AuthService.isAuthenticated() && hash !== ROUTES.LOGIN) {
            window.location.hash = ROUTES.LOGIN;
            return;
        }

        if (AuthService.isAuthenticated() && hash === ROUTES.LOGIN) {
            const user = AuthService.getCurrentUser();
            window.location.hash = user.role === USER_ROLES.ADMIN ? ROUTES.ADMIN : ROUTES.MENU;
            return;
        }

        if (hash === ROUTES.ADMIN && !AuthService.isAdmin()) {
            showNotification('Acceso no autorizado', 'error');
            window.location.hash = ROUTES.MENU;
            return;
        }

        this.renderView(hash);

        if (AuthService.isAuthenticated()) {
            Navbar.render();
        }
    }

    renderView(route) {
        clearElement('main-content');

        const view = this.views[route];

        if (view) {
            view.render();
        } else {
            this.render404();
        }
    }

    render404() {
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">❌</div>
                <h2>Página no encontrada</h2>
                <p>La ruta solicitada no existe</p>
                <p style="margin-top: 1rem;">
                    <a href="${ROUTES.MENU}" style="color: var(--primary-color);">
                        Volver al inicio
                    </a>
                </p>
            </div>
        `;
    }
}

export default new Router();
