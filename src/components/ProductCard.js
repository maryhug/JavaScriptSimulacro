// ============================================
// COMPONENTE DE TARJETA DE PRODUCTO
// ============================================

import { STORAGE_KEYS } from '../utils/constants.js';
import { formatPrice, showNotification } from '../utils/helpers.js';

class ProductCard {
    create(product) {
        return `
            <div class="product-card" data-product-id="${product.id}">
                <h3 class="product-name">${product.name}</h3>
                <span class="product-category">${product.category}</span>
                <p class="product-price">${formatPrice(product.price)}</p>
                <button class="btn-add" data-product-id="${product.id}">
                    Agregar al Pedido
                </button>
            </div>
        `;
    }

    attachEventListeners() {
        const addButtons = document.querySelectorAll('.btn-add');

        addButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.productId);
                this.addToCart(productId);
            });
        });
    }

    addToCart(productId) {
        // Obtener el producto desde los datos ya cargados en la vista
        const productCard = document.querySelector(`[data-product-id="${productId}"]`);

        if (!productCard) return;

        const product = {
            id: productId,
            name: productCard.querySelector('.product-name').textContent,
            category: productCard.querySelector('.product-category').textContent,
            price: parseFloat(productCard.querySelector('.product-price').textContent.replace('$', ''))
        };

        // Obtener carrito actual de sessionStorage
        const cartJson = sessionStorage.getItem(STORAGE_KEYS.CART);
        const cart = cartJson ? JSON.parse(cartJson) : [];

        // Agregar producto
        cart.push(product);

        // Guardar carrito actualizado
        sessionStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));

        showNotification(`${product.name} agregado al pedido`, 'success');

        // Disparar evento personalizado
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    }
}

export default new ProductCard();
