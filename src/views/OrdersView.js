// ============================================
// VISTA DE PEDIDOS - LAYOUT 2 COLUMNAS
// ============================================

import { ROUTES } from '../utils/constants.js';
import { showLoading, formatPrice } from '../utils/helpers.js';
import AuthService from '../services/AuthService.js';
import OrderService from '../services/OrderService.js';
import OrderCard from '../components/OrderCard.js';

class OrdersView {
    async render() {
        const mainContent = document.getElementById('main-content');
        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            window.location.hash = ROUTES.LOGIN;
            return;
        }

        mainContent.innerHTML = `
            <div class="orders-layout">
                <!-- LISTA DE PEDIDOS (IZQUIERDA) -->
                <div>
                    <div class="orders-section-header">
                        <h1 class="section-title">Recent Orders</h1>
                        <a href="#" class="btn-view-all">View All</a>
                    </div>
                    <div id="orders-list"></div>
                </div>
                
                <!-- DETALLES DE CUENTA (DERECHA) -->
                <div class="account-details">
                    <h2 class="account-details-title">Account Details</h2>
                    
                    <div class="profile-section">
                        <div class="profile-avatar">
                            <img src="https://i.pravatar.cc/150?u=${currentUser.email}" alt="${currentUser.name}">
                        </div>
                        <h3 class="profile-name">${currentUser.name}</h3>
                        <p class="profile-email">${currentUser.email}</p>
                        <span class="profile-badge">${currentUser.role === 'admin' ? 'Admin' : 'Customer'}</span>
                    </div>
                    
                    <div class="profile-stats" id="profile-stats">
                        <!-- Stats se cargarán aquí -->
                    </div>
                    
                    <div class="loyalty-points">
                        <div class="loyalty-label">Loyalty Pts</div>
                        <div class="loyalty-value" id="loyalty-points">0</div>
                    </div>
                    
                    <ul class="profile-menu">
                        <li class="menu-item">
                            <div class="menu-item-content">
                                <div class="menu-item-icon">💳</div>
                                <div class="menu-item-title">Payment Methods</div>
                            </div>
                            <span class="menu-item-arrow">›</span>
                        </li>
                        <li class="menu-item">
                            <div class="menu-item-content">
                                <div class="menu-item-icon">📍</div>
                                <div class="menu-item-title">Saved Addresses</div>
                            </div>
                            <span class="menu-item-arrow">›</span>
                        </li>
                        <li class="menu-item">
                            <div class="menu-item-content">
                                <div class="menu-item-icon">⚙️</div>
                                <div class="menu-item-title">Preferences</div>
                            </div>
                            <span class="menu-item-arrow">›</span>
                        </li>
                    </ul>
                </div>
            </div>
        `;

        showLoading('orders-list');

        const userOrders = await OrderService.getUserOrders(currentUser.id);
        const stats = OrderService.getUserStats(userOrders);

        // Cargar estadísticas
        document.getElementById('profile-stats').innerHTML = `
            <div class="stat-item">
                <div class="stat-value">${stats.totalOrders}</div>
                <div class="stat-label">Total Orders</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">${Math.floor(stats.totalSpent * 10)}</div>
                <div class="stat-label">Loyalty Pts</div>
            </div>
        `;

        document.getElementById('loyalty-points').textContent = Math.floor(stats.totalSpent * 10);

        if (userOrders.length === 0) {
            document.getElementById('orders-list').innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📦</div>
                    <p class="empty-state-title">No orders yet</p>
                    <p class="empty-state-text">Start ordering from our menu</p>
                    <a href="${ROUTES.MENU}" class="btn-primary" style="display: inline-block; text-decoration: none; margin-top: 1rem;">
                        Browse Menu
                    </a>
                </div>
            `;
        } else {
            this.renderOrders(userOrders);
        }
    }

    renderOrders(orders) {
        const ordersList = document.getElementById('orders-list');

        const sortedOrders = [...orders].sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );

        ordersList.innerHTML = `
            <div class="orders-list">
                ${sortedOrders.map(order => OrderCard.create(order, false)).join('')}
            </div>
        `;
    }
}

export default new OrdersView();
