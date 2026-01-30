// ============================================
// VISTA DE PERFIL
// ============================================

import { ROUTES, USER_ROLES } from '../utils/constants.js';
import { formatPrice, showLoading } from '../utils/helpers.js';
import AuthService from '../services/AuthService.js';
import OrderService from '../services/OrderService.js';

class ProfileView {
    async render() {
        const mainContent = document.getElementById('main-content');
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            window.location.hash = ROUTES.LOGIN;
            return;
        }

        mainContent.innerHTML = `
            <div class="profile-container">
                <div class="profile-header">
                    <h1>👤 Mi Perfil</h1>
                </div>
                <div id="profile-info"></div>
            </div>
        `;

        showLoading('profile-info');

        const userOrders = await OrderService.getUserOrders(currentUser.id);
        const stats = OrderService.getUserStats(userOrders);

        document.getElementById('profile-info').innerHTML = `
            <div class="profile-info">
                <div class="info-row">
                    <span class="info-label">Nombre:</span>
                    <span class="info-value">${currentUser.name}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Email:</span>
                    <span class="info-value">${currentUser.email}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Rol:</span>
                    <span class="info-value">
                        ${currentUser.role === USER_ROLES.ADMIN ? '⚙️ Administrador' : '👤 Usuario'}
                    </span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Total de pedidos:</span>
                    <span class="info-value">${stats.totalOrders}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Total gastado:</span>
                    <span class="info-value" style="color: var(--primary-color); font-weight: bold;">
                        ${formatPrice(stats.totalSpent)}
                    </span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Pedidos pendientes:</span>
                    <span class="info-value">${stats.pendingOrders}</span>
                </div>
            </div>
        `;
    }
}

export default new ProfileView();
