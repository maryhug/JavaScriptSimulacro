// ============================================
// COMPONENTE DE CARRITO - MEJORADO
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
                    <div class="cart-header">
                        <h3 class="cart-title">Your Order</h3>
                    </div>
                    <div class="empty-state" style="padding: 2rem 1rem;">
                        <div class="empty-state-icon" style="font-size: 3rem;">🛒</div>
                        <p class="empty-state-text" style="font-size: 0.9rem;">No items in your order</p>
                    </div>
                </div>
            `;
            return;
        }

        const subtotal = calculateTotal(cart);
        const tax = subtotal * 0.08; // 8% tax
        const total = subtotal + tax;

        cartContainer.innerHTML = `
            <div class="cart-container">
                <div class="cart-header">
                    <h3 class="cart-title">
                        Your Order
                        <span class="cart-badge">${cart.length}</span>
                    </h3>
                    <button class="btn-clear-cart" id="btn-clear-cart">Clear all</button>
                </div>
                
                <div class="cart-items">
                    ${cart.map((item, index) => `
                        <div class="cart-item">
                            <div class="cart-item-image"></div>
                            <div class="cart-item-details">
                                <div class="cart-item-name">${item.name}</div>
                                <div class="cart-item-extras">Extra: ${item.category}</div>
                            </div>
                            <div class="cart-item-price-remove">
                                <div class="cart-item-price">${formatPrice(item.price)}</div>
                                <button class="btn-remove" data-index="${index}">Remove</button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="cart-summary">
                    <div class="cart-summary-row subtotal">
                        <span>Subtotal</span>
                        <span>${formatPrice(subtotal)}</span>
                    </div>
                    <div class="cart-summary-row tax">
                        <span>Tax (8%)</span>
                        <span>${formatPrice(tax)}</span>
                    </div>
                    <div class="cart-total">
                        <span>Total</span>
                        <span class="cart-total-price">${formatPrice(total)}</span>
                    </div>
                </div>
                
                <button class="btn-confirm" id="btn-confirm-order">
                    Confirm Order →
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
