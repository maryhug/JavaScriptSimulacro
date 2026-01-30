// ============================================
// COMPONENTE DE TARJETA DE PEDIDO - CORREGIDO
// ============================================

import { ORDER_STATUS } from '../utils/constants.js';
import { formatPrice, formatDate } from '../utils/helpers.js';
import OrderService from '../services/OrderService.js';

class OrderCard {
    create(order, isAdmin = false) {
        return `
            <div class="order-card" data-order-id="${order.id}">
                <div class="order-header">
                    <span class="order-id">Pedido #${order.id}</span>
                    <span class="order-status status-${order.status}">
                        ${order.status}
                    </span>
                </div>
                
                <div class="order-body">
                    <ul class="order-items">
                        ${order.items.map(item => `
                            <li class="order-item">
                                <span>${item.name}</span>
                                <span>${formatPrice(item.price)}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div class="order-footer">
                    <div>
                        <small>${formatDate(order.createdAt)}</small>
                        <p class="order-total">Total: ${formatPrice(order.total)}</p>
                    </div>
                    
                    ${isAdmin && order.status !== ORDER_STATUS.ENTREGADO ? `
                        <div class="order-actions">
                            <button class="btn-status" 
                                    style="background-color: var(--success-color); color: white;"
                                    data-order-id="${order.id}" 
                                    data-current-status="${order.status}"
                                    data-action="advance">
                                Avanzar Estado
                            </button>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    attachEventListeners() {
        const actionButtons = document.querySelectorAll('[data-action]');

        actionButtons.forEach(button => {
            button.addEventListener('click', async (e) => {
                const orderId = parseInt(e.target.dataset.orderId);
                const currentStatus = e.target.dataset.currentStatus;
                const action = e.target.dataset.action;

                if (action === 'advance') {
                    // CORRECCIÓN: Pasar el estado actual directamente
                    await this.advanceStatus(orderId, currentStatus);
                }
            });
        });
    }

    async advanceStatus(orderId, currentStatus) {
        // CORRECCIÓN: Usar el método corregido con estado actual
        const success = await OrderService.advanceOrderStatus(orderId, currentStatus);

        if (success) {
            window.dispatchEvent(new CustomEvent('orderUpdated'));
        }
    }
}

export default new OrderCard();
