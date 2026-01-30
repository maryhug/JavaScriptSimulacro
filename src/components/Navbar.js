// ============================================
// COMPONENTE DE BARRA DE NAVEGACIÓN
// ============================================

import { USER_ROLES, ROUTES } from '../utils/constants.js';
import AuthService from '../services/AuthService.js';

class Navbar {
    render() {
        const navbarContainer = document.getElementById('navbar');
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            navbarContainer.innerHTML = '';
            return;
        }

        const links = currentUser.role === USER_ROLES.ADMIN
            ? this.getAdminLinks()
            : this.getUserLinks();

        navbarContainer.innerHTML = `
            <div class="navbar-container">
                <a href="${ROUTES.MENU}" class="navbar-brand">
                    🍽️ RestorApp
                </a>
                
                <ul class="navbar-menu">
                    ${links.map(link => `
                        <li>
                            <a href="${link.route}" class="navbar-link" data-link>
                                ${link.icon} ${link.label}
                            </a>
                        </li>
                    `).join('')}
                </ul>
                
                <div class="navbar-user">
                    <span>👤 ${currentUser.name}</span>
                    <button class="btn-logout" id="btn-logout">
                        Cerrar Sesión
                    </button>
                </div>
            </div>
        `;

        document.getElementById('btn-logout')
            .addEventListener('click', () => AuthService.logout());

        this.highlightActiveLink();
    }

    getUserLinks() {
        return [
            { route: ROUTES.MENU, label: 'Menú', icon: '🍔' },
            { route: ROUTES.ORDERS, label: 'Mis Pedidos', icon: '📋' },
            { route: ROUTES.PROFILE, label: 'Perfil', icon: '👤' }
        ];
    }

    getAdminLinks() {
        return [
            { route: ROUTES.ADMIN, label: 'Gestión Pedidos', icon: '⚙️' },
            { route: ROUTES.PROFILE, label: 'Perfil', icon: '👤' }
        ];
    }

    highlightActiveLink() {
        const currentHash = window.location.hash || ROUTES.MENU;
        const links = document.querySelectorAll('.navbar-link');

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentHash) {
                link.classList.add('active');
            }
        });
    }
}

export default new Navbar();
