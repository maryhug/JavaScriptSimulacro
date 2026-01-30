// ============================================
// VISTA DE PEDIDOS DEL USUARIO
// ============================================

import { ROUTES } from '../utils/constants.js';
import { showLoading } from '../utils/helpers.js';
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
            <div>
                <h1 style="margin-bottom: 2rem;">📋 Mis Pedidos</h1>
                <div id="orders-list"></div>
            </div>
        `;

        showLoading('orders-list');

        const userOrders = await OrderService.getUserOrders(currentUser.id);

        if (userOrders.length === 0) {
            document.getElementById('orders-list').innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📦</div>
                    <p>No tienes pedidos aún</p>
                    <p style="margin-top: 1rem;">
                        <a href="${ROUTES.MENU}" style="color: var(--primary-color);">
                            Ver menú y hacer un pedido
                        </a>
                    </p>
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
