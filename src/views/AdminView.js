// ============================================
// VISTA DE ADMINISTRADOR
// ============================================

import { ROUTES, ORDER_STATUS } from '../utils/constants.js';
import { formatPrice, showNotification, showLoading } from '../utils/helpers.js';
import AuthService from '../services/AuthService.js';
import OrderService from '../services/OrderService.js';
import OrderCard from '../components/OrderCard.js';

class AdminView {
    constructor() {
        this.currentFilter = 'all';
        this.allOrders = [];
    }

    async render() {
        const mainContent = document.getElementById('main-content');

        if (!AuthService.isAdmin()) {
            showNotification('Acceso no autorizado', 'error');
            window.location.hash = ROUTES.MENU;
            return;
        }

        mainContent.innerHTML = `
            <div>
                <h1 style="margin-bottom: 2rem;">⚙️ Gestión de Pedidos</h1>
                
                <div id="stats-container"></div>
                
                <div class="filters-container" style="margin-top: 2rem;">
                    <div class="filter-group">
                        <label class="form-label">Filtrar por estado</label>
                        <select id="status-filter" class="form-select">
                            <option value="all">Todos los estados</option>
                            <option value="${ORDER_STATUS.PENDIENTE}">Pendientes</option>
                            <option value="${ORDER_STATUS.PREPARANDO}">En preparación</option>
                            <option value="${ORDER_STATUS.LISTO}">Listos</option>
                            <option value="${ORDER_STATUS.ENTREGADO}">Entregados</option>
                        </select>
                    </div>
                </div>
                
                <div id="admin-orders-list"></div>
            </div>
        `;

        showLoading('admin-orders-list');

        this.allOrders = await OrderService.getAllOrders();

        this.renderStats(this.allOrders);
        this.renderOrders();

        document.getElementById('status-filter')
            .addEventListener('change', (e) => this.filterOrders(e.target.value));

        window.addEventListener('orderUpdated', () => this.render());
    }

    renderStats(orders) {
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const pendingOrders = orders.filter(o => o.status === ORDER_STATUS.PENDIENTE).length;
        const preparingOrders = orders.filter(o => o.status === ORDER_STATUS.PREPARANDO).length;

        document.getElementById('stats-container').innerHTML = `
            <div class="stats-grid">
                <div class="stat-card">
                    <h3 class="stat-label">Total Pedidos</h3>
                    <p class="stat-value" style="color: var(--primary-color);">${totalOrders}</p>
                </div>
                
                <div class="stat-card">
                    <h3 class="stat-label">Ingresos Totales</h3>
                    <p class="stat-value" style="color: var(--success-color);">${formatPrice(totalRevenue)}</p>
                </div>
                
                <div class="stat-card">
                    <h3 class="stat-label">Pendientes</h3>
                    <p class="stat-value" style="color: var(--warning-color);">${pendingOrders}</p>
                </div>
                
                <div class="stat-card">
                    <h3 class="stat-label">En Preparación</h3>
                    <p class="stat-value" style="color: var(--secondary-color);">${preparingOrders}</p>
                </div>
            </div>
        `;
    }

    renderOrders() {
        const ordersList = document.getElementById('admin-orders-list');
        const orders = OrderService.filterByStatus(this.allOrders, this.currentFilter);

        if (orders.length === 0) {
            ordersList.innerHTML = `
                <div class="empty-state">
                    <p>No hay pedidos con este filtro</p>
                </div>
            `;
            return;
        }

        const sortedOrders = [...orders].sort((a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );

        ordersList.innerHTML = `
            <div class="orders-list">
                ${sortedOrders.map(order => OrderCard.create(order, true)).join('')}
            </div>
        `;

        OrderCard.attachEventListeners();
    }

    filterOrders(status) {
        this.currentFilter = status;
        this.renderOrders();
    }
}

export default new AdminView();
