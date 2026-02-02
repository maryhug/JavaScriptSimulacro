// ============================================
// VISTA DE ADMINISTRADOR - COMPLETA
// ============================================

import { ROUTES, ORDER_STATUS } from '../utils/constants.js';
import { formatPrice, showNotification, showLoading } from '../utils/helpers.js';
import AuthService from '../services/AuthService.js';
import OrderService from '../services/OrderService.js';

class AdminView {
    constructor() {
        this.currentFilter = 'all';
        this.allOrders = [];
        this.selectedOrder = null;
        this.currentPage = 1;
        this.ordersPerPage = 5;
    }

    async render() {
        const mainContent = document.getElementById('main-content');

        if (!AuthService.isAdmin()) {
            showNotification('Acceso no autorizado', 'error');
            window.location.hash = ROUTES.MENU;
            return;
        }

        mainContent.innerHTML = `
            
            <!-- ESTADÍSTICAS -->
            <div class="stats-grid" id="stats-container">
                <!-- Stats se cargarán aquí -->
            </div>
            
            <!-- CONTENIDO: TABLA + SIDEBAR -->
            <div class="admin-content">
                <!-- TABLA DE PEDIDOS -->
                <div class="orders-table-container">
                    <div class="table-header">
                        <h2 class="table-title">Recent Orders</h2>
                        <div class="admin-actions">
                            <button class="btn-filter">
                                <span>⚙</span> Filter
                            </button>
                            <button class="btn-export">
                                <span>⬆</span> Export
                            </button>
                        </div>
                    </div>
                    
                    <table class="orders-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>User</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody id="orders-table-body">
                            <!-- Pedidos aquí -->
                        </tbody>
                    </table>
                    
                    <div class="table-pagination" id="pagination">
                        <!-- Paginación aquí -->
                    </div>
                </div>
                
                <!-- SIDEBAR DE DETALLES -->
                <div class="order-detail-sidebar" id="order-detail-sidebar">
                    <!-- Detalles del pedido aquí -->
                </div>
            </div>
        `;

        showLoading('orders-table-body');

        // Cargar todos los pedidos
        this.allOrders = await OrderService.getAllOrders();

        // Renderizar estadísticas
        this.renderStats(this.allOrders);

        // Renderizar tabla
        this.renderTable();

        // Renderizar paginación
        this.renderPagination();

        // Seleccionar el primer pedido automáticamente
        if (this.allOrders.length > 0) {
            this.selectOrder(this.allOrders[0]);
        } else {
            this.renderEmptySidebar();
        }

        // Event listeners para actualizar
        window.addEventListener('orderUpdated', async () => {
            this.allOrders = await OrderService.getAllOrders();
            this.renderStats(this.allOrders);
            this.renderTable();
            if (this.selectedOrder) {
                // Actualizar el pedido seleccionado
                const updatedOrder = this.allOrders.find(o => o.id === this.selectedOrder.id);
                if (updatedOrder) {
                    this.selectOrder(updatedOrder);
                }
            }
        });
    }

    renderStats(orders) {
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
        const pendingOrders = orders.filter(o => o.status === ORDER_STATUS.PENDIENTE).length;
        const preparingOrders = orders.filter(o => o.status === ORDER_STATUS.PREPARANDO).length;

        document.getElementById('stats-container').innerHTML = `
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-icon orders">📦</div>
                </div>
                <div class="stat-label">Total Orders</div>
                <h2 class="stat-value">${totalOrders.toLocaleString()}</h2>
            </div>
            
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-icon pending">⏳</div>
                </div>
                <div class="stat-label">Pending Orders</div>
                <h2 class="stat-value">${pendingOrders}</h2>
            </div>
            
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-icon revenue">💰</div>
                </div>
                <div class="stat-label">Today's Revenue</div>
                <h2 class="stat-value">${formatPrice(totalRevenue)}</h2>
            </div>
        `;
    }

    renderTable() {
        const tbody = document.getElementById('orders-table-body');

        if (this.allOrders.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 3rem; color: var(--text-gray);">
                        No hay pedidos disponibles
                    </td>
                </tr>
            `;
            return;
        }

        // Calcular pedidos para la página actual
        const startIndex = (this.currentPage - 1) * this.ordersPerPage;
        const endIndex = startIndex + this.ordersPerPage;
        const ordersToShow = this.allOrders.slice(startIndex, endIndex);

        tbody.innerHTML = ordersToShow.map(order => {
            const date = new Date(order.createdAt);
            const formattedDate = `${date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}, ${date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

            return `
                <tr class="order-row ${this.selectedOrder && this.selectedOrder.id === order.id ? 'selected' : ''}" 
                    data-order-id="${order.id}">
                    <td><strong>#${order.id}</strong></td>
                    <td>${this.getUserName(order.userId)}</td>
                    <td>${formattedDate}</td>
                    <td>
                        <span class="order-status status-${order.status}">
                            ${order.status}
                        </span>
                    </td>
                    <td><strong>${formatPrice(order.total)}</strong></td>
                </tr>
            `;
        }).join('');

        // Agregar event listeners a las filas
        document.querySelectorAll('.order-row').forEach(row => {
            row.addEventListener('click', () => {
                const orderId = parseInt(row.dataset.orderId);
                const order = this.allOrders.find(o => o.id === orderId);
                if (order) {
                    this.selectOrder(order);
                }
            });
        });
    }

    renderPagination() {
        const totalPages = Math.ceil(this.allOrders.length / this.ordersPerPage);
        const pagination = document.getElementById('pagination');

        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '<button class="pagination-btn" id="prev-page">‹</button>';

        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <button class="pagination-btn ${i === this.currentPage ? 'active' : ''}" data-page="${i}">
                    ${i}
                </button>
            `;
        }

        paginationHTML += '<button class="pagination-btn" id="next-page">›</button>';
        paginationHTML += `<span style="margin-left: 1rem; color: var(--text-gray);">... ${totalPages}</span>`;

        pagination.innerHTML = paginationHTML;

        // Event listeners para paginación
        document.getElementById('prev-page').addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.renderTable();
                this.renderPagination();
            }
        });

        document.getElementById('next-page').addEventListener('click', () => {
            if (this.currentPage < totalPages) {
                this.currentPage++;
                this.renderTable();
                this.renderPagination();
            }
        });

        document.querySelectorAll('[data-page]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.currentPage = parseInt(e.target.dataset.page);
                this.renderTable();
                this.renderPagination();
            });
        });
    }

    selectOrder(order) {
        this.selectedOrder = order;

        // Actualizar clase selected en la tabla
        document.querySelectorAll('.order-row').forEach(row => {
            row.classList.remove('selected');
            if (parseInt(row.dataset.orderId) === order.id) {
                row.classList.add('selected');
            }
        });

        // Renderizar detalles en el sidebar
        this.renderOrderDetails(order);
    }

    renderOrderDetails(order) {
        const sidebar = document.getElementById('order-detail-sidebar');

        const userName = this.getUserName(order.userId);
        const userEmail = this.getUserEmail(order.userId);
        const date = new Date(order.createdAt);

        const subtotal = order.total / 1.08; // Asumiendo 8% tax
        const tax = order.total - subtotal;

        sidebar.innerHTML = `
            <div class="sidebar-header">
                <h3 class="sidebar-title">Order Details</h3>
            </div>
            
            <div style="background-color: #e3f2fd; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <span style="font-size: 1.125rem; font-weight: 700; color: var(--text-dark);">#${order.id}</span>
                    <span class="order-status status-${order.status}" style="font-size: 0.8rem;">
                        ${order.status}
                    </span>
                </div>
            </div>
            
            <!-- INFORMACIÓN DEL USUARIO -->
            <div class="order-detail-section">
                <div class="section-label">Customer</div>
                <div class="order-detail-user">
                    <div class="user-avatar"></div>
                    <div class="user-info">
                        <div class="user-info-name">${userName}</div>
                        <div class="user-info-contact">${userEmail}</div>
                        <div class="user-info-contact">+1 (555) 123-4567</div>
                    </div>
                </div>
            </div>
            
            <!-- ITEMS DEL PEDIDO -->
            <div class="order-detail-section">
                <div class="section-label">Items</div>
                <ul class="order-detail-items">
                    ${order.items.map(item => `
                        <li class="detail-item">
                            <div style="display: flex; align-items: flex-start;">
                                <span style="background-color: var(--bg-light); padding: 0.25rem 0.5rem; border-radius: 4px; font-weight: 600; font-size: 0.8rem; margin-right: 0.75rem;">1x</span>
                                <div>
                                    <div class="item-name">${item.name}</div>
                                    <div class="item-extras">Extra: ${item.category}, No onions</div>
                                </div>
                            </div>
                            <span class="item-price">${formatPrice(item.price)}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
            
            <!-- RESUMEN DEL PEDIDO -->
            <div class="order-detail-section">
                <div class="order-summary">
                    <div class="summary-row">
                        <span>Subtotal</span>
                        <span>${formatPrice(subtotal)}</span>
                    </div>
                    <div class="summary-row">
                        <span>Tax (8%)</span>
                        <span>${formatPrice(tax)}</span>
                    </div>
                    <div class="summary-row total">
                        <span>Total</span>
                        <span style="color: var(--primary-color);">${formatPrice(order.total)}</span>
                    </div>
                </div>
            </div>
            
            <!-- ACTUALIZAR ESTADO -->
            <div class="order-detail-section">
                <div class="section-label">Update Status</div>
                <select class="status-dropdown" id="status-select">
                    <option value="${ORDER_STATUS.PENDIENTE}" ${order.status === ORDER_STATUS.PENDIENTE ? 'selected' : ''}>Pendiente</option>
                    <option value="${ORDER_STATUS.PREPARANDO}" ${order.status === ORDER_STATUS.PREPARANDO ? 'selected' : ''}>Preparando</option>
                    <option value="${ORDER_STATUS.LISTO}" ${order.status === ORDER_STATUS.LISTO ? 'selected' : ''}>Listo</option>
                    <option value="${ORDER_STATUS.ENTREGADO}" ${order.status === ORDER_STATUS.ENTREGADO ? 'selected' : ''}>Entregado</option>
                </select>
                <button class="btn-update" id="btn-update-status">
                    Update
                </button>
            </div>
        `;

        // Event listener para actualizar estado
        document.getElementById('btn-update-status').addEventListener('click', async () => {
            const newStatus = document.getElementById('status-select').value;
            const success = await OrderService.updateOrderStatus(order.id, newStatus);

            if (success) {
                window.dispatchEvent(new CustomEvent('orderUpdated'));
            }
        });
    }

    renderEmptySidebar() {
        const sidebar = document.getElementById('order-detail-sidebar');
        sidebar.innerHTML = `
            <div class="empty-state" style="padding: 3rem 1rem;">
                <div class="empty-state-icon" style="font-size: 3rem;">📋</div>
                <p class="empty-state-title">Select an order</p>
                <p class="empty-state-text">Click on an order to view details</p>
            </div>
        `;
    }

    getUserName(userId) {
        // En una app real, esto vendría de la API de usuarios
        const names = {
            1: 'Administrador',
            2: 'Alice Smith',
            3: 'Bob Jones',
            4: 'Charlie Day',
            5: 'Diana Prince',
            6: 'Evan Wright'
        };
        return names[userId] || `User ${userId}`;
    }

    getUserEmail(userId) {
        // En una app real, esto vendría de la API de usuarios
        const emails = {
            1: 'admin@restaurapp.com',
            2: 'alice.smith@email.com',
            3: 'bob.jones@email.com',
            4: 'charlie.day@email.com',
            5: 'diana.prince@email.com',
            6: 'evan.wright@email.com'
        };
        return emails[userId] || `user${userId}@email.com`;
    }
}

export default new AdminView();