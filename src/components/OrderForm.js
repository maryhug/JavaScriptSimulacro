// ============================================
// COMPONENTE DE FORMULARIO DE PEDIDO (CARRITO)
// ============================================

import { STORAGE_KEYS, ROUTES } from '../utils/constants.js';
import { formatPrice, calculateTotal, showNotification } from '../utils/helpers.js';
import AuthService from '../services/AuthService.js';
import OrderService from '../services/OrderService.js';

class OrderForm {
    render() {
        const cartJson = sessionStorage.getItem(STORAGE_KEYS.CART);
        const cart = cartJson ? JSON.parse(cartJson) : [];
        const cartContainer = document.getElementById('cart-container');

        if (!cartContainer) return;

        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <div class="cart-container">
                    <h3 class="cart-title">🛒 Mi Pedido</h3>
                    <div class="empty-state">
                        <p>No hay productos en el pedido</p>
                    </div>
                </div>
            `;
            return;
        }

        const total = calculateTotal(cart);

        cartContainer.innerHTML = `
            <div class="cart-container">
                <h3 class="cart-title">🛒 Mi Pedido (${cart.length})</h3>
                
                <div class="cart-items">
                    ${cart.map((item, index) => `
                        <div class="cart-item">
                            <div>
                                <strong>${item.name}</strong>
                                <br>
                                <small>${item.category}</small>
                            </div>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span>${formatPrice(item.price)}</span>
                                <button class="btn-remove" data-index="${index}">✕</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="cart-total">
                    Total: ${formatPrice(total)}
                </div>
                
                <button class="btn-confirm" id="btn-confirm-order">
                    Confirmar Pedido
                </button>
                
                <button class="btn-clear" id="btn-clear-cart">
                    Vaciar Carrito
                </button>
            </div>
        `;

        this.attachEventListeners();
    }

    attachEventListeners() {
        const confirmBtn = document.getElementById('btn-confirm-order');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', () => this.confirmOrder());
        }

        const clearBtn = document.getElementById('btn-clear-cart');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearCart());
        }

        const removeButtons = document.querySelectorAll('.btn-remove');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = parseInt(e.target.dataset.index);
                this.removeItem(index);
            });
        });
    }

    async confirmOrder() {
        const cartJson = sessionStorage.getItem(STORAGE_KEYS.CART);
        const cart = cartJson ? JSON.parse(cartJson) : [];

        if (cart.length === 0) {
            showNotification('El carrito está vacío', 'error');
            return;
        }

        const currentUser = AuthService.getCurrentUser();

        if (!currentUser) {
            showNotification('Debe iniciar sesión', 'error');
            return;
        }

        // Crear pedido en el servidor
        const order = await OrderService.createOrder(currentUser.id, cart);

        if (order) {
            this.render();
            setTimeout(() => {
                window.location.hash = ROUTES.ORDERS;
            }, 1000);
        }
    }

    removeItem(index) {
        const cartJson = sessionStorage.getItem(STORAGE_KEYS.CART);
        const cart = cartJson ? JSON.parse(cartJson) : [];

        cart.splice(index, 1);
        sessionStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));

        showNotification('Producto eliminado', 'info');
        this.render();
    }

    clearCart() {
        sessionStorage.removeItem(STORAGE_KEYS.CART);
        showNotification('Carrito vaciado', 'info');
        this.render();
    }
}

export default new OrderForm();
